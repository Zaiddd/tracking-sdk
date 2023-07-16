<template>
  <div
    class="space-y-4 mb-8"
    v-if="token && token == userTokenCheck"
    style="margin-top: 100px"
  >
    <div class="text-center">
      <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
      <h1 class="text-3xl text-slate-800 font-bold mb-8">
        Payment successful !
      </h1>
      <router-link
        class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        style="margin-top: 50px"
        :to="{ name: 'user-contracts' }"
      >
        Go to the Contract list -&gt;
      </router-link>
    </div>
  </div>
  <div v-else>
    <div class="text-center" style="margin-top: 100px">
      <h1 class="text-3xl text-slate-800 font-bold mb-8">You seem lost.. !</h1>
      <router-link
        class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        to="/"
        >Go back to the home page -&gt;
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PaymentSuccess",
  data() {
    return {
      token: null,
      userTokenCheck: null,
      id: null,
      price: null,
    };
  },
  methods: {},
  setup() {
    return {};
  },
  async created() {
    if (!this.$store.getters["auth/isAuthenticated"]) {
      this.$router.push("/");
    }
    let token = document.URL.split("/")[5];
    let userToken = this.$store.getters["auth/token"];

    this.id = document.URL.split("/")[6];
    this.price = document.URL.split("/")[7];

    this.userTokenCheck = userToken;
    this.token = token;
    this.role = this.$store.getters["auth/roles"];
    this.useremail = this.$store.getters["auth/email"];

    const request = await axios.get(
      `${import.meta.env.VITE_API_URL}/payment/${this.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (request.data) {
      this.$router.push({ name: "user-contracts" });
    }

    let formData = {
      quote_id: this.id,
      price: parseInt(this.price),
    };

    if (!request.data) {
      const request2 = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("contract-data");
    }
  },
};
</script>

<style scoped></style>
