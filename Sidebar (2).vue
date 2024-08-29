<template>
  <aside :class="['sidebar', { 'collapsed': isCollapsed }]">
    <div class="sidebar-start">
      <div class="sidebar-head">
        <a href="/" class="logo-wrapper" title="Home">
          <span class="sr-only">Home</span>
          <i class="fas fa-home logo-icon"></i>
          <div class="logo-text" v-if="!isCollapsed">
            <span class="logo-subtitle">Dashboard</span>
          </div>
        </a>
        <button
          class="sidebar-toggle transparent-btn"
          title="Menu"
          type="button"
          @click="toggleSidebar"
        >
          <span class="sr-only">Toggle menu</span>
          <i class="fas fa-bars text-white menu-toggle-icon"></i>
        </button>
      </div>
      <div class="sidebar-body">
        <ul class="sidebar-body-menu">
          <li>
            <a
              :class="{ active: isActive('/body/') }"
              @click="updateHeader('Dashboard', 'fas fa-tachometer-alt', '/body/')"
              href="javascript:void(0)"
            >
              <i class="fas fa-tachometer-alt"></i>
              <span v-if="!isCollapsed">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              :class="{ active: isActive('/body/Deploymentmetrics') }"
              @click="updateHeader('Deployment Metrics', 'fas fa-chart-bar', '/body/Deploymentmetrics')"
              href="javascript:void(0)"
            >
              <i class="fas fa-chart-bar"></i>
              <span v-if="!isCollapsed">Deployment Metrics</span>
            </a>
          </li>
          <li>
            <a class="show-cat-btn" href="##">
              <i class="fas fa-folder"></i>
              <span v-if="!isCollapsed">Olympos</span>
              <span class="category__btn transparent-btn" title="Open list">
                <i class="fas fa-chevron-down"></i>
              </span>
            </a>
            <ul class="cat-sub-menu" v-if="!isCollapsed">
              <li><a href="#">App Inventory</a></li>
              <li><a href="#">App Status</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineEmits } from 'vue';

const route = useRoute();
const router = useRouter();
const emit = defineEmits(['update-caption']);

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const isActive = (path) => {
  return route.path === path;
};

const updateHeader = (caption, iconClass, path) => {
  router.push(path);
  emit('update-caption', { caption, iconClass });
};
</script>

<style scoped>


.sidebar.collapsed {
  width: 80px;
}

.sidebar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo-icon {
  font-size: 24px;
}

.sidebar.collapsed .logo-icon,
.sidebar.collapsed .menu-toggle-icon {
  font-size: 28px;
  display: block;
  width: 100%;
  text-align: center;
}

.logo-text {
  margin-left: 10px;
}

.sidebar-body-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-body-menu a {
  display: flex;
  align-items: center;
  padding: 10px;
  transition: all 0.3s ease;
}

.sidebar-body-menu a i {
  font-size: 18px;
  transition: font-size 0.3s ease;
  margin-right: 10px; /* Added margin between icon and page name */
}

.sidebar.collapsed .sidebar-body-menu a i {
  font-size: 24px;
  width: 100%;
  text-align: center;
  margin-right: 0; /* Remove margin when collapsed */
}

.sidebar-body-menu a.active {
  background-color: #4158A6;
  color: #ffffff;
}

.sidebar.collapsed .sidebar-body-menu a span,
.sidebar.collapsed .logo-text,
.sidebar.collapsed .cat-sub-menu {
  display: none;
}

.sidebar-toggle {
  cursor: pointer;
}

.menu-toggle-icon {
  font-size: 20px;
}

.sidebar.collapsed .menu-toggle-icon {
  font-size: 28px;
}
</style>