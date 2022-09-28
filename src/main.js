import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import 'remixicon/fonts/remixicon.css';
import router from './router';
import './assets/@tailwind/typography.css';

createApp(App).use(router).mount('#app');
