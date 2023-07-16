import { createStore } from "vuex";

import authModule from "@/store/modules/auth/index.js";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    auth: authModule,
  },
  plugins: [createPersistedState()],
});

export default store;
