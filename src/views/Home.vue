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
    <small class="text-header opacity-50"
      >Welcome, {{ this.$store.state.username }}!</small
    >
    <Carousel class="flex flex-col w-full h-full">
      <Slide index="1">
        <div class="carousel__item">
          <!-- <p class="text-2xl text-header">Switches</p> -->
          <SwitchListComponent :switches="activeHouse.switches" />
        </div>
      </Slide>
      <Slide index="2">
        <div class="carousel__item">
          <p class="text-2xl text-header">Notes</p>
        </div>
      </Slide>
      <Slide index="3">
        <div class="carousel__item">
          <SettingsComponent />
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getDatabase, ref, onValue } from "firebase/database";
import SettingsComponent from "@/components/SettingsComponent";
import SwitchListComponent from "@/components/SwitchListComponent";

import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default {
  name: "Home",
  components: {
    Carousel,
    Slide,
    Pagination,
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
  mounted() {
    document.querySelector(".carousel__pagination-item > button").click();
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

<style>
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.carousel__item {
  @apply flex justify-center w-full h-full;
}

.carousel__slide {
  padding: 10px;
}

.carousel__track {
  @apply h-full;
}

.carousel__viewport {
  @apply flex-1;
}

.carousel__pagination-button--active {
  @apply bg-primary !important;
}

.carousel__pagination-button {
  @apply bg-main;
}
</style>
