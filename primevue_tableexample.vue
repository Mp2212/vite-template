<template>
  <div class="speeddial-demo">
    <SpeedDial 
      :model="items" 
      direction="up" 
      class="p-speeddial-bottom-right"
    ></SpeedDial>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const exportCSV = () => {
  console.log('Exporting CSV...');
  // Add your CSV export logic here
};

const exportExcel = () => {
  console.log('Exporting Excel...');
  // Add your Excel export logic here
};

const exportPDF = () => {
  console.log('Exporting PDF...');
  // Add your PDF export logic here
};

const items = ref([
  {
    label: 'Export CSV',
    icon: 'pi pi-file',
    command: exportCSV,
    tooltipOptions: { tooltipLabel: 'Export as CSV', tooltipPosition: 'left' },
  },
  {
    label: 'Export Excel',
    icon: 'pi pi-file-excel',
    command: exportExcel,
    tooltipOptions: { tooltipLabel: 'Export as Excel', tooltipPosition: 'left' },
  },
  {
    label: 'Export PDF',
    icon: 'pi pi-file-pdf',
    command: exportPDF,
    tooltipOptions: { tooltipLabel: 'Export as PDF', tooltipPosition: 'left' },
  },
]);
</script>

<style>
.speeddial-demo {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}

.p-speeddial-bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>


<template>
  <div>
    <!-- Global Search -->
    <div class="p-inputgroup mb-3">
      <span class="p-inputgroup-addon"><i class="pi pi-search"></i></span>
      <InputText v-model="globalFilter" placeholder="Global Search" />
    </div>

    <!-- PrimeVue DataTable -->
    <DataTable
      :value="records"
      :filters="filters"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20]"
      :sortMode="'multiple'"
      :responsiveLayout="'scroll'"
    >
      <Column
        field="ansibleJobName"
        header="Ansible JobName"
        :sortable="true"
      ></Column>
      <Column
        field="techExec"
        header="Tech Executive"
        :sortable="true"
      ></Column>
      <Column field="ait" header="AIT" :sortable="true"></Column>
      <Column field="spk" header="SPK" :sortable="true"></Column>
      <Column
        field="deploymentEnvironment"
        header="Environment"
        :sortable="true"
      ></Column>
      <Column field="repository" header="Repository" :sortable="true"></Column>
      <Column field="scmBranch" header="Branch" :sortable="true"></Column>
      <Column
        header="Status"
        :body="statusTemplate"
      ></Column>
      <Column
        header="Job URL"
        :body="urlTemplate"
        style="text-align: center;"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { InputText } from 'primevue/inputtext';
import { DataTable } from 'primevue/datatable';
import { Column } from 'primevue/column';

// Sample data
const records = ref([
  {
    ansibleJobName: 'Job 1',
    techExec: 'Exec 1',
    ait: 'AIT 1',
    spk: 'SPK 1',
    deploymentEnvironment: 'Env 1',
    repository: 'Repo 1',
    scmBranch: 'main',
    deploymentStatus: 'successful',
    artifactUrl: 'https://example.com/job1',
  },
  {
    ansibleJobName: 'Job 2',
    techExec: 'Exec 2',
    ait: 'AIT 2',
    spk: 'SPK 2',
    deploymentEnvironment: 'Env 2',
    repository: 'Repo 2',
    scmBranch: 'develop',
    deploymentStatus: 'running',
    artifactUrl: 'https://example.com/job2',
  },
  {
    ansibleJobName: 'Job 3',
    techExec: 'Exec 3',
    ait: 'AIT 3',
    spk: 'SPK 3',
    deploymentEnvironment: 'Env 3',
    repository: 'Repo 3',
    scmBranch: 'feature',
    deploymentStatus: 'failed',
    artifactUrl: 'https://example.com/job3',
  },
]);

const globalFilter = ref('');
const filters = ref({
  global: { value: null, matchMode: 'contains' },
});

// Watch global filter to update table filter
watch(globalFilter, (value) => {
  filters.value.global.value = value;
});

// Status template for conditional rendering
const statusTemplate = (rowData) => {
  if (rowData.deploymentStatus === 'successful') {
    return `<div style="display: flex; align-items: center;">
              <i class="pi pi-check-circle" style="color: green; margin-right: 5px;"></i>
              <span>Success</span>
            </div>`;
  } else if (rowData.deploymentStatus === 'running') {
    return `<div style="display: flex; align-items: center;">
              <img src="../assets/img/loading.gif" alt="Running" style="width: 20px; margin-right: 5px;" />
              <span>Running</span>
            </div>`;
  } else if (rowData.deploymentStatus === 'failed') {
    return `<div style="display: flex; align-items: center;">
              <i class="pi pi-times-circle" style="color: red; margin-right: 5px;"></i>
              <span>Failed</span>
            </div>`;
  }
};

// URL template for the Job URL
const urlTemplate = (rowData) => {
  return `<a href="${rowData.artifactUrl}" target="_blank" title="${rowData.artifactUrl}">
            <i class="pi pi-link"></i>
          </a>`;
};
</script>

<style>
.speeddial-demo {
  margin-top: 20px;
}
</style>