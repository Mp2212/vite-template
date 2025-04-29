<template>
  <div class="container-xl visual-tab">
    <!-- Environment Dropdown -->
    <div class="mb-4 d-flex align-items-center gap-3">
      <label class="fw-semibold">Select Environment:</label>
      <select v-model="selectedEnv" class="form-select w-auto" @change="renderCharts">
        <option v-for="env in environments" :key="env" :value="env">
          {{ env }}
        </option>
      </select>
    </div>

    <div v-if="selectedEnv && currentEnvData" class="row g-4">
      <!-- Donut Chart -->
      <div class="col-md-4">
        <div class="card chart-card p-4 h-100">
          <h6 class="text-primary mb-3">
            <i class="fas fa-chart-pie me-2"></i> Deployment Summary
          </h6>
          <div class="chart-container donut-container">
            <canvas id="donutChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Stacked Bar Chart -->
      <div class="col-md-8">
        <div class="card chart-card p-4 h-100">
          <h6 class="text-success mb-3">
            <i class="fas fa-chart-bar me-2"></i> {{ selectedEnv }} Deployment by Tech Exec
          </h6>
          <div class="chart-container">
            <canvas id="barChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning mt-4">
      No deployment data available. Please check your data input.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const emit = defineEmits(['drilldown']);

// Dummy environments and data
const environments = ref(['SIT1', 'DEV', 'UAT']);
const deploymentStore = {
  SIT1: {
    summary: { successful: 120, failed: 15, running: 8, canceled: 12 },
    byTechExec: [
      { name: 'Alice', successful: 40, failed: 5, running: 1, canceled: 3 },
      { name: 'Bob', successful: 30, failed: 4, running: 3, canceled: 2 },
      { name: 'Charlie', successful: 25, failed: 3, running: 2, canceled: 4 },
      { name: 'David', successful: 15, failed: 2, running: 1, canceled: 2 },
      { name: 'Eva', successful: 10, failed: 1, running: 1, canceled: 1 }
    ]
  },
  DEV: {
    summary: { successful: 100, failed: 10, running: 5, canceled: 10 },
    byTechExec: [
      { name: 'Alice', successful: 35, failed: 2, running: 1, canceled: 2 },
      { name: 'Bob', successful: 25, failed: 3, running: 2, canceled: 1 },
      { name: 'Charlie', successful: 20, failed: 2, running: 1, canceled: 3 },
      { name: 'David', successful: 10, failed: 2, running: 1, canceled: 2 },
      { name: 'Eva', successful: 10, failed: 1, running: 0, canceled: 2 }
    ]
  },
  UAT: {
    summary: { successful: 90, failed: 12, running: 4, canceled: 8 },
    byTechExec: [
      { name: 'Alice', successful: 30, failed: 4, running: 1, canceled: 2 },
      { name: 'Bob', successful: 20, failed: 3, running: 1, canceled: 2 },
      { name: 'Charlie', successful: 20, failed: 3, running: 1, canceled: 2 },
      { name: 'David', successful: 10, failed: 1, running: 1, canceled: 1 },
      { name: 'Eva', successful: 10, failed: 1, running: 0, canceled: 1 }
    ]
  }
};

const selectedEnv = ref(environments.value[0]);
const currentEnvData = computed(() => deploymentStore[selectedEnv.value]);

let donutChartInstance = null;
let barChartInstance = null;

const renderCharts = () => {
  if (!currentEnvData.value) return;

  donutChartInstance?.destroy();
  barChartInstance?.destroy();

  const summary = currentEnvData.value.summary;
  const donutData = {
    labels: ['Successful', 'Failed', 'Running', 'Canceled'],
    datasets: [{
      data: [summary.successful, summary.failed, summary.running, summary.canceled],
      backgroundColor: ['#A5D6A7', '#EF9A9A', '#FFF59D', '#FFCC80'],
      hoverOffset: 14,
      borderWidth: 2
    }]
  };

  const total = Object.values(summary).reduce((a, b) => a + b, 0);

  donutChartInstance = new Chart(document.getElementById('donutChart'), {
    type: 'doughnut',
    data: donutData,
    options: {
      responsive: true,
      cutout: '60%',
      plugins: {
        legend: { position: 'bottom' },
        datalabels: {
          color: '#222',
          font: { weight: 'bold', size: 14 },
          formatter: (v) => v > 0 ? v : ''
        }
      }
    },
    plugins: [{
      id: 'center-text',
      beforeDraw(chart) {
        const { width, height, ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#888';
        ctx.fillText('Total Deployments', width / 2, height / 2 - 15);
        ctx.font = 'bold 30px sans-serif';
        ctx.fillStyle = '#4158a6';
        ctx.fillText(`${total}`, width / 2, height / 2 + 15);
        ctx.restore();
      }
    }]
  });

  const barData = {
    labels: currentEnvData.value.byTechExec.map(x => x.name),
    datasets: [
      {
        label: 'Successful',
        backgroundColor: '#A5D6A7',
        stack: 'deploy',
        data: currentEnvData.value.byTechExec.map(x => x.successful)
      },
      {
        label: 'Failed',
        backgroundColor: '#EF9A9A',
        stack: 'deploy',
        data: currentEnvData.value.byTechExec.map(x => x.failed)
      },
      {
        label: 'Running',
        backgroundColor: '#FFF59D',
        stack: 'deploy',
        data: currentEnvData.value.byTechExec.map(x => x.running)
      },
      {
        label: 'Canceled',
        backgroundColor: '#FFCC80',
        stack: 'deploy',
        data: currentEnvData.value.byTechExec.map(x => x.canceled)
      }
    ]
  };

  barChartInstance = new Chart(document.getElementById('barChart'), {
  type: 'bar',
  data: barData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      datalabels: {
        color: '#000',
        font: {
          weight: 'bold',
          size: 11
        },
        offset: 14, // <-- Adds space between the bars and labels
        anchor: 'center',
        align: 'center',
        formatter: function (value, context) {
  return value > 2 ? value : ''; // ← only show if label fits cleanly
}
      }
    },
    onClick(e, el) {
      if (el.length > 0) {
        const index = el[0].index;
        emit('drilldown', currentEnvData.value.byTechExec[index].name);
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          padding: 5
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      }
    }
  }
});

};

onMounted(renderCharts);
watch(() => selectedEnv.value, renderCharts);
onBeforeUnmount(() => {
  donutChartInstance?.destroy();
  barChartInstance?.destroy();
});
</script>

<style scoped>
.visual-tab {
  padding-top: 1rem;
}
.chart-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
}
.chart-container {
  height: 270px;
}

</style>
