import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store";
import axios from "axios";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

// Axios 전역 설정
app.config.globalProperties.$axios = axios;

app.use(store);
app.use(router);
app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
