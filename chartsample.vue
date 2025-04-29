<template>
  <div class="container-xl visual-tab">
    <div class="mb-4 d-flex align-items-center gap-3">
      <label class="fw-semibold fs-6">Select Environment:</label>
      <select v-model="selectedEnv" class="form-select w-auto" @change="renderCharts">
        <option v-for="env in environments" :key="env" :value="env">{{ env }}</option>
      </select>
    </div>

    <div v-if="selectedEnv && currentEnvData" class="row g-4">
      <!-- Donut -->
      <div class="col-md-4">
        <div class="card chart-card p-4 h-100 shadow-lg">
          <h5 class="chart-title text-primary">
            <i class="fas fa-chart-pie me-2"></i> Deployment Summary
          </h5>
          <div class="chart-container donut-container">
            <canvas id="donutChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Bar -->
      <div class="col-md-8">
        <div class="card chart-card p-4 h-100 shadow-lg">
          <h5 class="chart-title text-success">
            <i class="fas fa-chart-bar me-2"></i> {{ selectedEnv }} Deployment by Tech Exec
          </h5>
          <div class="chart-container">
            <canvas id="barChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning mt-4">
      No deployment data available.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const emit = defineEmits(['drilldown']);

const environments = ref(['SIT1']);
const deploymentStore = {
  SIT1: {
    summary: { successful: 120, failed: 15, running: 8, canceled: 12 },
    byTechExec: [
      { name: 'Alice', successful: 40, failed: 5, running: 1, canceled: 3 },
      { name: 'Bob', successful: 30, failed: 4, running: 3, canceled: 3 },
      { name: 'Charlie', successful: 25, failed: 3, running: 2, canceled: 4 },
      { name: 'David', successful: 15, failed: 2, running: 1, canceled: 2 },
      { name: 'Eva', successful: 10, failed: 1, running: 1, canceled: 1 }
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

  const donutCtx = document.getElementById('donutChart').getContext('2d');
  const barCtx = document.getElementById('barChart').getContext('2d');

  // Donut chart gradients
  const donutGradients = {
    successful: donutCtx.createLinearGradient(0, 0, 0, 200),
    failed: donutCtx.createLinearGradient(0, 0, 0, 200),
    running: donutCtx.createLinearGradient(0, 0, 0, 200),
    canceled: donutCtx.createLinearGradient(0, 0, 0, 200)
  };

  donutGradients.successful.addColorStop(0, '#e0f7e9');
  donutGradients.successful.addColorStop(1, '#66bb6a');

  donutGradients.failed.addColorStop(0, '#ffe5e5');
  donutGradients.failed.addColorStop(1, '#e53935');

  donutGradients.running.addColorStop(0, '#fffde7');
  donutGradients.running.addColorStop(1, '#fdd835');

  donutGradients.canceled.addColorStop(0, '#fff3e0');
  donutGradients.canceled.addColorStop(1, '#fb8c00');

  // Bar chart gradients
  const barGradients = {
    successful: barCtx.createLinearGradient(0, 0, 0, 300),
    failed: barCtx.createLinearGradient(0, 0, 0, 300),
    running: barCtx.createLinearGradient(0, 0, 0, 300),
    canceled: barCtx.createLinearGradient(0, 0, 0, 300)
  };

  barGradients.successful.addColorStop(0, '#e0f7e9');
  barGradients.successful.addColorStop(1, '#66bb6a');

  barGradients.failed.addColorStop(0, '#ffe5e5');
  barGradients.failed.addColorStop(1, '#e53935');

  barGradients.running.addColorStop(0, '#fffde7');
  barGradients.running.addColorStop(1, '#fdd835');

  barGradients.canceled.addColorStop(0, '#fff3e0');
  barGradients.canceled.addColorStop(1, '#fb8c00');

  const summary = currentEnvData.value.summary;
  const total = Object.values(summary).reduce((a, b) => a + b, 0);

  donutChartInstance = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
      labels: ['Successful', 'Failed', 'Running', 'Canceled'],
      datasets: [{
        data: [summary.successful, summary.failed, summary.running, summary.canceled],
        backgroundColor: [
          donutGradients.successful,
          donutGradients.failed,
          donutGradients.running,
          donutGradients.canceled
        ],
        hoverOffset: 14,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      cutout: '60%',
      plugins: {
        legend: { position: 'bottom' },
        datalabels: {
          color: '#000',
          backgroundColor: '#fff',
          borderRadius: 14,
          font: { weight: 'bold', size: 12 },
          padding: 5,
          formatter: v => v > 0 ? v : ''
        }
      }
    },
    plugins: [{
      id: 'center-text',
      beforeDraw(chart) {
        const { width, height, ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('Total Deployments', width / 2, height / 2 - 10);
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = '#1c3faa';
        ctx.fillText(`${total}`, width / 2, height / 2 + 20);
        ctx.restore();
      }
    }]
  });

  barChartInstance = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: currentEnvData.value.byTechExec.map(x => x.name),
      datasets: [
        {
          label: 'Successful',
          backgroundColor: barGradients.successful,
          stack: 'stack',
          data: currentEnvData.value.byTechExec.map(x => x.successful)
        },
        {
          label: 'Failed',
          backgroundColor: barGradients.failed,
          stack: 'stack',
          data: currentEnvData.value.byTechExec.map(x => x.failed)
        },
        {
          label: 'Running',
          backgroundColor: barGradients.running,
          stack: 'stack',
          data: currentEnvData.value.byTechExec.map(x => x.running)
        },
        {
          label: 'Canceled',
          backgroundColor: barGradients.canceled,
          stack: 'stack',
          data: currentEnvData.value.byTechExec.map(x => x.canceled)
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick(e, el) {
        if (el.length > 0) {
          const index = el[0].index;
          emit('drilldown', currentEnvData.value.byTechExec[index].name);
        }
      },
      plugins: {
        legend: { position: 'top' },
        datalabels: {
          color: '#000',
          backgroundColor: '#fff',
          borderRadius: 20,
          font: { weight: 'bold', size: 11 },
          padding: 5,
          display: (ctx) => {
            const value = ctx.dataset.data[ctx.dataIndex];
            return value > 2;
          },
          formatter: value => value
        }
      },
      scales: {
        x: { stacked: true, ticks: { padding: 5 } },
        y: { stacked: true, beginAtZero: true, ticks: { stepSize: 10 } }
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
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.chart-title {
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(to right, #eef2f3, #fdfdfd);
  padding: 10px 14px;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.chart-container {
  height: 300px;
}
</style>
