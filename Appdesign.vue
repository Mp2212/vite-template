<template>
  <div class="dashboard-wrapper">
    <!-- Tabs with border, connected to panel -->
    <div class="tab-panel-wrapper">
      <ul class="slanted-tabs">
        <li :class="{ active: tab === 'visual' }" @click="tab = 'visual'">
          <i class="fas fa-chart-pie me-2"></i> Visual
        </li>
        <li :class="{ active: tab === 'data' }" @click="tab = 'data'; selectedExec = null">
          <i class="fas fa-table me-2"></i> Data
        </li>
      </ul>
    </div>

    <!-- Main Card -->
    <div class="dashboard-card">
      <transition name="fade" mode="out-in">
        <VisualTab
          v-if="tab === 'visual'"
          :deploymentData="deploymentData"
          @drilldown="handleDrilldown"
          key="visual"
        />
        <DataTab
          v-else
          :gridData="filteredData"
          key="data"
        />
      </transition>
    </div>
  </div>



</template>

<script setup>
import { ref, computed } from 'vue';
import VisualTab from './components/VisualTab.vue';
import DataTab from './components/DataTab.vue';

const tab = ref('visual');
const selectedExec = ref(null);

const handleDrilldown = (exec) => {
  selectedExec.value = exec;
  tab.value = 'data';
};

const deploymentData = ref({
  summary: { successful: 120, failed: 15, running: 8, canceled: 12 },
  env: {
    name: 'SIT1',
    byTechExec: [
      { name: 'Alice', successful: 40, failed: 5, running: 3, canceled: 3 },
      { name: 'Bob', successful: 30, failed: 4, running: 3, canceled: 3 },
      { name: 'Charlie', successful: 25, failed: 3, running: 2, canceled: 4 },
      { name: 'David', successful: 15, failed: 2, running: 1, canceled: 2 },
      { name: 'Eva', successful: 10, failed: 1, running: 1, canceled: 1 }
    ]
  }
});

const fullData = ref([
  { name: 'Alice', ait: '73519', spk: 'CARDMAINT', environment: 'DEV4', repository: 'repo1', artifactUrl: '#', branch: '2025.01.0', deployedDate: '2025-03-17T14:00:00', status: 'Success', jobUrl: '#' },
  { name: 'Bob', ait: '73519', spk: 'CARDMAINT', environment: 'SIT1', repository: 'repo2', artifactUrl: '#', branch: '2025.01.0', deployedDate: '2025-03-18T10:00:00', status: 'Failed', jobUrl: '#' },
  { name: 'Charlie', ait: '73519', spk: 'CARDMAINT', environment: 'UAT', repository: 'repo3', artifactUrl: '#', branch: '2025.01.0', deployedDate: '2025-03-19T12:00:00', status: 'Running', jobUrl: '#' },
  { name: 'David', ait: '73519', spk: 'CARDMAINT', environment: 'DEV', repository: 'repo4', artifactUrl: '#', branch: '2025.01.0', deployedDate: '2025-03-20T08:00:00', status: 'Canceled', jobUrl: '#' },
  { name: 'Eva', ait: '73519', spk: 'CARDMAINT', environment: 'SIT1', repository: 'repo5', artifactUrl: '#', branch: '2025.01.0', deployedDate: '2025-03-21T18:00:00', status: 'Success', jobUrl: '#' }
]);

const filteredData = computed(() =>
  selectedExec.value
    ? fullData.value.filter((x) => x.name === selectedExec.value)
    : fullData.value
);
</script>

<style scoped>
.dashboard-wrapper {
  background-color: #f4f6fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 2rem; /* ⬅️ Reduce from 6.5rem to 2rem */
  padding-bottom: 2rem;
}

.tab-panel-wrapper {
  background: #fff;
  padding: 1rem 2rem 0.5rem;
  border-radius: 20px 20px 0 0;
  width: 1200px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.06);
  border: 1px solid #e0e0e0;
  border-bottom: none;
  margin-bottom: -1px;
}

.slanted-tabs {
  display: flex;
  list-style: none;
  gap: 0.3rem;
  padding-left: 0;
  margin: 0;
}

.slanted-tabs li {
  position: relative;
  background: #e0f2f1;
  padding: 0.8rem 2rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #00796b;
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, 95% 0, 100% 100%, 0% 100%);
  border: 1px solid #ccc;
  border-bottom: none;
}

.slanted-tabs li.active {
  background: #00796b;
  color: #fff;
  font-weight: 600;
  z-index: 2;
}

.dashboard-card {
  width: 1200px;
  background: #fff;
  padding: 2rem;
  border-radius: 0 0 20px 20px;
  border: 1px solid #e0e0e0;
  border-top: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
