<script setup>
import { ref, computed } from 'vue';

const newSearchTerm = ref('');
const searchTags = ref([]);
const records = ref([
  { deploymentStatus: 'successful', ansiblePlaybook: 'https://example.com', name: 'App1' },
  { deploymentStatus: 'failed', ansiblePlaybook: 'https://example.com', name: 'App2' },
  { deploymentStatus: 'running', ansiblePlaybook: 'https://example.com', name: 'App3' },
]);

const columns = ref([
  { key: 'deploymentStatus', label: 'Status' },
  { key: 'ansiblePlaybook', label: 'Playbook' },
  { key: 'name', label: 'Application' },
]);

const sortKey = ref(null);
const sortDirection = ref('asc');

const addSearchTag = () => {
  if (newSearchTerm.value.trim()) {
    searchTags.value.push(newSearchTerm.value.trim());
    newSearchTerm.value = '';
  }
};

const removeSearchTag = (index) => {
  searchTags.value.splice(index, 1);
};

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
};

const highlightText = (text) => {
  if (!newSearchTerm.value) return text;
  const searchLower = newSearchTerm.value.toLowerCase();
  const textLower = String(text).toLowerCase();
  if (textLower.includes(searchLower)) {
    const regex = new RegExp(`(${newSearchTerm.value})`, 'ig');
    return String(text).replace(regex, '<mark>$1</mark>');
  }
  return text;
};

const filteredRecordsComputed = computed(() => {
  let filteredRecords = records.value;

  if (newSearchTerm.value.length > 0) {
    const searchLower = newSearchTerm.value.toLowerCase();

    filteredRecords = filteredRecords.filter((record) => {
      if (['running', 'failed', 'successful', 'success'].includes(searchLower)) {
        return (
          record.deploymentStatus.toLowerCase() === searchLower ||
          (searchLower === 'success' && record.deploymentStatus === 'successful')
        );
      }

      return Object.keys(record).some((key) => {
        const value = record[key];
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }

  if (searchTags.value.length > 0) {
    filteredRecords = filteredRecords.filter((record) =>
      searchTags.value.every((tag) =>
        Object.keys(record).some((key) => {
          const value = record[key];
          const tagLower = tag.toLowerCase();
          return String(value).toLowerCase().includes(tagLower);
        })
      )
    );
  }

  if (sortKey.value) {
    filteredRecords = [...filteredRecords].sort((a, b) => {
      const aValue = a[sortKey.value];
      const bValue = b[sortKey.value];
      if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filteredRecords;
});
</script>

<template>
  <div>
    <div class="searchbox">
      <input
        type="text"
        v-model="newSearchTerm"
        @keyup.enter="addSearchTag"
        placeholder="Search..."
      />
      <div v-for="(tag, index) in searchTags" :key="index">
        <span>{{ tag }}</span>
        <button @click="removeSearchTag(index)">x</button>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            @click="handleSort(column.key)"
          >
            {{ column.label }}
            <span v-if="sortKey === column.key">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, rowIndex) in filteredRecordsComputed" :key="rowIndex">
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            <template v-if="column.key === 'deploymentStatus'">
              <span v-if="record.deploymentStatus === 'successful'">✅ Success</span>
              <span v-else-if="record.deploymentStatus === 'failed'">❌ Failed</span>
              <span v-else-if="record.deploymentStatus === 'running'">⏳ Running</span>
              <span v-else>{{ record.deploymentStatus }}</span>
            </template>

            <template v-else-if="column.key === 'ansiblePlaybook'">
              <a :href="record[column.key]" target="_blank">
                <i class="fas fa-link"></i>
              </a>
            </template>

            <template v-else>
              <span v-html="highlightText(record[column.key])"></span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
