import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.min.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import M from 'materialize-css';
import '@/assets/css/style.scss'

axios.interceptors.request.use(
    (config) => {
      // const token = localStorage.getItem('token');
      const token = store.state.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
