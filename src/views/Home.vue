<template>
  <div class="h-full flex flex-col items-center">
    <div class="flex items-center">
      <h1 class="text-header text-3xl mb-1 mr-3">{{ activeHouse.name }}</h1>
      <button @click="onHouseMenuClicked">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          width="24"
          height="24"
          viewBox="7 9 10 7"
        >
          <path
            d="M12 15.25L16.25 9.75H7.75L12 15.25Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
    <small
      :slides-per-view="1"
      :space-between="50"
      class="text-header opacity-50"
      >Welcome, {{ this.$store.state.username }}!</small
    >
    <Swiper :pagination="true" class="w-full h-full">
      <SwiperSlide>
        <!-- <p class="text-2xl text-header">Switches</p> -->
        <SwitchListComponent :switches="activeHouse.switches" />
      </SwiperSlide>
      <SwiperSlide>
        <p class="text-2xl w-full self-center text-center text-header">Notes</p>
      </SwiperSlide>
      <SwiperSlide>
        <SettingsComponent />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getDatabase, ref, onValue } from "firebase/database";
import SettingsComponent from "@/components/SettingsComponent";
import SwitchListComponent from "@/components/SwitchListComponent";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper-bundle.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide,
    SettingsComponent,
    SwitchListComponent,
  },
  methods: {
    ...mapMutations(["selectHouse"]),
    ...mapGetters(["getSelectedHouse"]),
    onHouseMenuClicked() {},
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
        window.dispatchEvent(new Event("resize"));
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
    this.$store.subscribe((mutation) => {
      if (mutation.type === "selectHouse") {
        this.setActiveHouse(this.getSelectedHouse());
      }
    });

    // Run on page load to subscribe to the active house doc
    this.setActiveHouse(this.getSelectedHouse());
  },
};
</script>
