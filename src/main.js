import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/tailwind.css";
import "remixicon/fonts/remixicon.css";
import router from "./router";
import "./assets/@tailwind/typography.css";
import mitt from "mitt";

const emitter = mitt();
const pinia = createPinia(App);

const app = createApp(App);

app.provide("emitter", emitter);
app.use(router).use(pinia).mount("#app");
app.config.unwrapInjectedRef = true;
