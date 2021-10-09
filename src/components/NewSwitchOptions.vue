<template>
  <div class="w-4/5 p-6 my-8 align-middle transform bg-background rounded-2xl">
    <h1 class="text-2xl text-header">Creating New Switch</h1>
    <div class="hr-base" />
    <div class="flex flex-col space-y-6">
      <div>
        <label for="newSwitchName" class="text-header mb-1 whitespace-nowrap"
          >Switch name:</label
        >
        <input
          v-model="newSwitch.name"
          id="newSwitchName"
          class="input-base w-full"
          placeholder="Enter switch name..."
        />
      </div>
      <div class="flex items-center">
        <div class="flex-1 flex mt-1">
          <label for="newSwitchTimed" class="text-header whitespace-nowrap mr-2"
            >Use a timer?</label
          >
        </div>
        <styled-switch v-model:enabled="newSwitch.timed" />
      </div>
      <button
        class="bg-primary rounded-md p-2 w-full text-header"
        @click="onConfirmed"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
import StyledSwitch from "./StyledSwitch.vue";

import { getDatabase, ref, set, push } from "firebase/database";
import { mapGetters } from "vuex";

export default {
  components: { StyledSwitch },
  data() {
    return {
      newSwitch: {
        name: "",
        timed: false,
      },
    };
  },
  methods: {
    ...mapGetters(["getSelectedHouse"]),
    onConfirmed() {
      this.$emit("confirm", this.newSwitch);
      const db = getDatabase();
      const switchesRef = ref(db, `${this.getSelectedHouse()}/switches`);

      const sw = Object.assign(
        { enabled: false, lastEnabled: "-" },
        this.newSwitch
      );

      if (sw.timed) {
        Object.assign(sw, {
          timer_length: 0,
          timer_start: 0,
        });
      }

      set(push(switchesRef), sw);

      this.newSwitch = {
        name: "",
        timed: false,
      };
    },
  },
  emits: ["confirm"],
};
</script>

<style scoped>
input[type="checkbox"] {
  transform: scale(2);
  @apply bg-main;
}
</style>
