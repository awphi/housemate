<template>
  <div class="flex h-full justify-center items-center">
    <div
      class="
        bg-main
        p-4
        w-4/5
        flex
        justify-center
        items-center
        rounded-md
        flex-col
      "
    >
      <h1 class="text-header text-4xl mb-4">Settings</h1>
      <div class="flex flex-col w-5/6">
        <p class="text-header whitespace-nowrap">Display Name:</p>
        <input
          v-model="newName"
          class="input-base w-full"
          placeholder="New name"
        />
        <button
          class="button-base mt-4 bg-primary w-fit-content self-center"
          @click="onConfirmChanges"
        >
          Confirm changes
        </button>
      </div>
      <hr class="hr-base" />
      <button class="bg-red-600 button-base">Leave House</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["setUsername"]),
    onConfirmChanges() {
      if (this.newName.length > 0) {
        this.setUsername(this.newName);
        this.newName = "";
      }
    },
  },
  data() {
    return {
      newName: "",
    };
  },
};
</script>
