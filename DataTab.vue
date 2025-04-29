<template>
    <div class="card shadow-sm rounded-4 p-4 table-wrapper">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="table-title mb-0">
          <i class="fas fa-database me-2"></i> Deployment Data Table
        </h6>
        <div v-if="filteredBy">
          <span class="badge bg-primary px-3 py-2">Filtered by: {{ filteredBy }}</span>
        </div>
      </div>
  
      <div class="table-responsive">
        <table class="table custom-table table-bordered align-middle">
          <thead class="table-dark text-light">
            <tr>
              <th>Tech Executive</th>
              <th>AIT</th>
              <th>SPK</th>
              <th>Environment</th>
              <th>Repository</th>
              <th>Artifact URL</th>
              <th>Branch</th>
              <th>Deployed Date</th>
              <th>Status</th>
              <th>Job URL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in gridData" :key="index">
              <td>{{ row.name }}</td>
              <td>{{ row.ait }}</td>
              <td>{{ row.spk }}</td>
              <td>{{ row.environment }}</td>
              <td>{{ row.repository }}</td>
              <td class="text-center">
                <a :href="row.artifactUrl" target="_blank" class="icon-link" title="Artifact Link">
                  <i class="fas fa-link"></i>
                </a>
              </td>
              <td>{{ row.branch }}</td>
              <td>{{ formatDate(row.deployedDate) }}</td>
              <td>
                <span :class="'status-badge ' + row.status.toLowerCase()">
                  <i :class="statusIcon(row.status)" class="me-1"></i>{{ row.status }}
                </span>
              </td>
              <td class="text-center">
                <a :href="row.jobUrl" target="_blank" class="icon-link" title="Job Link">
                  <i class="fas fa-link"></i>
                </a>
              </td>
            </tr>
            <tr v-if="!gridData || gridData.length === 0">
              <td colspan="10" class="text-center text-muted">No records found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    gridData: Array
  });
  
  const filteredBy = computed(() => {
    if (!props.gridData || props.gridData.length === 0) return null;
    const unique = [...new Set(props.gridData.map((x) => x.name))];
    return unique.length === 1 ? unique[0] : null;
  });
  
  const formatDate = (dt) => {
    const d = new Date(dt);
    const date = d.toLocaleDateString('en-US');
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  };
  
  const statusIcon = (status) => {
    switch (status) {
      case 'Success':
        return 'fas fa-check-circle text-success-lite';
      case 'Failed':
        return 'fas fa-times-circle text-failed-lite';
      case 'Running':
        return 'fas fa-spinner fa-spin text-running-lite';
      case 'Canceled':
        return 'fas fa-ban text-canceled-lite';
      default:
        return 'fas fa-question-circle text-secondary';
    }
  };
  </script>
  
  <style scoped>
  .table-wrapper {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }
  
  .table-title {
    font-weight: 600;
    font-size: 1rem;
    color: #343a40;
  }
  
  .custom-table th {
    background-color: #1f2937;
    color: #fff;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 0.75rem;
  }
  
  .custom-table td {
    font-size: 0.88rem;
    padding: 0.65rem 0.75rem;
    vertical-align: middle;
  }
  
  .status-badge {
    padding: 5px 10px;
    font-size: 0.75rem;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    background-color: #f0f0f0;
  }
  
  .status-badge.success {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  .status-badge.failed {
    background-color: #fdecea;
    color: #c0392b;
  }
  .status-badge.running {
    background-color: #fff8e1;
    color: #f39c12;
  }
  .status-badge.canceled {
    background-color: #f4f4f4;
    color: #757575;
  }
  
  .text-success-lite {
    color: #2e7d32;
  }
  .text-failed-lite {
    color: #c0392b;
  }
  .text-running-lite {
    color: #f39c12;
  }
  .text-canceled-lite {
    color: #757575;
  }
  
  .icon-link {
    color: #0d6efd;
    text-decoration: none;
    transition: 0.2s ease;
  }
  .icon-link:hover {
    opacity: 0.7;
  }
  </style>
  