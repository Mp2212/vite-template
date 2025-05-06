<template>
    <div
      v-if="visible"
      class="column-dropdown"
      :style="{ top: position.top + 'px', left: position.left + 'px', position: 'fixed' }"
      @click.stop
    >
      <label
        v-for="col in columns"
        :key="col.key"
        class="filter-option"
      >
        <input
          type="checkbox"
          :checked="visibleColumns[col.key]"
          @change="$emit('toggle-column', col.key)"
        />
        {{ col.label }}
      </label>
    </div>
  </template>
  
  <script setup>
  defineProps({
    columns: Array,
    visibleColumns: Object,
    position: Object,
    visible: Boolean
  })
  
  defineEmits(['toggle-column'])
  </script>
  
  <style scoped>
  .column-dropdown {
    z-index: 9999;
    background: white;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px 14px;
    min-width: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 14px;
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
    font-weight: 400;
    cursor: pointer;
  }
  
  .filter-option input[type="checkbox"] {
    transform: scale(1.1);
    accent-color: #002855;
  }
  </style>
  