<script setup>
import Dashboard from './components/Dashboard.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { ref } from 'vue'
import '@/assets/css/style.min.css';
</script>


<template>
 <div class="layer"></div>
<!-- ! Body -->
<a class="skip-link sr-only" href="#skip-target">Skip to content</a>

<div class="page-flex">
  <!-- ! Sidebar -->
  <Sidebar/>
  <div class="main-wrapper">
    <!-- ! Main nav -->
    <Header/>
    <!-- ! Main -->
    <main class="main users chart-page" id="skip-target">

      <div class="container">
        <!-- <h2 class="main-title">Home</h2> -->
        <router-view /> <!-- This is where routed components will be displayed -->
   
        
       
      </div>
    </main>
    <!-- ! Footer -->
    <footer class="footer">
  <div class="container footer--flex">
    <div class="footer-start">
      <!-- <p>2021 © Elegant Dashboard - <a href="elegant-dashboard.com" target="_blank"
          rel="noopener noreferrer">elegant-dashboard.com</a></p> -->
    </div>
    <!-- <ul class="footer-end">
      <li><a href="##">About</a></li>
      <li><a href="##">Support</a></li>
      <li><a href="##">Puchase</a></li>
    </ul> -->
  </div>
</footer>
  </div>
  </div>
 
</template>

<script>
import '@/assets/plugins/chart.min.js'
import '@/assets/plugins/feather.min.js'
import '@/assets/js/script.js'
</script>






