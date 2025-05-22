<template>
  <div class="pt-4 pb-0 mb-0">
    <div class="tab-shape-wrapper">
      <template v-for="(option, index) in updatedOptions" :key="option.value">
        <!-- Button -->
        <button
          :class="['tab-shaped-btn', selectedButton === option.value ? 'active' : '']"
          @click="handleSelection(option)"
          :disabled="option.disabled"
        >
          <i :class="option.icon" class="me-2"></i>
          {{ option.label }}
        </button>

        <!-- Divider -->
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
      const labelMap = {
        'Graph': 'Deployment Metrics',
        'Select Tech Executive': 'Tech Exec View'
      };

      return this.options.map(option => {
        const disabledMatch = this.disabledButtons.find(b => b.value === option);
        return {
          label: labelMap[option] || option,
          value: option,
          icon: option === 'Graph' ? 'fas fa-chart-pie' : 'fas fa-user-tie',
          disabled: disabledMatch?.disabled || false
        };
      });
    }
  },
  mounted() {
    const first = this.updatedOptions.find(opt => !opt.disabled);
    if (first) this.selectedButton = first.value;
  },
  methods: {
    handleSelection(option) {
      this.selectedButton = option.value;
    }
  }
};
</script>

<style scoped>
.tab-shape-wrapper {
  display: inline-flex;
  background-color: #012169;
  padding: 10px 12px;
  border-radius: 22px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  align-items: stretch;
}

/* BUTTON STYLE */
.tab-shaped-btn {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  background-color: #012169;
  color: #ffffff;
  border-radius: 18px 18px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
}

/* UNDERLINE USING ::after */
.tab-shaped-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 60%;
  height: 3px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.tab-shaped-btn.active::after {
  background-color: #00aaff; /* Underline color */
}

/* Hover effect */
.tab-shaped-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.tab-shaped-btn i {
  font-size: 1rem;
  margin-right: 6px;
}

/* Vertical line */
.vertical-divider {
  width: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  align-self: stretch;
  margin: 0 12px;
}
</style>
