<template>
    <div class="container my-4">
      <div class="card p-4 shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-3"><i class="fas fa-cogs me-2"></i> Settings</h5>
  
          <div class="row">
            <!-- AIT Dropdown -->
            <div class="col-md-3">
              <label for="aitDropdown" class="form-label">
                <i class="fas fa-microchip me-2"></i> AIT
              </label>
              <select
                class="form-select"
                id="aitDropdown"
                v-model="selectedAIT"
                @change="enableNextDropdown('spk')"
              >
                <option value="" disabled>Select AIT</option>
                <option value="AIT1">AIT 1</option>
                <option value="AIT2">AIT 2</option>
                <option value="AIT3">AIT 3</option>
              </select>
            </div>
  
            <!-- SPK Dropdown -->
            <div class="col-md-3">
              <label for="spkDropdown" class="form-label">
                <i class="fas fa-toolbox me-2"></i> SPK
              </label>
              <select
                class="form-select"
                id="spkDropdown"
                v-model="selectedSPK"
                :disabled="!isSPKEnabled"
                @change="enableNextDropdown('environment')"
              >
                <option value="" disabled>Select SPK</option>
                <option value="SPK1">SPK 1</option>
                <option value="SPK2">SPK 2</option>
                <option value="SPK3">SPK 3</option>
              </select>
            </div>
  
            <!-- Environment Dropdown -->
            <div class="col-md-3">
              <label for="envDropdown" class="form-label">
                <i class="fas fa-leaf me-2"></i> Environment
              </label>
              <select
                class="form-select"
                id="envDropdown"
                v-model="selectedEnvironment"
                :disabled="!isEnvironmentEnabled"
                @change="enableNextDropdown('timeframe')"
              >
                <option value="" disabled>Select Environment</option>
                <option value="Development">Development</option>
                <option value="Staging">Staging</option>
                <option value="Production">Production</option>
              </select>
            </div>
  
            <!-- Timeframe Dropdown -->
            <div class="col-md-3">
              <label for="timeframeDropdown" class="form-label">
                <i class="fas fa-clock me-2"></i> Timeframe
              </label>
              <select
                class="form-select"
                id="timeframeDropdown"
                v-model="selectedTimeframe"
                :disabled="!isTimeframeEnabled"
                @change="showCharts"
              >
                <option value="" disabled>Select Timeframe</option>
                <option value="Last24Hours">Last 24 Hours</option>
                <option value="LastWeek">Last Week</option>
                <option value="LastMonth">Last Month</option>
              </select>
            </div>
          </div>
  
          <!-- Charts Section -->
          <div v-if="showChartSection" class="row mt-5">
            <!-- Total Deployments Chart Card -->
            <div class="col-md-6 mb-4">
              <div class="card shadow card-olympos chart-card">
                <div class="card-body">
                  <h5 class="card-title">Total Deployments</h5>
                  <div class="chart-container">
                    <canvas id="doughnutChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Deployment Frequency Chart Card -->
            <div class="col-md-6 mb-4">
              <div class="card shadow card-olympos chart-card">
                <div class="card-body">
                  <h5 class="card-title">Deployment Frequency</h5>
                  <div class="chart-container">
                    <canvas id="topEnvironmentsChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Responsive Table Section -->
          <div class="table-responsive mt-5">
            <table class="table table-striped table-bordered custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Component</th>
                  <th>AIT</th>
                  <th>SPK</th>
                  <th>Repo</th>
                  <th>Deployment Environment</th>
                  <th>User</th>
                  <th>Start Time</th>
                  <th>Finish Time</th>
                  <th>Artifact URL</th>
                  <th>Deployment Date</th>
                  <th>Deployment Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData" :key="index">
                  <td>{{ row.id }}</td>
                  <td>{{ row.component }}</td>
                  <td>{{ row.ait }}</td>
                  <td>{{ row.spk }}</td>
                  <td>{{ row.repo }}</td>
                  <td>{{ row.deploymentEnvironment }}</td>
                  <td>{{ row.user }}</td>
                  <td>{{ row.startTime }}</td>
                  <td>{{ row.finishTime }}</td>
                  <td><a :href="row.artifactUrl" target="_blank">{{ row.artifactUrl }}</a></td>
                  <td>{{ row.deploymentDate }}</td>
                  <td>
                    <span :class="getStatusBadgeClass(row.deploymentStatus)">
                      {{ row.deploymentStatus }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, nextTick } from 'vue';
  import { Chart } from 'chart.js/auto';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  
  Chart.register(ChartDataLabels);
  
  export default {
    setup() {
      const selectedAIT = ref('');
      const selectedSPK = ref('');
      const selectedEnvironment = ref('');
      const selectedTimeframe = ref('');
  
      const isSPKEnabled = ref(false);
      const isEnvironmentEnabled = ref(false);
      const isTimeframeEnabled = ref(false);
      const showChartSection = ref(false);
  
      const tableData = ref([
        // Sample data
        { id: 1, component: 'Component 1', ait: 'AIT1', spk: 'SPK1', repo: 'Repo 1', deploymentEnvironment: 'Development', user: 'User 1', startTime: '10:00 AM', finishTime: '10:30 AM', artifactUrl: 'http://example.com/artifact1', deploymentDate: '2023-08-01', deploymentStatus: 'Success' },
        { id: 2, component: 'Component 2', ait: 'AIT2', spk: 'SPK2', repo: 'Repo 2', deploymentEnvironment: 'Staging', user: 'User 2', startTime: '11:00 AM', finishTime: '11:30 AM', artifactUrl: 'http://example.com/artifact2', deploymentDate: '2023-08-02', deploymentStatus: 'Error' },
        // ... more data
      ]);
  
      const enableNextDropdown = (dropdown) => {
        if (dropdown === 'spk') {
          isSPKEnabled.value = true;
        } else if (dropdown === 'environment') {
          isEnvironmentEnabled.value = true;
        } else if (dropdown === 'timeframe') {
          isTimeframeEnabled.value = true;
        }
      };
  
      const showCharts = () => {
        showChartSection.value = true;
        nextTick(() => {
         // createDeploymentChart();
          createDoughnutChart();
          createTopEnvironmentsChart();
        });
      };
  
      const createDeploymentChart = () => {
        const ctx = document.getElementById('deploymentChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Running', 'Success', 'Warning', 'Error'],
            datasets: [{
              label: 'Deployment Status',
              data: [15, 25, 10, 5],
              backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
            }]
          },
          options: {
            plugins: {
              legend: { display: false },
              datalabels: {
                color: '#fff',
                anchor: 'end',
                align: 'top',
                formatter: Math.round
              }
            },
            maintainAspectRatio: false,
            responsive: true,
            layout: {
              padding: 10
            }
          }
        });
      };
  
      const createDoughnutChart = () => {
        const ctx = document.getElementById('doughnutChart').getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Running', 'Success', 'Warning', 'Error'],
            datasets: [{
              label: 'Total Deployments',
              data: [45, 65, 30, 20],
              backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
              borderWidth: 1,
              borderColor: '#ffffff',
              hoverBorderColor: '#dddddd'
            }]
          },
          options: {
            plugins: {
              legend: { display: false },
              datalabels: {
                color: '#ffffff',
                anchor: 'end',
                align: 'start',
                formatter: (value) => `${value}%`,
                borderRadius: 3,
                backgroundColor: (context) => context.dataset.backgroundColor[context.dataIndex]
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            layout: {
              padding: 10
            }
          }
        });
      };
  
      const createTopEnvironmentsChart = () => {
        const ctx = document.getElementById('topEnvironmentsChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Environment 1', 'Environment 2', 'Environment 3', 'Environment 4', 'Environment 5'],
            datasets: [{
              label: 'Top Environments and Builds',
              data: [5, 10, 15, 20, 25],
              backgroundColor: '#007bff'
            }]
          },
          options: {
            plugins: {
              legend: { display: false },
              datalabels: {
                color: '#fff',
                anchor: 'end',
                align: 'top',
                formatter: Math.round
              }
            },
            maintainAspectRatio: false,
            responsive: true,
            layout: {
              padding: 10
            }
          }
        });
      };
  
      return {
        selectedAIT,
        selectedSPK,
        selectedEnvironment,
        selectedTimeframe,
        isSPKEnabled,
        isEnvironmentEnabled,
        isTimeframeEnabled,
        showChartSection,
        tableData,
        enableNextDropdown,
        showCharts
      };
    },
    methods: {
    getStatusBadgeClass(status) {
      switch (status) {
        case 'Success':
          return 'badge bg-success';
        case 'Error':
          return 'badge bg-danger';
        case 'Warning':
          return 'badge bg-warning text-dark';
        case 'Running':
          return 'badge bg-primary';
        default:
          return 'badge bg-secondary';
      }
    },
  },
  };
  </script>
  
  <style scoped>
 .chart-card {
  height: 450px; /* Increase the height for larger charts */
  overflow: hidden; 
  padding: 15px;
}

.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
}
  
  .custom-table {
    font-size: 0.75rem; /* Smaller font size for a cleaner look */
    color: #495057;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  }
  
  .custom-table th,
  .custom-table td {
    padding: 0.4rem; /* Reduced padding for a more compact design */
    vertical-align: middle;
    text-align: left;
  }
  
  .custom-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    font-size: 0.75rem; /* Smaller header font size */
  }
  
  .custom-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .custom-table tbody tr:hover {
    background-color: #e9ecef;
  }
  
  .custom-table a {
    color: #007bff;
    text-decoration: none;
    font-size: 0.75rem; /* Smaller link font size */
  }
  
  .custom-table a:hover {
    text-decoration: underline;
  }
  </style>