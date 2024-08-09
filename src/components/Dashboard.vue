<script setup>
import { ref } from 'vue'
import '@/assets/css/style.min.css';



</script>

<template>
 <div class="layer"></div>
<!-- ! Body -->
<a class="skip-link sr-only" href="#skip-target">Skip to content</a>
<div class="page-flex">
  <!-- ! Sidebar -->
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
                    <a class="active" href="/"><span class="icon home" aria-hidden="true"></span>Dashboard</a>
                </li>
                <li>
                    <a class="show-cat-btn" href="##">
                        <span class="icon document" aria-hidden="true"></span>Posts
                        <span class="category__btn transparent-btn" title="Open list">
                            <span class="sr-only">Open list</span>
                            <span class="icon arrow-down" aria-hidden="true"></span>
                        </span>
                    </a>
                    <ul class="cat-sub-menu">
                        <li>
                            <a href="posts.html">All Posts</a>
                        </li>
                        <li>
                            <a href="new-post.html">Add new post</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="show-cat-btn" href="##">
                        <span class="icon folder" aria-hidden="true"></span>Categories
                        <span class="category__btn transparent-btn" title="Open list">
                            <span class="sr-only">Open list</span>
                            <span class="icon arrow-down" aria-hidden="true"></span>
                        </span>
                    </a>
                    <ul class="cat-sub-menu">
                        <li>
                            <a href="categories.html">All categories</a>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </div>
    </div>
  
</aside>
  <div class="main-wrapper">
    <!-- ! Main nav -->
    <nav class="main-nav--bg">
  <div class="container main-nav">
    <div class="main-nav-start">
      <!-- <div class="search-wrapper">
        <i data-feather="search" aria-hidden="true"></i>
        <input type="text" placeholder="Enter keywords ..." required>
      </div> -->
    </div>
    <div class="main-nav-end">
      <!-- <button class="sidebar-toggle transparent-btn" title="Menu" type="button">
        <span class="sr-only">Toggle menu</span>
        <span class="icon menu-toggle--gray" aria-hidden="true"></span>
      </button> -->
     
      <!-- <button class="theme-switcher gray-circle-btn" type="button" title="Switch theme">
        <span class="sr-only">Switch theme</span>
        <i class="sun-icon" data-feather="sun" aria-hidden="true"></i>
        <i class="moon-icon" data-feather="moon" aria-hidden="true"></i>
      </button> -->
      <div class="notification-wrapper">
        <button class="gray-circle-btn dropdown-btn" title="To messages" type="button">
          <span class="sr-only">To messages</span>
          <span class="icon notification active" aria-hidden="true"></span>
        </button>
        <ul class="users-item-dropdown notification-dropdown dropdown">
          <li>
            <a href="##">
              <div class="notification-dropdown-icon info">
                <i data-feather="check"></i>
              </div>
              <div class="notification-dropdown-text">
                <span class="notification-dropdown__title">System just updated</span>
                <span class="notification-dropdown__subtitle">The system has been successfully upgraded. Read more
                  here.</span>
              </div>
            </a>
          </li>
          <li>
            <a href="##">
              <div class="notification-dropdown-icon danger">
                <i data-feather="info" aria-hidden="true"></i>
              </div>
              <div class="notification-dropdown-text">
                <span class="notification-dropdown__title">The cache is full!</span>
                <span class="notification-dropdown__subtitle">Unnecessary caches take up a lot of memory space and
                  interfere ...</span>
              </div>
            </a>
          </li>
          <li>
            <a href="##">
              <div class="notification-dropdown-icon info">
                <i data-feather="check" aria-hidden="true"></i>
              </div>
              <div class="notification-dropdown-text">
                <span class="notification-dropdown__title">New Subscriber here!</span>
                <span class="notification-dropdown__subtitle">A new subscriber has subscribed.</span>
              </div>
            </a>
          </li>
          <li>
            <a class="link-to-page" href="##">Go to Notifications page</a>
          </li>
        </ul>
      </div>
      <div class="nav-user-wrapper">
        <button href="##" class="nav-user-btn dropdown-btn" title="My profile" type="button">
          <span class="sr-only">My profile</span>
          <span class="nav-user-img">
            <!-- <picture><source srcset="./img/avatar/avatar-illustrated-02.webp" type="image/webp"><img src="./img/avatar/avatar-illustrated-02.png" alt="User name"></picture> -->
          </span>
        </button>
        <ul class="users-item-dropdown nav-user-dropdown dropdown">
          <!-- <li><a href="##">
              <i data-feather="user" aria-hidden="true"></i>
              <span>Profile</span>
            </a></li>
          <li><a href="##">
              <i data-feather="settings" aria-hidden="true"></i>
              <span>Account settings</span>
            </a></li> -->
          <li><a class="danger" href="##">
              <i data-feather="log-out" aria-hidden="true"></i>
              <span>Log out</span>
            </a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
    <!-- ! Main -->
    <main class="main users chart-page" id="skip-target">

      <div class="container">
        <!-- <h2 class="main-title">Home</h2> -->

        
        <div class="container my-4">
    <div class="row g-3">
      <!-- Build Metrics Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos build-metrics card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-tools"></i>
            </div>
            <div>
              <h6>Build Metrics</h6>
              <p>235 Builds</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 220</span>
            </div>
          </div>
        </a>
      </div>

      <!-- Deploy Metrics Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos deploy-metrics card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-rocket"></i>
            </div>
            <div>
              <h6>Deploy Metrics</h6>
              <p>120 Deployments</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 115</span>
            </div>
          </div>
        </a>
      </div>

      <!-- App Inventory Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos app-inventory card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-box"></i>
            </div>
            <div>
              <h6>App Inventory</h6>
              <p>150 Apps</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 145</span>
            </div>
          </div>
        </a>
      </div>

      <!-- App Health Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos app-health card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-heartbeat"></i>
            </div>
            <div>
              <h6>App Health</h6>
              <p>98% Healthy</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 95%</span>
            </div>
          </div>
        </a>
      </div>

      <!-- Release Info Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos release-info card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div>
              <h6>Release Info</h6>
              <p>5 Releases</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 4</span>
            </div>
          </div>
        </a>
      </div>

      <!-- Vulnerability Dashboard Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos vulnerability-dashboard card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-shield-alt"></i>
            </div>
            <div>
              <h6>Vulnerability Dashboard</h6>
              <p>8 Vulnerabilities</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 10</span>
            </div>
          </div>
        </a>
      </div>

      <!-- Horizon Outages Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos horizon-outages card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <h6>Horizon Outages</h6>
              <p>3 Outages</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 2</span>
            </div>
          </div>
        </a>
      </div>

      <!-- Patching Schedule Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos patching-schedule card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-calendar-day"></i>
            </div>
            <div>
              <h6>Patching Schedule</h6>
              <p>12 Patches</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 10</span>
            </div>
          </div>
        </a>
      </div>

      <!-- Maya Card -->
      <div class="col-md-4">
        <a href="#" class="card-olympos maya card-shadow">
          <div class="d-flex align-items-center">
            <div class="icon-wrapper">
              <i class="fas fa-robot"></i>
            </div>
            <div>
              <h6>Maya</h6>
              <p>20 Tasks</p>
              <div class="divider"></div>
              <span class="text-muted">Last month: 18</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>


        
        <div class="row">
          <div class="col-lg-12">
    <!-- Card with Chart -->
    <div class="stat-cards-item">
        <div class="chart">
            <canvas id="myChart" aria-label="Card Chart" role="img"></canvas>
        </div>
    </div>
    
    <div class="users-table table-wrapper">
    </div>
</div>
         
        </div>
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
