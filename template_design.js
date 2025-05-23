<template>
  <div class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.6);" role="dialog">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content rounded-4 shadow-lg">
        <div class="modal-header bg-light border-bottom-0">
          <h5 class="modal-title fw-semibold">📦 Deployment History</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body px-4 pt-3 pb-1">
          <div class="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div class="d-flex gap-2">
              <button class="btn btn-outline-secondary btn-xs" @click="copyTable" title="Copy"><i class="fas fa-copy"></i></button>
              <button class="btn btn-outline-secondary btn-xs" @click="exportCSV" title="CSV"><i class="fas fa-file-csv"></i></button>
              <button class="btn btn-outline-success btn-xs" @click="exportExcel" title="Excel"><i class="fas fa-file-excel"></i></button>
              <button class="btn btn-outline-danger btn-xs" @click="exportPDF" title="PDF"><i class="fas fa-file-pdf"></i></button>
            </div>
            <div class="w-50">
              <input v-model="search" class="form-control form-control-sm border border-primary" placeholder="🔍 Search history..." />
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-sm table-striped table-hover align-middle table-bordered rounded">
              <thead class="table-light">
                <tr>
                  <th>Job ID</th>
                  <th>SPK</th>
                  <th>Env</th>
                  <th>Status</th>
                  <th>Deployed Date</th>
                  <th>Artifact</th>
                  <th>Playbook</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in paginatedRecords" :key="i">
                  <td>{{ item.ansibleJobId }}</td>
                  <td>{{ item.spk }}</td>
                  <td>{{ item.deploymentEnvironment }}</td>
                  <td :class="statusClass(item.deploymentStatus)">{{ item.deploymentStatus }}</td>
                  <td>{{ item.deployedDate }}</td>
                  <td><a :href="item.artifactUrl" target="_blank"><i class="fas fa-link text-primary"></i></a></td>
                  <td><a :href="item.jobUrl" target="_blank"><i class="fas fa-link text-success"></i></a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex flex-wrap justify-content-between align-items-center mt-2 p-2 border-top">
            <small class="text-muted">Showing {{ paginatedRecords.length }} of {{ filteredRecords.length }} records</small>
            <nav>
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" @click="currentPage--">&laquo;</button>
                </li>
                <li
                  v-for="n in visiblePages"
                  :key="n"
                  class="page-item"
                  :class="{ active: currentPage === n }"
                >
                  <button class="page-link" @click="currentPage = n">{{ n }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link" @click="currentPage++">&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, defineProps, defineEmits } from 'vue'
import { utils, writeFile } from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import axios from 'axios'

const props = defineProps({ record: Object })
const emit = defineEmits(['close'])

const history = ref([])
const search = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const loadHistory = async () => {
  // ✅ Dummy data for development
  history.value = Array.from({ length: 1000 }).map((_, i) => ({
    ansibleJobId: `JOB${i + 1}`,
    spk: props.record.spk,
    deploymentEnvironment: props.record.deploymentEnvironment,
    deploymentStatus: i % 3 === 0 ? 'successful' : i % 3 === 1 ? 'failed' : 'running',
    deployedDate: `2025-05-${(i % 28 + 1).toString().padStart(2, '0')} 10:${(i % 60).toString().padStart(2, '0')} EST`,
    artifactUrl: `https://example.com/artifact${i + 1}.zip`,
    jobUrl: `https://example.com/job/${i + 1}`
  }))

  // ✅ API code for production (uncomment to enable)
  /*
  try {
    const { data } = await axios.post(
      '/horizon-inventory/getDeploymentHistoryByTimeframe',
      {
        spk: props.record.spk,
        ait: props.record.ait,
        repo: props.record.repository,
        env: props.record.deploymentEnvironment,
        timeframe: '3months',
        isProd: true
      }
    )
    history.value = data
  } catch (error) {
    console.error('API fetch error:', error)
  }
  */
}

const filteredRecords = computed(() =>
  history.value.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(search.value.toLowerCase())
    )
  )
)

const totalPages = computed(() => Math.ceil(filteredRecords.value.length / pageSize.value))

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredRecords.value.slice(start, start + pageSize.value)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []

  const maxVisible = 10
  let start = Math.max(1, current - Math.floor(maxVisible / 2))
  let end = Math.min(total, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

const statusClass = (status) => {
  return status === 'successful' ? 'text-success fw-bold'
    : status === 'failed' ? 'text-danger fw-bold'
    : status === 'running' ? 'text-primary fw-bold'
    : 'text-muted'
}

watch(search, () => {
  currentPage.value = 1
})

onMounted(loadHistory)

const copyTable = () => {
  const rows = filteredRecords.value.map(item => Object.values(item).join('\t')).join('\n')
  navigator.clipboard.writeText(rows)
}

const exportCSV = () => {
  const ws = utils.json_to_sheet(filteredRecords.value)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'History')
  writeFile(wb, 'deployment_history.csv')
}

const exportExcel = () => {
  const ws = utils.json_to_sheet(filteredRecords.value)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'History')
  writeFile(wb, 'deployment_history.xlsx')
}

const exportPDF = () => {
  const doc = new jsPDF()
  autoTable(doc, {
    head: [['Job ID', 'SPK', 'Env', 'Status', 'Date', 'Artifact', 'Playbook']],
    body: filteredRecords.value.map(item => [
      item.ansibleJobId,
      item.spk,
      item.deploymentEnvironment,
      item.deploymentStatus,
      item.deployedDate,
      item.artifactUrl,
      item.jobUrl
    ])
  })
  doc.save('deployment_history.pdf')
}
</script>

<style scoped>
.table td, .table th {
  vertical-align: middle;
  white-space: nowrap;
  font-size: 13px;
}
.modal-content {
  height: auto;
  overflow: visible;
}
.modal-body {
  max-height: none;
  overflow: visible;
  padding-bottom: 0.5rem;
}
.modal-header .modal-title {
  font-size: 16px;
}
.btn-xs {
  padding: 2px 6px;
  font-size: 12px;
  line-height: 1.2;
}
</style>
