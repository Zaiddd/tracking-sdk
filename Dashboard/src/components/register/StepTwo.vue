<template>
  <div class="space-y-4 mb-8">
    <!-- Nom de l'association Code -->
    <div v-if="state == 'association'">
      <label class="block text-sm font-medium mb-1" for="associationName"
        >Association name: <span class="text-rose-500">*</span></label
      >
      <input
        id="associationName"
        v-model.trim="associationName"
        class="form-input w-full"
        type="text"
        required
      />
    </div>
    <div v-if="errors.associationName" class="text-xs mt-1 text-rose-500">
      {{ errors.associationName }}
    </div>

    <!-- Profession Comercial Name Code -->
    <div
      v-if="state == 'company' || state == 'self-employed/independent'"
      class="flex space-x-4"
    >
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1" for="profession"
          >Profession: <span class="text-rose-500">*</span></label
        >
        <input
          id="profession"
          v-model.trim="profession"
          class="form-input w-full"
          type="text"
          required
        />
        <div v-if="errors.profession" class="text-xs mt-1 text-rose-500">
          {{ errors.profession }}
        </div>
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1" for="comercialName"
          >Commercial name: <span class="text-rose-500">*</span></label
        >
        <input
          id="comercialName"
          v-model.trim="comercialName"
          class="form-input w-full"
          type="text"
          required
        />
        <div v-if="errors.comercialName" class="text-xs mt-1 text-rose-500">
          {{ errors.comercialName }}
        </div>
      </div>
    </div>

    <!-- Name and Familyname Code -->
    <div v-if="state == 'individual'" class="flex space-x-4">
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1" for="firstname"
          >Name: <span class="text-rose-500">*</span></label
        >
        <input
          id="firstname"
          v-model.trim="firstname"
          class="form-input w-full"
          type="text"
          required
        />
        <div v-if="errors.firstname" class="text-xs mt-1 text-rose-500">
          {{ errors.firstname }}
        </div>
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1" for="lastname"
          >Family Name: <span class="text-rose-500">*</span></label
        >
        <input
          id="lastname"
          v-model.trim="lastname"
          class="form-input w-full"
          type="text"
          required
        />
        <div v-if="errors.lastname" class="text-xs mt-1 text-rose-500">
          {{ errors.lastname }}
        </div>
      </div>
    </div>

    <!-- Street Address -->
    <div>
      <label class="block text-sm font-medium mb-1" for="street"
        >Street Address: <span class="text-rose-500">*</span></label
      >
      <input
        id="street"
        v-model.trim="street"
        autoComplete="none"
        class="form-input w-full"
        type="text"
        @input="searchStreet($event)"
      />
      <div v-if="isAddressLoading" class="">
        <svg
          class="animate-spin w-4 h-4 fill-current shrink-0"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
          />
        </svg>
      </div>
      <div
        v-for="searchedAddress in searchedAddresses"
        v-else-if="searchedAddresses"
        :key="searchedAddress.properties.id"
      >
        <div
          class="text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <button
            type="button"
            class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            @click="setAddress(searchedAddress)"
          >
            {{ searchedAddress.properties.label }}
          </button>
        </div>
      </div>

      <div v-if="errors.street" class="text-xs mt-1 text-rose-500">
        {{ errors.street }}
      </div>
    </div>

    <!-- City and Postal Code -->

    <div class="flex space-x-4">
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1" for="city"
          >City: <span class="text-rose-500">*</span></label
        >
        <input
          id="disabled"
          class="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
          type="text"
          :value="city"
          disabled
        />
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1" for="postalCode"
          >Postal Code: <span class="text-rose-500">*</span></label
        >
        <input
          id="disabled"
          class="form-input w-full disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
          type="text"
          :value="postalCode"
          disabled
        />
        <div v-if="errors.postalCode" class="text-xs mt-1 text-rose-500">
          {{ errors.postalCode }}
        </div>
      </div>
    </div>

    <!-- Phone number Code -->
    <div>
      <label class="block text-sm font-medium mb-1" for="phoneNumber"
        >Phone number: <span class="text-rose-500">*</span></label
      >
      <input
        id="phoneNumber"
        v-model.trim="phoneNumber"
        class="form-input w-full"
        type="tel"
        required
      />
      <div v-if="errors.phoneNumber" class="text-xs mt-1 text-rose-500">
        {{ errors.phoneNumber }}
      </div>
    </div>

    <!-- Email Code -->
    <div>
      <label class="block text-sm font-medium mb-1" for="email"
        >E-mail: <span class="text-rose-500">*</span></label
      >
      <input
        id="email"
        v-model.trim="email"
        class="form-input w-full"
        type="text"
        required
      />
      <div v-if="errors.email" class="text-xs mt-1 text-rose-500">
        {{ errors.email }}
      </div>
    </div>

    <!-- Password Code -->
    <div>
      <label class="block text-sm font-medium mb-1" for="password"
        >Password: <span class="text-rose-500">*</span></label
      >
      <input
        id="password"
        v-model.trim="password"
        class="form-input w-full"
        type="password"
        required
      />
    </div>

    <div v-if="!hideImageField" class="flex items-center justify-center w-full">
      <label for="dropzone-file" class="form-input w-full">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            class="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG or JPEG
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">REQUIRED</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          required
          @change="handleFile"
        />
      </label>
    </div>
    <div v-if="hideImageField" class="flex items-center justify-center w-full">
      <img id="previewImg" :src="previewSrc" alt="Preview image" />
    </div>

    <div v-if="errors.password" class="text-xs mt-1 text-rose-500">
      {{ errors.password }}
    </div>
    <p v-if="error">{{ error }}</p>
    <div class="flex items-center justify-between">
      <a class="text-sm underline hover:no-underline" @click="back()"
        >&lt;- Back</a
      >
      <button
        v-if="isLoading"
        class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
        disabled
      >
        <svg
          class="animate-spin w-4 h-4 fill-current shrink-0"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
          />
        </svg>
        <span class="ml-2">Loading</span>
      </button>
      <button
        v-else
        class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto"
        @click="submitRegister"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script>
