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

          <!-- Page header -->
          <div class="mb-8">
            <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Create a new tag ✨</h1>
          </div>

          <div class="border-t border-slate-200">
            <div :class="show + ' bg-' + statusClass + '-500'">
              <p class="p-3 mb-3">{{ statusMsg }}</p>
            </div>
            <div>
              <div class="md:grid md:grid-cols-4 md:gap-3 md:mt-10">
                <div class="md:col-span-1">
                  <div class="px-4 sm:px-0">
                    <br>
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Tag information</h3>
                    <p class="mt-1 text-sm text-gray-600">Note : You will be able to use the created
                      tags for your KPIs.</p>
                  </div>
                </div>


                <div class="mt-5 md:col-span-2 md:mt-0">
                  <form @submit.prevent="handleSubmit" method="post">
                    <div class="overflow-hidden shadow sm:rounded-md">
                      <div class="bg-white px-4 py-5 sm:p-6">
                        <div>
                          <label class="block text-sm font-medium mb-1" for="mandatory">Tag
                            label
                            <span class="text-rose-500">*</span></label>
                          <input id="mandatory" class="form-input w-full" type="text"
                                 v-model.trim="label" required/>
                          <small>The tag must contains at minimum 3 characters</small>
                        </div>


                      </div>
                      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button type="submit" v-if="label && label.length > 2"
                                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

                          Submit
                        </button>
                        <button type="submit" disabled v-if="!label || label.length < 3"
                                class="px-3 py-2 text-white bg-gray-300 rounded focus:outline-none">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                  <router-link to="/analytics/dashboard">
                    <button class="btn bg-indigo-500 text-white" style="margin-top: 30px">Go back
                    </button>
                  </router-link>
                </div>
              </div>
            </div>

          </div>

        </div>


      </main>

    </div>

  </div>
</template>

<script>
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import axios from "axios";

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
  components: {Header, Sidebar},
  created() {
    if (localStorage.getItem("esgi-ws-token")) {
      localStorage.removeItem("esgi-ws-token");
      this.$router.push('/analytics/login')
    }

    if (!localStorage.getItem("kpiJwtToken")) {
      this.$router.push('/analytics/login');
    }

    this.appId = localStorage.getItem("appId") || getCookie("appId");
    this.API_URL = import.meta.env.VITE_API_URL;
  },
  data() {
    if (!localStorage.getItem("kpiJwtToken") && !getCookie("kpiJwtToken")) {
      this.$router.push("/analytics/login");
    }

    return {
      label: '',
      appId: '',
      API_URL: '',
      statusMsg: '',
      statusClass: '',
      show: 'hidden',
      sidebarOpen: false,
    }
  },
  methods: {
    async handleSubmit() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          app_id: this.appId,
          label: this.label.toUpperCase(),
        }),
      });

      if (response.ok) {
        this.statusMsg = 'The tag "' + this.label + '" has been created successfully !';
        this.statusClass = 'emerald';
        this.show = 'block';
        this.label = "";
      } else {
        this.statusClass = 'red';
        this.show = 'block';
        const zodErr = await response.json();
        if (zodErr.error) {
          this.statusMsg = zodErr.error.issues[0].message;
        } else {
          this.statusMsg = zodErr.message;
        }
      }
    },
  },
};
</script>
