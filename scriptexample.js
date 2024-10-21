<script setup>
import { ref, computed } from 'vue';

// Sample table data
const records = ref([
  { ansibleJobId: 1, ansibleJobName: 'Deploy App', createdBy: 'John', ait: 'AIT-1', spk: 'SPK-1', deploymentEnvironment: 'Prod', repository: 'Repo1', scmBranch: 'main', deploymentStatus: 'successful' },
  { ansibleJobId: 2, ansibleJobName: 'Update Server', createdBy: 'Jane', ait: 'AIT-2', spk: 'SPK-2', deploymentEnvironment: 'Dev', repository: 'Repo2', scmBranch: 'dev', deploymentStatus: 'running' },
  { ansibleJobId: 3, ansibleJobName: 'Test Deploy', createdBy: 'Doe', ait: 'AIT-3', spk: 'SPK-3', deploymentEnvironment: 'QA', repository: 'Repo3', scmBranch: 'qa', deploymentStatus: 'failed' }
]);

// Search-related variables
const newSearchTerm = ref(''); // For input field
const searchTags = ref([]);    // Store multiple search tags

// Method to add a search tag when 'Enter' is pressed
const addSearchTag = () => {
  if (newSearchTerm.value.trim() !== '') {
    searchTags.value.push(newSearchTerm.value.trim());
    newSearchTerm.value = ''; // Clear the input field
  }
};

// Method to remove a search tag when 'X' is clicked
const removeSearchTag = (index) => {
  searchTags.value.splice(index, 1);
};

// Computed property to filter records based on search tags
const filteredRecordsComputed = computed(() => {
  if (searchTags.value.length === 0) {
    return records.value; // Return all records if no tags
  }

  // Filter the records if search tags are present
  return records.value.filter(record => 
    searchTags.value.every(tag =>
      // Perform a search on all fields
      Object.values(record).some(value => 
        String(value).toLowerCase().includes(tag.toLowerCase())
      )
    )
  );
});
</script>

<style scoped>
.tags {
  margin: 10px 0;
}
.tag {
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 14px;
}
.tag button {
  background: none;
  border: none;
  margin-left: 5px;
  cursor: pointer;
}
</style>