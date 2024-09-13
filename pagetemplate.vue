<template>
  <div>
    <!-- Global Search Bar -->
    <input
      v-model="searchQuery"
      @input="filterRecords"
      placeholder="Search by name or email..."
      class="search-bar"
    />

    <!-- Loading Indicator -->
    <div v-if="loading" class="loading-overlay">
      <img src="../assets/img/loading.gif" alt="Loading" class="loading-gif" />
      Loading...
    </div>

    <!-- Table with Records -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredRecords" :key="record.id">
            <td>{{ record.id }}</td>
            <td>{{ record.name }}</td>
            <td>{{ record.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="startPage === 1">Prev</button>
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="startPage + 9 >= totalPages">Next</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const records = ref([]);
const filteredRecords = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(100); // Total pages
const pageSize = 10; // Number of records per page
const startPage = ref(1); // Track where to start showing pages

// Fetch records based on the current page
const fetchRecords = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments', {
      params: {
        _page: currentPage.value,
        _limit: pageSize,
      },
    });

    records.value = response.data;
    filterRecords();
  } catch (error) {
    console.error('Failed to fetch records:', error);
  } finally {
    loading.value = false;
  }
};

const filterRecords = () => {
  const query = searchQuery.value.toLowerCase();
  filteredRecords.value = records.value.filter(
    record =>
      record.name.toLowerCase().includes(query) ||
      record.email.toLowerCase().includes(query)
  );
};

// Logic to calculate visible pages (10 at a time)
const visiblePages = computed(() => {
  const endPage = Math.min(startPage.value + 9, totalPages.value); // Limit to 10 pages max
  const pages = [];
  for (let i = startPage.value; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const prevPage = async () => {
  if (startPage.value > 1) {
    startPage.value -= 10;
    currentPage.value = startPage.value;
    await fetchRecords();
  }
};

const nextPage = async () => {
  if (startPage.value + 9 < totalPages.value) {
    startPage.value += 10;
    currentPage.value = startPage.value;
    await fetchRecords();
  }
};

const goToPage = async (page) => {
  currentPage.value = page;
  await fetchRecords();
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  fetchRecords(); // Initial load with page 1
});
</script>

<style scoped>
.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.table-container {
  position: relative;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  z-index: 1000; /* Ensure it appears above all other content */
}

.loading-gif {
  width: 48px;
  height: 48px;
  margin-right: 8px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #0056b3;
}

.up-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Shadow for the button */
  margin-bottom: 20px;
}

.up-button:hover {
  background-color: #0056b3;
}
</style>