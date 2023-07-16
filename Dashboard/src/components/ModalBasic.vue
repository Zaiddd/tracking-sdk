<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="modalOpen"
      class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
      aria-hidden="true"
    ></div>
  </transition>
  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-in-out duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-show="modalOpen"
      :id="id"
      class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref="modalContent"
        class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full"
      >
        <!-- Modal header -->
        <div class="px-5 py-3 border-b border-slate-200">
          <div class="flex justify-between items-center">
            <div class="font-semibold text-slate-800">{{ title }}</div>
          </div>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "ModalBasic",
  props: ["id", "modalOpen", "title"],
  emits: ["close-modal"],
  setup(props, { emit }) {
    const modalContent = ref(null);

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!props.modalOpen || modalContent.value.contains(target)) return;
      emit("close-modal");
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.modalOpen || keyCode !== 27) return;
      emit("close-modal");
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    return {
      modalContent,
    };
  },
};
</script>
