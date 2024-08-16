<template>
    <div class="container my-4">
      <div class="card p-4 shadow-sm">
        <div class="card-body">
          <!-- <h5 class="card-title mb-3"><i class="fas fa-cogs me-2"></i> Mertics</h5> -->

          <div class="row">
      <div class="col-md-3">
        <div class="card-deployment deployment-this-week">
          <div class="card-body">
            <div class="icon-section">
              <i class="fas fa-calendar-alt" style="color: #00acc1;"></i>
            </div>
            <div class="text-section">
              <h6 class="card-title">Deployments</h6>
              <div class="separator"></div>
              <div class="value-section">
                <p class="value-text">123</p>
              </div>
            </div>
          </div>
          <div class="separator"></div>
          <div class="last-week">
            <span>Last Week: 110</span>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-deployment success-rate">
          <div class="card-body">
            <div class="icon-section">
              <i class="fas fa-check-circle" style="color: #66bb6a;"></i>
            </div>
            <div class="text-section">
              <h6 class="card-title">Success Rate</h6>
              <div class="separator"></div>
              <div class="value-section">
                <p class="value-text">95%</p>
              </div>
            </div>
          </div>
          <div class="separator"></div>
          <div class="last-week">
            <span>Last Week: 92%</span>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-deployment failed">
          <div class="card-body">
            <div class="icon-section">
              <i class="fas fa-times-circle" style="color: #ef5350;"></i>
            </div>
            <div class="text-section">
              <h6 class="card-title">Failed</h6>
              <div class="separator"></div>
              <div class="value-section">
                <p class="value-text">5</p>
              </div>
            </div>
          </div>
          <div class="separator"></div>
          <div class="last-week">
            <span>Last Week: 7</span>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-deployment cancelled">
          <div class="card-body">
            <div class="icon-section">
              <i class="fas fa-ban" style="color: #ff7e5f;"></i>
            </div>
            <div class="text-section">
              <h6 class="card-title">Cancelled</h6>
              <div class="separator"></div>
              <div class="value-section">
                <p class="value-text">2</p>
              </div>
            </div>
          </div>
          <div class="separator"></div>
          <div class="last-week">
            <span>Last Week: 4</span>
          </div>
        </div>
      </div>
          </div>
          
<div class="row">
      <div class="col-md-12 mt-4">
        <div class="card custom-dropdown-card">
          <div class="card-header">
            <h6 class="card-title"><i class="fas fa-cogs me-2"></i> Filter Deployments</h6>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <!-- AIT Dropdown -->
              <div class="col-md-3">
                <label for="aitDropdown" class="form-label">
                  <i class="fas fa-microchip me-2"></i> AIT
                </label>
                <select class="form-select" id="aitDropdown" v-model="selectedAIT" @change="enableNextDropdown('spk')">
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
                  @change="enableNextDropdown('view')"
                >
                  <option value="" disabled>Select Environment</option>
                  <option value="Development">Development</option>
                  <option value="Staging">Staging</option>
                  <option value="Production">Production</option>
                </select>
              </div>

              <div class="col-md-3">
                <div style="margin-top: 42px;">
                  <button :disabled ="!isViewbuttonEnabled" data-bs-toggle="modal" data-bs-target="#deploymentDetail" class="btn btn-sm btn-custom-primary text-dark rounded" style="margin-right: 10px;">
                    <i class="fas fa-info-circle"> </i> View
                  </button>
                  <!-- <button class="btn btn-sm btn-custom-info text-dark rounded mr-3 disabled">
                    <i class="fas fa-history"> </i> History
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      

        <!-- Modal -->
