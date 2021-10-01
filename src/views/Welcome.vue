<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div
      class="
        flex flex-col
        justify-center
        items-center
        absolute
        bg-main
        p-4
        py-10
        w-4/5
        rounded-md
        shadow
      "
    >
      <h1 class="text-4xl text-header mb-1">HouseMate</h1>
      <small class="text-header opacity-50"
        >Welcome to HouseMate, let's get started!</small
      >
      <div class="hr-base" />
      <div class="w-full ml-1 mr-1 flex flex-col">
        <h2 class="text-left w-full text-header text-2xl">Got a house code?</h2>
        <input
          v-model="joinCode"
          class="input-base mb-1 mt-2"
          placeholder="Code"
        />
        <p v-if="joinCodeInvalid" class="text-red-500 text-sm">
          Oops, that's an invalid house code!
        </p>
        <button
          class="text-header self-end text-xl underline"
          @click="onJoinHouseClick"
        >
          Join →
        </button>
      </div>
      <div class="hr-base" />
      <div
        class="
          w-full
          ml-1
          mr-1
          flex flex-col
          opacity-50
          pointer-events-none
          select-none
        "
      >
        <h2 class="text-left w-full text-header text-2xl">
          Creating a new house?
        </h2>
        <input
          v-model="newHouseName"
          class="input-base mb-1 mt-2"
          placeholder="House name"
        />
        <button
          class="text-header self-end text-xl underline"
          @click="onCreateHouseClick"
        >
          Create →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, get } from "firebase/database";
import { mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["hasHouse"]),
  },
  methods: {
    ...mapMutations(["addHouse", "selectHouse"]),
    onJoinHouseClick() {
      this.joinCodeInvalid = false;

      if (this.joinCode.length == 0) {
        this.joinCodeInvalid = true;
        return;
      }

      const db = getDatabase();
      get(ref(db, this.joinCode)).then((snapshot) => {
        if (snapshot.exists()) {
          if (this.hasHouse(this.joinCode)) {
            this.$router.push("/home");
          } else {
            this.addHouse(this.joinCode);
            this.selectHouse(0);
            this.$router.push("/home");
          }
        } else {
          this.joinCodeInvalid = true;
          this.joinCode = "";
        }
      });
    },
    onCreateHouseClick() {
      //console.log(this.newHouseName);
    },
  },
  created() {
    // TODO can this be moved into a route guard maybe? beforeUpdate?
    const id = this.$route.params.id;
    const house = this.$store.getters.getSelectedHouse;

    if (id) {
      this.joinCode = id;
      this.onJoinHouseClick();
    } else if (house) {
      this.$router.push("/home");
    }
  },
  data() {
    return {
      newHouseName: "",
      joinCode: "",
      joinCodeInvalid: false,
    };
  },
};
</script>
