<template>
  <div class="h-full flex flex-col items-center">
    <h1 class="text-header text-3xl">{{ activeHouse.name }}</h1>
  </div>
</template>

<script>
import store from "../store";
import { mapGetters, mapMutations } from "vuex";
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  name: "Home",
  methods: {
    ...mapMutations(["selectHouse"]),
    ...mapGetters(["getSelectedHouse"]),
    setActiveHouse(id) {
      if (id === this.activeHouseId) {
        return;
      }

      if (this.activeHouseListener !== null) {
        // Unsubscribes the listener
        this.activeHouseListener();
      }

      const db = getDatabase();
      this.activeHouseId = id;
      this.activeHouseListener = onValue(ref(db, id), (snapshot) => {
        this.activeHouse = snapshot.val();
      });
    },
  },
  data() {
    return {
      activeHouseId: null,
      activeHouseListener: null,
      activeHouse: {
        name: "",
        switches: [],
        notes: [],
      },
    };
  },
  created() {
    // Listen to selecting a different house so we can resub to a different firebase doc
    store.subscribe((mutation) => {
      if (mutation.type === "selectHouse") {
        this.setActiveHouse(this.getSelectedHouse());
      }
    });

    // Run on page load to subscribe to the active house doc
    this.setActiveHouse(this.getSelectedHouse());
  },
};
</script>
