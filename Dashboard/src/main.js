import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/router";
import store from "@/store/index.js";
import Tracker from "../public/files/Tracker.js";

import "./css/style.css";

const app = createApp(App);


router.beforeEach((to, from) => {

  if (to.fullPath == "/" ) router.push('/analytics/getting-started')

});


app.use(router);

app.use(store);

app.mount("#app");

app.use(Tracker, {
  AppId: "APP_QBQXUNRW",
});
