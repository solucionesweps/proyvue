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

// Configurar axios para que esté disponible globalmente en los componentes
axios.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');

