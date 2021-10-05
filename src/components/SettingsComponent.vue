<template>
  <div
    class="
      p-4
      flex
      w-full
      h-full
      items-center
      justify-center
      rounded-md
      flex-col
      self-center
    "
  >
    <div class="flex flex-col w-5/6 space-y-4">
      <div>
        <label for="newNameInput" class="text-header mb-1 whitespace-nowrap"
          >Your Display Name:</label
        >
        <input
          v-model="newName"
          id="newNameInput"
          class="input-base w-full"
          placeholder="New name"
        />
      </div>
      <div>
        <label
          for="newHouseNameInput"
          class="text-header mb-1 whitespace-nowrap"
          >House Name:</label
        >
        <input
          id="newHouseNameInput"
          v-model="newHouseName"
          class="input-base w-full"
          placeholder="New house name"
        />
      </div>
      <button
        ref="confirmButton"
        class="button-base bg-primary w-fit-content self-center"
        @click="onConfirmChanges"
      >
        Confirm changes
      </button>
    </div>
    <div class="hr-base" />
    <button class="bg-red-600 button-base" @click="onLeaveHouseClick">
      Leave House
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getDatabase, ref, update } from "firebase/database";

export default {
  methods: {
    ...mapGetters(["getSelectedHouse"]),
    ...mapMutations(["setUsername", "leaveHouse"]),
    onConfirmChanges() {
      if (this.newName.length > 0) {
        this.setUsername(this.newName);
      }

      if (this.newHouseName.length > 0) {
        const db = getDatabase();
        update(ref(db, this.getSelectedHouse()), {
          name: this.newHouseName,
        });
      }

      const cb = this.$refs.confirmButton;
      cb.disabled = true;
      setTimeout(() => {
        cb.disabled = false;
      }, 800);
    },
    onLeaveHouseClick() {
      // TODO confirm with a modal?
      this.leaveHouse();
      this.$router.go();
    },
  },
  data() {
    return {
      newName: this.$store.state.username,
      newHouseName: this.activeHouse.name,
    };
  },
  props: ["activeHouse"],
};
</script>
