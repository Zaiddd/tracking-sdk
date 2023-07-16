<template>
  <div class="flex h-screen overflow-hidden">

    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false"/>
    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"/>
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full">

          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">My tags ✨</h1>
            </div>
            <div>
              <router-link to="/analytics/create-tag">
                <button class="btn bg-indigo-500 text-white" style="margin-top: 30px">Create a new tag</button>
              </router-link>
            </div>

          </div>
          <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
            <!-- Page content -->
            <!-- Content -->
            <div>
              <div class="overflow-x-auto">
                <table class="table-auto w-full text-center">
                  <thead
                      class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                  <tr>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">label
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">Created At
                    </th>
                  </tr>
                  </thead>
                  <tbody v-if="tags" class="text-sm divide-y divide-slate-200">
                  <tr v-for="(tag, index) in tags" v-bind:key="index">
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                      {{ tag.label }}
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                      {{ formatDate(tag.createdAt) }}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <router-link to="/analytics/dashboard">
              <button class="btn bg-indigo-500 text-white" style="margin-top: 30px">Go back to dashboard</button>
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/partials/Header.vue'
import Sidebar from '@/partials/Sidebar.vue'
import ModalBasic from '@/components/Modal.vue'

// let id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
const appId = localStorage.getItem("appId") || getCookie("appId");

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export default {
  name: 'TagsList',
  components: {
    Header,
    ModalBasic,
    Sidebar
  },
  data() {
    if (!localStorage.getItem("kpiJwtToken") && !getCookie("kpiJwtToken")) {
      this.$router.push("/analytics/login");
    }

    return {
      tags: null,
      appId: appId,
      sidebarOpen: false,
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
    }
  },
  setup() {
    return {}
  },
  async created() {
    if (localStorage.getItem("esgi-ws-token")) {
      localStorage.removeItem("esgi-ws-token");
      this.$router.push('/analytics/login')
    }

    if (!localStorage.getItem("kpiJwtToken")) {
      this.$router.push('/analytics/login');
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/tag`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "App-Id": appId,
      },
    });

    let res = await response.json();
    this.tags = res;
  }
}
</script>