import {
  phoneValidation,
  passwordValidation,
  emailValidation,
} from "@/utils/utils-common-function";
import Banner from "@/components/Banner.vue";

export default {
  components: {
    Banner,
  },
  components: {
    Banner,
  },
  data() {
    return {
      isAddressLoading: false,
      searchedAddresses: [],
      associationName: "",
      profession: "",
      comercialName: "",
      firstname: "",
      lastname: "",
      street: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
      email: "",
      password: "",
      formValid: true,
      isLoading: false,
      error: null,
      errors: {
        associationName: "",
        profession: "",
        comercialName: "",
        firstname: "",
        lastname: "",
        street: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    back() {
      this.$emit("back", {
        id: 1,
        label: "Tell us what’s your situation ✨",
        selectedTab: "StepOne",
      });
    },
    setAddress(address) {
      this.city = address.properties.city;
      this.postalCode = address.properties.postcode;
      this.street = address.properties.name;
      this.searchedAddresses = [];
    },
    async searchStreet(event) {
      this.isAddressLoading = true;
      try {
        const street = event.target.value;
        if (street.length <= 3) {
          return;
        }
        const response = await fetch(
          `https://api.zaidalaahazim.fr/address/` + new URLSearchParams(street)
        );

        if (response.ok) {
          const data = await response.json();
          const parsedData = await JSON.parse(data);
          this.searchedAddresses = parsedData.features;
        }
      } catch (error) {
        this.error = error.message || "Failed to search for the given street";
      }
      this.isAddressLoading = false;
    },
    async submitRegister() {
      this.formValid = true;
      Object.keys(this.errors).forEach((key) => (this.errors[key] = ""));

      if (this.state == "individual") {
        if (this.firstname.length < 2) {
          this.formValid = false;
          this.errors.firstname = "Please check your name";
          return;
        }
        if (this.lastname.length < 2) {
          this.formValid = false;
          this.errors.lastname = "Please check your last name";
          return;
        }
      }

      if (this.state == "self-employed/independent") {
        if (this.profession.length < 2) {
          this.formValid = false;
          this.errors.profession = "Please check the profession name";
          return;
        }
      }

      if (this.state == "company") {
        if (this.comercialName.length < 2) {
          this.formValid = false;
          this.errors.comercialName = "Please check the company name";
          return;
        }
      }

      if (this.state == "association") {
        if (this.associationName.length < 2) {
          this.formValid = false;
          this.errors.associationName =
            "Please check the name of the association";
          return;
        }
      }

      if (this.city.length < 2) {
        this.formValid = false;
        this.errors.city = "Please check the city name";
        return;
      }

      if (this.street.length < 2) {
        this.formValid = false;
        this.errors.street = "Please verify your address";
        return;
      }

      if (this.postalCode.length < 5) {
        this.formValid = false;
        this.errors.postalCode = "Please check your postal code";
        return;
      }

      if (!passwordValidation(this.password)) {
        this.formValid = false;
        this.errors.password = "Please check the password if it is valid";
        return;
      }

      if (!emailValidation(this.email)) {
        this.formValid = false;
        this.errors.email = "Please check your email if it is valid";
        return;
      }

      if (!phoneValidation(this.phoneNumber)) {
        this.formValid = false;
        this.errors.phoneNumber =
          "Please check your phone number if it is valid";
        return;
      }

      this.dataPayload = {
        role: this.$store.state.register.situation.toLowerCase(),
        associationName: this.associationName,
        profession: this.profession,
        comercialName: this.comercialName,
        firstname: this.firstname,
        lastname: this.lastname,
        street: this.street,
        city: this.city,
        postalCode: this.postalCode,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password,
      };
      this.isLoading = true;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.dataPayload),
        });

        if (response.ok) {
          this.$emit("nextStep", {
            id: 3,
            label: "",
            selectedTab: "StepThreeSuccess",
          });
        } else {
          this.error = "You already have an account on our platform";
          this.$emit("nextStep", {
            id: 3,
            label: this.error,
            selectedTab: "StepThreeError",
          });
        }
      } catch (error) {
        this.error = "Failed to register try again later.";
        this.$emit("nextStep", {
          id: 3,
          label: "Error",
          selectedTab: "StepThreeError",
        });
      }

      this.isLoading = false;
    },
  },
};
</script>
