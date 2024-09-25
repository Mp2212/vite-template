<template>
    <div class="icon-container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
      <i class="fas fa-info-circle icon-style"></i>
      <div v-if="isTooltipVisible" class="tooltip-box animate-tooltip">
        <div class="tooltip-arrow"></div>
        <h5 class="tooltip-title">Enhanced Tooltip Title</h5>
        <p class="tooltip-content">
          This is an enhanced tooltip with more detail. The arrow points to the icon, indicating that this tooltip is related to it.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isTooltipVisible = ref(false);
  
  function showTooltip() {
    isTooltipVisible.value = true;
  }
  
  function hideTooltip() {
    isTooltipVisible.value = false;
  }
  </script>
  
  <style scoped>
  .icon-container {
    position: relative;
    display: inline-block;
    margin-left: 200px;
  }
  
  .icon-style {
    font-size: 30px; /* Slightly larger icon */
    color: #007bff;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .icon-style:hover {
    color: #0056b3;
  }
  
  .tooltip-box {
    position: absolute;
    top: 60px; /* Adjust this value to position the tooltip */
    left: 50%;
    transform: translateX(-50%);
    padding: 15px;
    background-color: #f9f9f9; /* Light background color */
    color: #333; /* Darker text color for readability */
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    font-size: 0.95rem;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    width: 280px; /* Increased width for more content */
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    pointer-events: none; /* Prevent tooltip from blocking pointer events */
  }
  
  .tooltip-arrow {
    position: absolute;
    bottom: 100%; /* Position arrow above the tooltip */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #f9f9f9; /* Same color as tooltip background */
    filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.2)); /* Adding a subtle shadow */
  }
  
  .animate-tooltip {
    opacity: 1 !important;
    visibility: visible !important;
    animation: growTooltip 0.3s ease forwards;
  }
  
  .tooltip-title {
    margin: 0;
    padding-bottom: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #007bff; /* Title color matching icon */
    border-bottom: 1px solid #ddd;
    width: 100%;
  }
  
  .tooltip-content {
    margin: 10px 0 0;
    line-height: 1.4; /* Better line spacing */
  }
  
  @keyframes growTooltip {
    0% {
      transform: translateX(-50%) scale(0.8); /* Start with smaller size */
    }
    100% {
      transform: translateX(-50%) scale(1); /* End with normal size */
    }
  }
  </style>