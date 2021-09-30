<template>
  <teleport to="#modals">
    <TransitionRoot
      :show="isOpen"
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      class="modal-base"
      as="div"
      @click="onExit"
    >
      <div class="w-4/5 p-6 my-8 align-middle transform bg-main rounded-2xl">
        <h1 class="text-2xl text-header">Set Timer</h1>
        <hr class="hr-base" />
        <scroll-picker
          class="text-header h-25 bg-main"
          :options="options"
          v-model="selections"
        >
          <template v-slot:top-overlay> <div class="bg-main"></div></template>
          <template v-slot:bottom-overlay>
            <div class="bg-main"></div>
          </template>
        </scroll-picker>
        <hr class="hr-base" />

        <button
          class="bg-primary rounded-md p-2 w-full text-header"
          @click="onConfirmed"
        >
          Confirm
        </button>
      </div>
    </TransitionRoot>
  </teleport>
</template>

<script>
import ScrollPicker from "vue3-scroll-picker";
import { TransitionRoot } from "@headlessui/vue";

export default {
  computed: {
    options() {
      const opts = [[], []];
      for (var i = 0; i < 24; i++) {
        opts[0].push({ label: `${i} hrs`, value: i });
      }

      for (i = 0; i < 60; i++) {
        opts[1].push({ label: `${i} mins`, value: i });
      }

      return opts;
    },
  },
  methods: {
    onExit(e) {
      if (e.target === e.currentTarget) {
        this.$emit("close");
      }
    },
    onConfirmed() {
      this.$emit(
        "confirm",
        this.selections[0] * 3600 + this.selections[1] * 60
      );
    },
  },
  emits: ["close", "confirm"],
  data() {
    return {
      selections: [0, 0],
    };
  },
  props: ["isOpen"],
  components: { ScrollPicker, TransitionRoot },
};
</script>
