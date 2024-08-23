<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Sidebar for selecting tabs -->
      <div class="col-md-3">
        <ul class="nav nav-tabs flex-column">
          <li class="nav-item">
            <label class="nav-link">
              <input type="checkbox" class="form-check-input" v-model="showKeyContent"> Key Release Pipeline
            </label>
          </li>
          <li class="nav-item">
            <label class="nav-link">
              <input type="checkbox" class="form-check-input" v-model="showDevContent"> Dev Release Pipeline
            </label>
          </li>
        </ul>
        <div class="month-list-container mt-3" style="max-height: 350px; overflow-y: auto;">
          <ul class="nav nav-tabs flex-column">
            <li class="nav-item" v-for="(month, index) in months" :key="index">
              <a 
                class="nav-link" 
                :class="{ active: selectedMonth === month.id }" 
                @click="selectMonth(month.id)" 
                href="javascript:void(0)"
              >
                <i :class="month.icon"></i> {{ month.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Main content area -->
      <div class="col-md-9">
        <div class="row">
          <!-- Key Release Pipeline Card -->
          <div v-if="showKeyContent" class="col-md-6 mb-4">
            <div class="card">
              <div class="card-body key">
                <h5 class="card-title text-center">Key Release Pipeline</h5>
                <hr>
                <div v-if="keyReleaseData">
                  <div v-for="item in keyReleaseData" :key="item.id" class="row mb-3">
                    <div class="col-md-6">
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-check"></i>
                        <h6 class="card-subtitle mb-2">Code Freeze</h6>
                        <p class="card-text">{{ item.code_freeze }}</p>
                      </div>
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-day"></i>
                        <h6 class="card-subtitle mb-2">Consumer Release</h6>
                        <p class="card-text">{{ item.consumer_release }}</p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-times"></i>
                        <h6 class="card-subtitle mb-2">Code Lock</h6>
                        <p class="card-text">{{ item.code_lock }}</p>
                      </div>
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-week"></i>
                        <h6 class="card-subtitle mb-2">Consumer Swing</h6>
                        <p class="card-text">{{ item.consumer_swing }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dev Release Pipeline Card -->
          <div v-if="showDevContent" class="col-md-6 mb-4">
            <div class="card">
              <div class="card-body dev">
                <h5 class="card-title text-center">Dev Release Pipeline</h5>
                <hr>
                <div v-if="devReleaseData">
                  <div v-for="item in devReleaseData" :key="item.id" class="row mb-3">
                    <div class="col-md-6">
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-alt"></i>
                        <h6 class="card-subtitle mb-2">Release Pipeline</h6>
                        <p class="card-text">{{ item.releasePipeline }}</p>
                      </div>
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-day"></i>
                        <h6 class="card-subtitle mb-2">Consumer Release Start Date</h6>
                        <p class="card-text">{{ item.consumerReleaseStartDate }}</p>
                      </div>
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-week"></i>
                        <h6 class="card-subtitle mb-2">Dev Shakeout Start Date</h6>
                        <p class="card-text">{{ item.devShakeoutStartDate }}</p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-alt"></i>
                        <h6 class="card-subtitle mb-2">Sit Shakeout Start Date</h6>
                        <p class="card-text">{{ item.sitShakeoutStartDate }}</p>
                      </div>
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-day"></i>
                        <h6 class="card-subtitle mb-2">Sit Available Testing Date</h6>
                        <p class="card-text">{{ item.sitAvailableTestingDate }}</p>
                      </div>
                      <div class="internal-card mb-3 bg-light p-3 rounded">
                        <i class="fas fa-calendar-check"></i>
                        <h6 class="card-subtitle mb-2">Sit1 Cyclee</h6>
                        <p class="card-text">{{ item.sit1Cyclee }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Popover } from 'bootstrap';

export default {
  data() {
    return {
      showKeyContent: true,
      showDevContent: true,
      selectedMonth: 'jan',
      months: [
        { id: 'jan', name: 'January', icon: 'far fa-calendar-check' },
        { id: 'feb', name: 'February', icon: 'far fa-calendar-alt' },
        // Add more months as needed
      ],
      keyReleaseData: null,
      devReleaseData: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        // Fetch Key Release data
        const keyResponse = await fetch('YOUR_API_ENDPOINT_FOR_KEY_RELEASE');
        const keyData = await keyResponse.json();
        this.keyReleaseData = keyData.filter(item => item.month_release.toLowerCase() === this.selectedMonth);

        // Fetch Dev Release data
        const devResponse = await fetch('YOUR_API_ENDPOINT_FOR_DEV_RELEASE');
        const devData = await devResponse.json();
        this.devReleaseData = devData.filter(item => item.month.toLowerCase() === this.selectedMonth);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    selectMonth(monthId) {
      this.selectedMonth = monthId;
      this.fetchData(); // Fetch data based on selected month
    }
  },
  mounted() {
    this.fetchData(); // Fetch data initially
    this.$nextTick(() => {
      // Initialize Bootstrap Popovers
      const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      popoverTriggerList.map((popoverTriggerEl) => {
        return new Popover(popoverTriggerEl); // Initialize the Popover
      });
    });
  },
};
</script>

<style scoped>
.key .card-body {
  background-color: #e9f5ff;
}
.dev .card-body {
  background-color: #f5e9ff;
}
.internal-card {
  border-radius: 0.375rem; /* .rounded class */
}
</style>