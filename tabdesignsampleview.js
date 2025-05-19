<template>
  <div class="card custom-dropdown-card card-tab pt-4 pb-0 mb-0">
    <div class="tab-shape-wrapper">
      <template v-for="(option, index) in updatedOptions" :key="option.value">
        <!-- Button -->
        <button
          :class="['tab-shaped-btn', selectedButton?.value === option.value ? 'active' : '']"
          @click="handleSelection(option)"
          :disabled="option.disabled"
        >
          <i :class="option.icon" class="me-2"></i>
          {{ option.label }}
        </button>

        <!-- Divider shown between buttons only -->
        <div
          v-if="index < updatedOptions.length - 1"
          class="vertical-divider"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['Graph', 'Select Tech Executive'],
      selectedButton: null,
      disabledButtons: [{ value: 'Graph', disabled: false }]
    };
  },
  computed: {
    updatedOptions() {
      return this.options.map(option => {
        const disabledMatch = this.disabledButtons.find(b => b.value === option);
        return {
          label: option,
          value: option,
          icon: option === 'Graph' ? 'fas fa-chart-pie' : 'fas fa-user-tie',
          disabled: disabledMatch?.disabled || false
        };
      });
    }
  },
  mounted() {
    const first = this.updatedOptions.find(opt => !opt.disabled);
    if (first) this.selectedButton = first;
  },
  methods: {
    handleSelection(option) {
      this.selectedButton = option;
    }
  }
};
</script>

<style scoped>
.tab-shape-wrapper {
  display: inline-flex;
  background-color: #012169; /* Dark navy background */
  padding: 10px 12px;
  border-radius: 22px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  align-items: stretch;
}

.tab-shaped-btn {
  all: unset;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  background-color: transparent;
  color: #ffffff; /* White text */
  border-radius: 18px 18px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 3px solid transparent;
  height: 100%;
}

.tab-shaped-btn.active {
  background-color: #ffffff;
  color: #012169; /* Dark text on active tab */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  z-index: 1;
  border-bottom: 3px solid #00aaff; /* Optional highlight */
}

.tab-shaped-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.tab-shaped-btn i {
  font-size: 1rem;
  margin-right: 6px;
}

/* Divider between buttons */
.vertical-divider {
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3); /* Light line for dark bg */
  align-self: stretch;
  margin: 0 12px;
}
</style>
