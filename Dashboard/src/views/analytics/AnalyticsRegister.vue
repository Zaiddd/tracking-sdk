<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-10 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-5">Create a new Analytics account</h2>
      <div :class="show + ' bg-' + statusClass + '-500'">
        <p class="p-3 mb-3">{{ statusMsg }}</p>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-semibold mb-2">Username</label>
          <input type="text" id="username" v-model="username"
                 class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 required>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" id="email" v-model="email"
                 class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 required>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
          <input type="password" id="password" v-model="password"
                 class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 required>
        </div>
        <div class="flex items-center justify-between">
          <button type="submit"
                  class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Register
          </button>
          <router-link
              to="/analytics/login"
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Sign in
          </router-link>
        </div>
        <hr class="mt-6">
        <div class="mt-4">
          <router-link
              to="/"
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Go to insurance site
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      statusMsg: '',
      statusClass: '',
      show: 'hidden',
    }
  },
  methods: {
    async generateAppId() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let appId = 'APP_';
      for (let i = 0; i < 8; i++) {
        appId += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return appId.toUpperCase();
    },
    async submitForm() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/kpiAuth/register`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({username: this.username, email: this.email, password: this.password}),
        });

        if (res.ok) {
          await fetch(`${import.meta.env.VITE_API_URL}/appid`, {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              app_id: await this.generateAppId(),
              mail: this.email,
            }),
          });

          this.statusMsg = 'Account created successfully! You can now login.';
          this.statusClass = 'emerald';
          this.show = 'block';
          this.username = '';
          this.email = '';
          this.password = '';
        } else {
          this.statusClass = 'red';
          this.show = 'block';
          const zodErr = await res.json();
          if (zodErr.error) {
            this.statusMsg = zodErr.error.issues[0].message;
          } else {
            this.statusMsg = zodErr.message;
          }
          console.log(zodErr.error.issues[0].message)
        }
      } catch (error) {
        this.statusMsg = "There is an error. Please check your information";
      }
    },
  },
  created() {
    if (localStorage.getItem("esgi-ws-token")) {
      localStorage.removeItem("esgi-ws-token");
    }

    if (localStorage.getItem("kpiJwtToken")) {
      this.$router.push('/analytics/dashboard')
    }
  }
}
</script>
