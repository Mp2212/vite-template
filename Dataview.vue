<template>
  <div>
    <!-- Button to trigger modal -->
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#searchModal">Search</button>

    <!-- Modal -->
    <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="searchModalLabel">Search Deployments</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSearch">
              <div class="mb-3">
                <label for="ait" class="form-label">AIT</label>
                <multiselect
                  v-model="selectedAits"
                  :options="aits"
                  :multiple="true"
                  :close-on-select="false"
                  :hide-selected="true"
                  label="name"
                  track-by="id"
                  placeholder="Select AIT"
                  :custom-label="customLabel"
                >
                  <template #option="{ option }">
                    <div>
                      <input type="checkbox" :value="option.name" v-model="selectedAits" />
                      {{ option.name }}
                    </div>
                  </template>
                </multiselect>
              </div>

              <div class="mb-3">
                <label for="spk" class="form-label">SPK</label>
                <multiselect
                  v-model="selectedSpks"
                  :options="spks"
                  :multiple="true"
                  :close-on-select="false"
                  :hide-selected="true"
                  label="name"
                  track-by="id"
                  placeholder="Select SPK"
                  :custom-label="customLabel"
                >
                  <template #option="{ option }">
                    <div>
                      <input type="checkbox" :value="option.name" v-model="selectedSpks" />
                      {{ option.name }}
                    </div>
                  </template>
                </multiselect>
              </div>

              <div class="mb-3">
                <label for="environment" class="form-label">Environment</label>
                <multiselect
                  v-model="selectedEnvironments"
                  :options="environments"
                  :multiple="true"
                  :close-on-select="false"
                  :hide-selected="true"
                  label="name"
                  track-by="id"
                  placeholder="Select Environment"
                  :custom-label="customLabel"
                >
                  <template #option="{ option }">
                    <div>
                      <input type="checkbox" :value="option.name" v-model="selectedEnvironments" />
                      {{ option.name }}
                    </div>
                  </template>
                </multiselect>
              </div>

              <div class="mb-3">
                <label for="repo" class="form-label">Repo</label>
                <multiselect
                  v-model="selectedRepos"
                  :options="repos"
                  :multiple="true"
                  :close-on-select="false"
                  :hide-selected="true"
                  label="name"
                  track-by="id"
                  placeholder="Select Repo"
                  :custom-label="customLabel"
                >
                  <template #option="{ option }">
                    <div>
                      <input type="checkbox" :value="option.name" v-model="selectedRepos" />
                      {{ option.name }}
                    </div>
                  </template>
                </multiselect>
              </div>

              <button type="submit" class="btn btn-success">Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  setup() {
    const aits = ref([{ id: 1, name: 'AIT1' }, { id: 2, name: 'AIT2' }, { id: 3, name: 'AIT3' }]);
    const spks = ref([{ id: 1, name: 'SPK1' }, { id: 2, name: 'SPK2' }, { id: 3, name: 'SPK3' }]);
    const environments = ref([{ id: 1, name: 'Env1' }, { id: 2, name: 'Env2' }, { id: 3, name: 'Env3' }]);
    const repos = ref([{ id: 1, name: 'Repo1' }, { id: 2, name: 'Repo2' }, { id: 3, name: 'Repo3' }]);

    const selectedAits = ref([]);
    const selectedSpks = ref([]);
    const selectedEnvironments = ref([]);
    const selectedRepos = ref([]);

    const handleSearch = () => {
      const payload = {
        ait: selectedAits.value,
        spk: selectedSpks.value,
        env: selectedEnvironments.value,
        repo: selectedRepos.value,
        page: 0,
        pageSize: 10,
      };

      fetch('url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Handle the API response here
        })
        .catch(error => console.error('Error:', error));
    };

    const customLabel = (option) => {
      return `${option.name}`;
    };

    return {
      aits,
      spks,
      environments,
      repos,
      selectedAits,
      selectedSpks,
      selectedEnvironments,
      selectedRepos,
      handleSearch,
      customLabel,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles you need here */
</style>