import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router.js";
//import user from './stores/user'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(vuetify).mount("#app");
