import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router.js";
//import user from './stores/user'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount("#app");