<!-- Modal -->
<div class="modal fade" id="deploymentDetail" tabindex="-1" aria-labelledby="deploymentDetailLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-custom">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="deploymentDetailLabel">{{ modalTitle }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card shadow card-olympos chart-card">
              <div class="card-header">
                <h6 class="card-title">Total Deployments</h6>
              </div>
              <div class="card-body">
                <div class="chart-container-modal">
                  <canvas id="doughnutChart" height="300" width="300"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow card-olympos chart-card">
              <div class="card-header">
                <h6 class="card-title">Deployment Frequency</h6>
              </div>
              <div class="card-body">
                <div class="chart-container-modal">
                  <canvas id="deploymentFrequencyChart" height="300" width="300"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12">
            <div class="card shadow card-olympos">
              <div class="card-header">
                <div class="card-title">Details</div>
              </div>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-striped table-hover mb-0">
                    <thead class="thead-light">
                      <tr>
                        <th>COMPONENT NAME</th>
                        <th>ENVIRONMENT</th>
                        <th>BRANCH</th>
                        <th>ARTIFACT</th>
                        <th>DEPLOYED BY</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>ABPA_46263_ABPADML</td>
                        <td>DMZ_DEV1_MAY</td>
                        <td>2024.05.00</td>
                        <td>2024.05.00-SNAPSHOT.5.220240542323</td>
                        <td>John</td>
                        <td>
                          <div class="d-flex align-items-center justify-content-center">
                            <i class="fas fa-check-circle text-success me-2"></i>
                            <span>Success</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>ABPA_345641_ABPADML</td>
                        <td>DMZ_DEV2_MAY</td>
                        <td>2024.05.00</td>
                        <td>2025.05.00-SNAPSHOT.5.220240542323</td>
                        <td>Mike</td>
                        <td>
                          <div class="d-flex align-items-center justify-content-center">
                            <i class="fas fa-check-circle text-success me-2"></i>
                            <span>Success</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

          <div class="row">
            <div class="button-strip">
              <!-- <button class="btn btn-sm btn-custom-primary text-dark rounded" style="margin-right: 10px;">
                <i class="fas fa-info-circle"></i> Info
              </button>
              <button class="btn btn-sm btn-custom-info text-dark rounded mr-3">
                <i class="fas fa-history"></i> History
              </button> -->
            </div>
          </div>


          <!-- Charts Section -->
          <div  class="row">
            <!-- Total Deployments Chart Card -->
          <!-- Total Deployments Chart Card (Doughnut Chart) -->
          <div class="col-md-6 mb-4">
            <div class="card shadow card-olympos chart-card">
              <div class="card-header">
                <h6 class="card-title">Deploy under DPT</h6>
              </div>
              <div class="card-body">
                
                <div  class="chart-container">
                  
                  <canvas id="deploymentChart" height="300" width="400"></canvas>
                  
                </div>
              </div>
            </div>
          </div>

          <!-- Deployment Frequency Chart Card + Info Card -->
          <div class="col-md-6 mb-4">
            <!-- Bar Chart -->
            <div class="card shadow card-olympos chart-card chart-card">
              <div class="card-header">
                <h6 class="card-title">Environment wise Deployment</h6>
              </div>
              <div class="card-body">
               
                <div class="chart-container">
                  <canvas id="topEnvironmentsChart"  height="300" width="400" ></canvas>
                </div>
              </div>
            </div>

              <!-- Success Deployment Info Card -->
              <!-- <div class="card chart-card-short shadow mt-3" style="background: linear-gradient(135deg, #e0f7fa, #FFFFFF);">
                <div class="card-body text-center">
                  <h5 class="card-title text-success">
                    <i class="fas fa-check-circle me-2"></i> Number of Successful Deployments
                  </h5>
                  <h1 class="display-6">65</h1>
                  <p class="mb-0">Average Total Duration</p>
                  <h2 class="display-6">02:34:00</h2>
                </div>
              </div> -->
          </div>
          
          </div>

          <div class="row">
              <div class="col-md-12">
                <div class="card shadow card-olympos">
                  <div class="card-header">
                    <div class="card-title">Details</div>
                  </div>
                  <div class="card-body p-0">
                    <div class="table-responsive">
                      <!-- Projects table -->
                      <table class="table table-striped table-hover mb-0">
  <thead class="thead-light">
    <tr>
      <th>ID</th>
      <th>ARTIFACT</th>
      <th>STATUS</th>
      <th>DEPLOYED BY</th>
      <th>DEPLOYED ON</th>
      <th>ENVIRONMENT</th>
      <th>ACTIONS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2024.05.00-SNAPSHOT.5.220240542323</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <i class="fas fa-check-circle" style="color: green; margin-right: 5px;"></i>
          <span>Success</span>
        </div>
      </td>
      <td>John</td>
      <td>2024-04-30, 02:53 AM EST</td>
      <td>DMZ_DEV1_MAY</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>2024.05.00-SNAPSHOT.5.220240542324</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <img src="../assets/img/loading.gif" alt="Running" style="width: 30px; margin-right: 5px;">
          <span>Running</span>
        </div>
      </td>
      <td>Jane</td>
      <td>2024-04-30, 03:12 AM EST</td>
      <td>DMZ_DEV2_JUNE</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td>2024.05.00-SNAPSHOT.5.220240542325</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <i class="fas fa-times-circle" style="color: red; margin-right: 5px;"></i>
          <span>Failed&nbsp;&nbsp;&nbsp;</span>
        </div>
      </td>
      <td>Tom</td>
      <td>2024-04-30, 03:25 AM EST</td>
      <td>DMZ_DEV3_JULY</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>4</td>
      <td>2024.05.00-SNAPSHOT.5.220240542326</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <i class="fas fa-check-circle" style="color: green; margin-right: 5px;"></i>
          <span>Success</span>
        </div>
      </td>
      <td>Mike</td>
      <td>2024-04-30, 04:10 AM EST</td>
      <td>DMZ_DEV4_AUG</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>5</td>
      <td>2024.05.00-SNAPSHOT.5.220240542327</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <img src="../assets/img/loading.gif" alt="Running" style="width: 30px; margin-right: 5px;">
          <span>Running</span>
        </div>
      </td>
      <td>Sara</td>
      <td>2024-04-30, 04:35 AM EST</td>
      <td>DMZ_DEV5_SEP</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>6</td>
      <td>2024.05.00-SNAPSHOT.5.220240542328</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <i class="fas fa-times-circle" style="color: red; margin-right: 5px;"></i>
          <span>Failed&nbsp;&nbsp;&nbsp;</span>
      
        </div>
      </td>
      <td>Steve</td>
      <td>2024-04-30, 05:00 AM EST</td>
      <td>DMZ_DEV6_OCT</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>7</td>
      <td>2024.05.00-SNAPSHOT.5.220240542329</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <i class="fas fa-check-circle" style="color: green; margin-right: 5px;"></i>
          <span>Success</span>
        </div>
      </td>
      <td>Alice</td>
      <td>2024-04-30, 05:20 AM EST</td>
      <td>DMZ_DEV7_NOV</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>8</td>
      <td>2024.05.00-SNAPSHOT.5.220240542330</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <img src="../assets/img/loading.gif" alt="Running" style="width: 30px; margin-right: 5px;">
          <span>Running</span>
        </div>
      </td>
      <td>Bob</td>
      <td>2024-04-30, 05:45 AM EST</td>
      <td>DMZ_DEV8_DEC</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>9</td>
      <td>2024.05.00-SNAPSHOT.5.220240542331</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <i class="fas fa-times-circle" style="color: red; margin-right: 5px;"></i>
          <span>Failed&nbsp;&nbsp;&nbsp;</span>
      
        </div>
      </td>
      <td>Chris</td>
      <td>2024-04-30, 06:10 AM EST</td>
      <td>DMZ_DEV9_JAN</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
    <tr>
      <td>10</td>
      <td>2024.05.00-SNAPSHOT.5.220240542332</td>
      <td style="height: 50px; vertical-align: middle;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <i class="fas fa-check-circle" style="color: green; margin-right: 5px;"></i>
          <span>Success</span>
        </div>
      </td>
      <td>Nancy</td>
      <td>2024-04-30, 06:30 AM EST</td>
      <td>DMZ_DEV10_FEB</td>
      <td>
  <a href="https://example.com" class="btn btn-sm btn-primary btn-link-icon">
    <i class="fas fa-link"></i>
  </a>
      </td>
    </tr>
  </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-4">
                <div class="card shadow card-olympos">
                  <div class="card-header">
                    <div class="card-head-row card-tools-still-right">
                      <div class="card-title">Recent Deployments</div>
                      <div class="card-tools">
                        <div class="dropdown">
                          <button
                            class="btn btn-icon btn-clean"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i class="fas fa-ellipsis-h"></i>
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#"
                              >Something else here</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <ol class="activity-feed">
                      <li class="feed-item feed-item-secondary">
                        <time class="date" datetime="9-25">Sep 25</time>
                        <span class="text"
                          >Responded to need
                          <a href="#">"Volunteer opportunity"</a></span
                        >
                      </li>
                      <li class="feed-item feed-item-success">
                        <time class="date" datetime="9-24">Sep 24</time>
                        <span class="text"
                          >Added an interest
                          <a href="#">"Volunteer Activities"</a></span
                        >
                      </li>
                      <li class="feed-item feed-item-info">
                        <time class="date" datetime="9-23">Sep 23</time>
                        <span class="text"
                          >Joined the group
                          <a href="single-group.php"
                            >"Boardsmanship Forum"</a
                          ></span
                        >
                      </li>
                      <li class="feed-item feed-item-warning">
                        <time class="date" datetime="9-21">Sep 21</time>
                        <span class="text"
                          >Responded to need
                          <a href="#">"In-Kind Opportunity"</a></span
                        >
                      </li>
                      <li class="feed-item feed-item-danger">
                        <time class="date" datetime="9-18">Sep 18</time>
                        <span class="text"
                          >Created need
                          <a href="#">"Volunteer Opportunity"</a></span
                        >
                      </li>
                     
                    </ol>
                  </div>
                </div>
             
                </div> -->
              </div>
            </div>
  
          <!-- Responsive Table Section -->
          <!-- <div class="table-responsive mt-5">
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
          </div> -->
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
      const isViewbuttonEnabled = ref(false);
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
          } else if (dropdown === 'view') {
            isViewbuttonEnabled.value = true;
        }       };
  
      const showCharts = () => {
        showChartSection.value = true;
        nextTick(() => {
          createDoughnutChart();
          createDeploymentChart();
        
          createTopEnvironmentsChart();
          createdeploymentfrequencyChart();
        });
      };
  
      const createDeploymentChart = () => {
        const ctx = document.getElementById('deploymentChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['DIT1', 'UATIB', 'SIT1B', 'CIT1', 'SIT1A', 'DIT2', 'LTA', 'CIT2'],
            datasets: [{
              label: 'Deployment Status',
              data: [80, 150, 180, 300, 425, 520, 220, 75],
              backgroundColor: ['#80BCBD','#98DDCA','#FF6464','#F7A76C','#F7A76C','#A1C298' ,'#FF6464']
            }]
          },
          options: {
            plugins: {
              legend: { display: false },
              datalabels: {
                color: '#000',
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
      labels: ['Running', 'Successful', 'Failed'],
      datasets: [{
        label: 'Total Deployments',
        data: [45, 65, 20], // Example numbers
        backgroundColor: ['#F7A76C','#A1C298' ,'#FF6464'], // Blue, Green, Red
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderColor: '#dddddd'
      }]
    },
    options: {
      plugins: {
        legend: { display: true },
        datalabels: {
          color: '#ffffff',
          anchor: 'end',
          align: 'start',
          formatter: (value) => `${value}`,
          borderRadius: 3,
          backgroundColor: (context) => context.dataset.backgroundColor[context.dataIndex],
          font: {
        size: 18,  // Increase this value to make the font larger
        weight: 'bold' // Optional: make the font bold
      }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      cutout: '40%',
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
              backgroundColor: ['#80BCBD','#98DDCA','#FF6464','#F7A76C']
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

      const createdeploymentfrequencyChart = () => {
        const ctx = document.getElementById('deploymentFrequencyChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Environment 1', 'Environment 2', 'Environment 3', 'Environment 4', 'Environment 5'],
            datasets: [{
              label: 'Top Environments and Builds',
              data: [5, 10, 15, 20, 25],
              backgroundColor: ['#80BCBD','#98DDCA','#FF6464','#F7A76C']
            }]
          },
          options: {
            indexAxis: 'y',
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
        isViewbuttonEnabled,
        isTimeframeEnabled,
        showChartSection,
        tableData,
        enableNextDropdown,
        showCharts
      };
    },
    mounted() {
      this.showCharts();
    },
    
computed: {
  modalTitle() {
    return `AIT: ${this.selectedAIT}, SPK: ${this.selectedSPK}, Environment: ${this.selectedEnvironment}`;
  }
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
 /* Height adjustments */
.chart-card {
  height: 450px;
  overflow: hidden; 
  padding: 15px;
  background-color: #f6f6f6;
}

/* Specific adjustment for the bar chart */
.chart-card-short {
  height: 220px; /* Adjusted height for the bar chart */
}

/* Card for displaying deployment info */
.card .card-body {
  padding: 20px;
}

/* Font sizes for large text */
.display-4 {
  font-size: 3rem;
  font-weight: 700;
}

.display-5 {
  font-size: 2rem;
  font-weight: 500;
}

.text-success {
  color: #28a745 !important;
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
  .button-strip {
    margin: 10px;
    
  }
  .btn-custom-info {
            background-color: #d1ecf1; /* Light info color */
            border-color: #bee5eb;    /* Light border color */
            color: #0c5460;           /* Dark text color for contrast */
        }
        .btn-custom-info:hover {
            background-color: #c6e0e8;
            border-color: #b6d1d4;
        }
        .btn-custom-primary {
            background-color: #cce5ff; /* Light primary color */
            border-color: #b8daff;    /* Light border color */
            color: #004085;           /* Dark text color for contrast */
        }
        .btn-custom-primary:hover {
            background-color: #b8daff;
            border-color: #a2c2e0;
        }
  </style>
