<template>
  <div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in paginatedRecords" :key="index">
            <td>{{ record.branch }}</td>
            <td>{{ record.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="export-buttons">
      <button @click="exportToExcel">Export to Excel</button>
      <button @click="exportToCSV">Export to CSV</button>
      <button @click="exportToPDF">Export to PDF</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

// Sample data
const filteredRecords = ref([
  { branch: 'Branch 1', status: 'Success' },
  { branch: 'Branch 2', status: 'Failed' },
  { branch: 'Branch 3', status: 'Success' },
  { branch: 'Branch 4', status: 'Running' },
]);

const page = ref(1);
const pageSize = 5;

// Computed property for paginated records
const paginatedRecords = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredRecords.value.slice(start, start + pageSize);
});

// Excel Export Function
const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(filteredRecords.value);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Records');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const excelFile = new Blob([excelBuffer], { bookType: 'xlsx', type: 'application/octet-stream' });
  saveAs(excelFile, 'records.xlsx');
};

// CSV Export Function
const exportToCSV = () => {
  const csvData = filteredRecords.value.map(record => ({
    branch: record.branch,
    status: record.status
  }));
  
  const csvContent = [
    ['Branch', 'Status'],
    ...csvData.map(record => [record.branch, record.status])
  ].map(row => row.join(',')).join('\n');
  
  const csvFile = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(csvFile, 'records.csv');
};

// PDF Export Function
const exportToPDF = () => {
  const doc = new jsPDF();
  
  // Add table to PDF
  doc.autoTable({
    head: [['Branch', 'Status']],
    body: filteredRecords.value.map(record => [record.branch, record.status]),
  });

  // Save PDF
  doc.save('records.pdf');
};
</script>

<style scoped>
.table-container {
  max-height: 400px;
  overflow-y: auto;
}

.export-buttons {
  margin-top: 20px;
}

.export-buttons button {
  margin-right: 10px;
}
</style>