<template>
  <div class="w-4/5 p-6 my-8 align-middle transform bg-main rounded-2xl">
    <h1 class="text-2xl text-header">Creating New Switch</h1>
    <div class="hr-base" />
    <!-- TODO -->
    <button
      class="bg-primary rounded-md p-2 w-full text-header"
      @click="onConfirmed"
    >
      Confirm
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onConfirmed() {
      this.$emit("confirm", {});
    },
  },
  emits: ["confirm"],
};
</script>
