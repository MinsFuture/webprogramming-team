import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store";
import axios from "axios";

const app = createApp(App);

// Axios 전역 설정
app.config.globalProperties.$axios = axios;

app.use(store);
app.use(router);

app.mount('#app');
