import { createApp } from 'vue'
import App from './App.vue'

import router from './router'; // Import the router





// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'


import './assets/css/style.css';
// Import Bootstrap JS (optional, if you need Bootstrap's JavaScript components)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import '@fortawesome/fontawesome-free/css/all.min.css'



const app = createApp(App);

app.use(router); // Use the router

app.mount('#app');
