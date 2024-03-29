<template>
  <div v-if="email" class="relative inline-flex">
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group"
      aria-haspopup="true"
      :aria-expanded="dropdownOpen"
      @click.prevent="dropdownOpen = !dropdownOpen"
    >
      <img
        class="w-8 h-8 rounded-full"
        :src="UserAvatar"
        width="32"
        height="32"
        alt="User"
      />
      <div class="flex items-center truncate">
        <span
          class="truncate ml-2 text-sm font-medium group-hover:text-slate-800"
          >{{ email }}</span
        >
        <svg
          class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
          viewBox="0 0 12 12"
        >
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </div>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
          <div class="font-medium text-slate-800">{{ email }}</div>
          <div class="text-xs text-slate-500 italic">{{ role }}</div>
        </div>
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <li>
            <div role="status">
              <svg
                v-if="loading"
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <div v-else>
                <router-link
                  class="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                  :to="{ name: 'profile' }"
                >
                  <p>My profile</p>
                </router-link>
              </div>
            </div>
          </li>
          <li>
            <button
              class="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
              @click="signout()"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import UserAvatar from "@/images/useravatar.png";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "DropdownProfile",
  props: ["align"],
  data() {
    return {
      isAnalytics: false
    }
  },
  created() {
    this.isAnalytics = !!localStorage.getItem("kpiJwtToken");
  },
  setup() {
    const dropdownOpen = ref(false);
    const trigger = ref(null);
    const dropdown = ref(null);

    const store = useStore();
    const email = ref(null);
    const role = ref(null);
    const token = ref(null);
    const loading = ref(true);

    const router = useRouter();

    const setUserDetails = () => {
      email.value = store.getters["auth/email"];
      role.value = store.getters["auth/roles"];
      token.value = store.getters["auth/token"];
      loading.value = false;
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
      setUserDetails();
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    // close on click outside
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen.value ||
        dropdown.value.contains(target) ||
        trigger.value.contains(target)
      )
        return;
      dropdownOpen.value = false;
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return;
      dropdownOpen.value = false;
    };

    function signout() {
      const authData = localStorage.getItem("vuex");
      const data = JSON.parse(authData);
      if (data) {
        localStorage.clear();
        // router.push({ name: "home" });
        window.location.href = "/";
      }
    }

    return {
      dropdownOpen,
      trigger,
      dropdown,
      UserAvatar,
      email,
      role,
      token,
      loading,
      signout,
    };
  },
};
</script>
