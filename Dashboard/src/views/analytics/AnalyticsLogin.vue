<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-10 rounded-lg shadow-md">
      <form @submit.prevent="login">
        <h1 class="text-2xl mb-4 font-medium">Sign in page</h1>
        <div :class="show + ' bg-' + statusClass + '-500'">
          <p class="p-3 mb-3">{{ statusMsg }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            Email
          </label>
          <input
              v-model="email"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Password
          </label>
          <input
              v-model="password"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mot de passe"
              required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
              class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              type="submit"
          >
            Sign in
          </button>
          <router-link
              to="/analytics/register"
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Register
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
      email: '',
      password: '',
      statusMsg: '',
      statusClass: '',
      show: 'hidden',
    }
  },
  methods: {
    async login() {
      const date = new Date();
      date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
      let expires = "; expires=" + date.toUTCString();

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/kpiAuth/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const res = await response.json();
        if (response.ok) {
          localStorage.setItem("kpiJwtToken", res.access_token);
          document.cookie = "kpiJwtToken=" + res.access_token + expires + "; path=/analytics";
          const appIdRes = await fetch(`${import.meta.env.VITE_API_URL}/appid`, {
            headers: {
              'Content-Type': 'application/json',
              "email": this.email
            },
            method: 'GET',
          });
          const res2 = await appIdRes.json();

          localStorage.setItem("appId", res2[0].app_id);
          document.cookie = "appId=" + res2[0].app_id + expires + "; path=/analytics";

          const actionPayload = {
            email: this.email,
            password: this.password
          };

          await this.$store.dispatch('auth/kpiLogin', actionPayload);
          this.$router.push('/analytics/dashboard')
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
        this.statusClass = "red";
        this.show = 'block';
      }
    }
  },
  created() {
    if (localStorage.getItem("esgi-ws-token")) {
      localStorage.removeItem("esgi-ws-token");
      this.$router.push('/analytics/login')
    }

    if (localStorage.getItem("kpiJwtToken")) {
      this.$router.push('/analytics/dashboard');
    }
  }
}
</script>