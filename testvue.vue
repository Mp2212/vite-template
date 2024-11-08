<template>
  <div class="container">
    <h1>Posts</h1>
    <table class="post-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="post.id">
          <td>{{ post.userId }}</td>
          <td>{{ post.title }}</td>
          <td class="action-cell">
            <button @click="toggleDetails(index)">View</button>
            <transition name="slide-fade">
              <div v-if="detailsVisible[index]" class="details-card">
                <h2>Details</h2>
                <ul class="details-list">
                  <li><strong>Username:</strong> John Doe</li>
                  <li><strong>Address:</strong> 123 Main St</li>
                  <li><strong>City:</strong> Springfield</li>
                  <li><strong>Phone:</strong> 123-456-7890</li>
                </ul>
                <button @click="toggleDetails(index)">Close</button>
              </div>
            </transition>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);
const detailsVisible = ref([]); // Track visibility for each post

// Fetch posts on mount
const fetchPosts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    posts.value = response.data;
    detailsVisible.value = new Array(response.data.length).fill(false); // Initialize visibility tracking
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const toggleDetails = (index) => {
  detailsVisible.value[index] = !detailsVisible.value[index]; // Toggle visibility for clicked post
};

onMounted(fetchPosts);
</script>

<style>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.post-table th,
.post-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* Details Card Styling */
.action-cell {
  position: relative; /* Needed to position the card near the button */
}

.details-card {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -110%);
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 8px; /* Slightly less padding */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 200px;
  text-align: center;
  font-size: 0.85em; /* Smaller font size for card content */
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.details-list li {
  background-color: #fff;
  padding: 6px; /* Adjusted padding for a compact look */
  margin: 4px 0; /* Less spacing for compactness */
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 0.85em; /* Consistent smaller font */
}

.details-list li strong {
  color: #333;
  font-weight: 600;
}

/* Slide-Fade Transition */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
