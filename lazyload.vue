<template>
  <div>
    <!-- Global Search Bar -->
    <input
      v-model="searchQuery"
      @input="filterRecords"
      placeholder="Search by name or email..."
      class="search-bar"
    />

    <!-- Scroll Container -->
    <div ref="scrollContainer" @scroll="onScroll" class="scroll-container">
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

      <!-- Loading Spinner -->
      <div v-if="loading" class="loading">
        <img src="../assets/img/loading.gif" alt="Loading" class="loading-gif" />
        Loading...
      </div>

      <!-- End of Records Message -->
      <div v-if="allDataLoaded" class="end-message">
        All data loaded.
      </div>
    </div>

    <!-- Footer with Up Button -->
    <div class="footer">
      <button @click="scrollToTop" class="up-button">↑ Up</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const records = ref([]);
const filteredRecords = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const allDataLoaded = ref(false);
const currentPage = ref(1);  // Start from page 1
const scrollContainer = ref(null);
const pageSize = 10;
const initialLoadSize = 20;

const fetchRecords = async (isInitial = false) => {
  if (loading.value || allDataLoaded.value) return;

  loading.value = true;
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments', {
      params: {
        _page: currentPage.value,
        _limit: isInitial ? initialLoadSize : pageSize,
      },
    });

    if (response.data.length > 0) {
      if (isInitial) {
        records.value = response.data; // Load initial 20 records
        currentPage.value = 2; // Set to 2 for subsequent loads
      } else {
        records.value.push(...response.data);
        currentPage.value += 1; // Increment the page number for the next batch
      }
      filterRecords(); // Apply search filter on the loaded records
    } else {
      allDataLoaded.value = true; // All data has been loaded
    }
  } catch (error) {
    console.error('Failed to fetch records:', error);
  } finally {
    loading.value = false;
  }
};

const onScroll = () => {
  const container = scrollContainer.value;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
    fetchRecords(); // Fetch more records when near the bottom of the container
  }
};

const scrollToTop = () => {
  scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' });
  currentPage.value = 1;
  records.value = [];
  allDataLoaded.value = false;
  fetchRecords(true); // Load initial 20 records
};

const filterRecords = () => {
  const query = searchQuery.value.toLowerCase();
  filteredRecords.value = records.value.filter(
    record =>
      record.name.toLowerCase().includes(query) ||
      record.email.toLowerCase().includes(query)
  );
};

onMounted(() => {
  fetchRecords(true); // Initial load with 20 records
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

.scroll-container {
  height: 400px; /* Set a fixed height to enable scrolling */
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #fff;
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

.loading {
  text-align: center;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-gif {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.end-message {
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
}

.footer {
  margin-top: 10px;
  text-align: center;
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