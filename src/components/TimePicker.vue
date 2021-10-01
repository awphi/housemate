<template>
  <div class="w-4/5 p-6 my-8 align-middle transform bg-main rounded-2xl">
    <h1 class="text-2xl text-header">Set Timer</h1>
    <div class="hr-base" />
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
    <div class="hr-base" />

    <button
      class="bg-primary rounded-md p-2 w-full text-header"
      @click="onConfirmed"
    >
      Confirm
    </button>
  </div>
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
    onConfirmed() {
      this.$emit(
        "confirm",
        this.selections[0] * 3600 + this.selections[1] * 60
      );
    },
  },
  data() {
    return {
      selections: [0, 0],
    };
  },
  emits: ["confirm"],
  components: { ScrollPicker },
};
</script>
