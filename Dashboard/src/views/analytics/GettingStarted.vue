<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false"/>

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"/>

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <router-link
              to="/analytics/dashboard"
              class="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800 float-right"
          >
            Go back
          </router-link>
          <h1 class="text-2xl font-bold mb-4">Getting started</h1>

          <h2 class="text-xl font-bold mb-2">Install</h2>
          <ul class="list-disc list-inside mb-4">
            <li>Download the Tracker file <a
                class="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800"
                href="/files/Tracker.js" download>here</a></li>
            <li>
              In your VueJS project, create a directory "plugins/tracker". For example : <br><br>
              <code class="ms-10">
                your_project/src/plugins/tracker/
              </code>
            </li>
            <br>
            <li>Put the Tracker.js file in this directory</li>
          </ul>

          <h2 class="text-xl font-bold mb-2">Configure</h2>
          <ul class="list-disc list-inside mb-4">
            <li>In your main.js file (or index.js), put this code :</li>
          </ul>
          <pre>
                            <code>
    // Path to Tracker.js
    import Tracker from "./tracker/Tracker";

    app.use(Tracker, {
        AppId: "{{ appId }}",
    });
                            </code>
                        </pre>

          <h2 class="text-xl font-bold mb-2">Usage</h2>
          <p class="mb-4">In your Vue components, you can add the directive "v-track" on your elements
            followed by the event you want to detect. Example : </p>
          <pre>
                            <code>
    &lt;img alt="My Image" src="./assets/logo.svg" v-track:click="'YOUR_CLICK_TAG'"/>

    &lt;button v-track:mouseover="'YOUR_MOUSEOVER_TAG'">My Button&lt;button>
                            </code>
                        </pre>

          <ul class="list-disc list-inside mb-4">
            <li>The events ":click" and ":mouseover" must be explicitly written as shown. You can add other
              Javascript events.
            </li>
            <li>The tags "YOUR_CLICK_TAGS" and "YOUR_MOUSEOVER_TAG" are custom tags you can
              <router-link
                  to="/analytics/my-tags"
                  class="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800"
              >
                create here
              </router-link>
              and use them in your project. They will be displayed with the event you
              use in the dashboard so you can organize your analytics.
            </li>
            <li>
              You can use as many tags and events as you want.
            </li>
          </ul>

          <h2 class="text-xl font-bold mb-2">Visualize</h2>
          <p class="mb-4">
            Your data will be displayed on the dashboard in real time.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";

export default {
  components: {
    Sidebar,
    Header,
  },
  methods: {
    getCookie(name) {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    }
  },
  data() {
    return {
      appId: '',
    }
  },
  created() {
    if (!localStorage.getItem("kpiJwtToken")) {
      this.$router.push('/analytics/login');
    }

    this.appId = localStorage.getItem("appId") || this.getCookie("appId");
  }
}
</script>