<template>
  <teleport to="#modals">
    <div class="modal-base" @click="onClicked" v-if="isOpen">
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
          @click="
            $emit('confirm', selections[0] * 60 * 60 + selections[1] * 60)
          "
        >
          Confirm
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
import ScrollPicker from "vue3-scroll-picker";

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
    onClicked(e) {
      if (e.target === e.currentTarget) {
        this.$emit("close");
      }
    },
  },
  emits: ["close", "confirm"],
  data() {
    return {
      selections: [0, 0],
    };
  },
  props: ["isOpen"],
  components: { ScrollPicker },
};
</script>
