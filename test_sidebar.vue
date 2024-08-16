<template>
    <aside class="sidebar">
      <div class="sidebar-start">
        <div class="sidebar-head">
          <a href="/" class="logo-wrapper" title="Home">
            <span class="sr-only">Home</span>
            <span class="icon logo" aria-hidden="true"></span>
            <div class="logo-text">
              <!-- <span class="logo-title">Elegant</span> -->
              <span class="logo-subtitle">Dashboard</span>
            </div>
          </a>
          <button class="sidebar-toggle transparent-btn" title="Menu" type="button">
            <span class="sr-only">Toggle menu</span>
            <span class="icon menu-toggle" aria-hidden="true"></span>
          </button>
        </div>
        <div class="sidebar-body">
          <ul class="sidebar-body-menu">
            <li>
              <a :class="{ active: isActive('/') }" href="/">
                <span class="icon home" aria-hidden="true"></span>Dashboard
              </a>
            </li>
            <li>
              <a :class="{ active: isActive('/Deploymentmetrics') }" href="/Deploymentmetrics">
                <span class="icon document" aria-hidden="true"></span>Deployment Metrics
              </a>
            </li>
            <li>
              <a class="show-cat-btn" href="##">
                <span class="icon document" aria-hidden="true"></span>Olympos
                <span class="category__btn transparent-btn" title="Open list">
                  <span class="sr-only">Open list</span>
                  <span class="icon arrow-down" aria-hidden="true"></span>
                </span>
              </a>
              <ul class="cat-sub-menu">
                <li><a href="#">App Inventory</a></li>
                <li><a href="#">App Status</a></li>
              </ul>
            </li>
            <!-- <li>
              <a class="show-cat-btn" href="##">
                <span class="icon folder" aria-hidden="true"></span>Categories
                <span class="category__btn transparent-btn" title="Open list">
                  <span class="sr-only">Open list</span>
                  <span class="icon arrow-down" aria-hidden="true"></span>
                </span>
              </a>
              <ul class="cat-sub-menu">
                <li><a href="categories.html">All categories</a></li>
              </ul>
            </li> -->
          </ul>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  const isActive = (path) => {
    return route.path === path;
  };
  </script>
  
  <style scoped>
  /* Your existing CSS */
  .sidebar-body-menu a.active {
    /* Styles for active link */
  }
  .sidebar-body-menu li a.active {
    background-color: #4158A6;
    border-left: 0px solid #007bff;
    color: #ffffff;
}
  </style>
