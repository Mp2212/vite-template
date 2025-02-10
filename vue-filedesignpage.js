<template>
  <div class="pagination-container">
    <!-- Page Size Selector -->
    <div class="page-size-selector">
      <label for="page-size">Page Size:</label>
      <select id="page-size" v-model="pageSize" @change="updatePagination">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>

    <!-- Pagination Info -->
    <div class="pagination-info">
      {{ startIndex + 1 }} to {{ endIndex }} of {{ totalRecords }}
    </div>

    <!-- Custom Pagination Controls -->
    <div class="custom-pagination">
      <button @click="goToFirstPage" :disabled="currentPage === 1">«</button>
      <button @click="goToPreviousPage" :disabled="currentPage === 1">‹</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">›</button>
      <button @click="goToLastPage" :disabled="currentPage === totalPages">»</button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";

// Reactive data properties
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(764); // Total number of records
const pageSizes = [10, 25, 50, 100]; // Page size options

// Computed properties for pagination logic
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value));
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() =>
  Math.min(startIndex.value + pageSize.value, totalRecords.value)
);

// Methods to handle pagination
const updatePagination = () => {
  currentPage.value = 1; // Reset to the first page when page size changes
};

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
};
</script>


.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px 0;
  font-family: Arial, sans-serif;
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-info {
  font-size: 14px;
  color: #555;
}

.custom-pagination {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom-pagination button {
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-pagination button:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.custom-pagination button:hover:not(:disabled) {
  background-color: #007bff;
  color: #fff;
}
