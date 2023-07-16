import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'


import Tracker from "./tracker/Tracker";

const app = createApp(App);

app.use(Tracker, {
    AppId: "TEST_APP_ID",
});

app.mount("#app");
