<template>
  <div class="space-y-4 mb-8" style="margin-top: 100px">
    <div class="text-center">
      <div class="checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
      <h1 class="text-3xl text-slate-800 font-bold mb-8">
        An error occurred...
      </h1>
      <router-link
        class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        style="margin-top: 50px"
        to="/"
      >
        Go to the home page -&gt;
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PaymentSuccess",
  setup() {
    return {};
  },
  data() {
    return {
      token: null,
      userTokenCheck: null,
      id: null,
      price: null,
    };
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
      this.$router.push({
        name: "newcontract",
        params: { insurance_id: this.id },
      });
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
    }
  },
  methods: {},
};
</script>

<style scoped></style>
