<template>
  <div class="card custom-dropdown-card card-tab pt-4 pb-0 mb-0">
    <div class="tab-shape-wrapper" v-if="updatedOptions.length">
      <button
        v-for="option in updatedOptions"
        :key="option.value"
        :class="['tab-shaped-btn', selectedButton?.value === option.value ? 'active' : '']"
        @click="handleSelection(option)"
        :disabled="option.disabled"
      >
        <i :class="option.icon" class="me-2"></i>
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['Graph', 'Select Tech Executive'],
      selectedButton: null, // ← initially null
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
      console.log('Selected:', option.value);
    }
  }
};
</script>

<style scoped>
.tab-shape-wrapper {
  display: inline-flex;
  background: linear-gradient(145deg, #e6f1f5, #d0e6ed);
  padding: 10px;
  border-radius: 22px;
  box-shadow: 0 8px 16px rgba(0, 72, 139, 0.08);
}
.tab-shaped-btn {
  all: unset;
  cursor: pointer;
  padding: 12px 26px;
  font-size: 1rem;
  font-weight: 600;
  background-color: transparent;
  color: #004076;
  border-radius: 18px;
  margin: 0 6px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}
.tab-shaped-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}
.tab-shaped-btn.active {
  background-color: #ffffff;
  color: #00335f;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  z-index: 1;
}
.tab-shaped-btn i {
  font-size: 1rem;
}
</style>
