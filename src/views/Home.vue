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
    <TabGroup>
      <TabPanels class="flex-1 w-full pt-4 pb-4">
        <TabPanel class="h-full"
          ><SwitchListComponent :switches="activeHouse.switches"
        /></TabPanel>
        <TabPanel class="h-full"></TabPanel>
        <TabPanel class="h-full"><SettingsComponent /></TabPanel>
      </TabPanels>
      <TabList class="flex space-x-8 text-header">
        <Tab v-slot="{ selected }" as="template">
          <a :class="[selected ? 'underline' : 'no-underline']"> Switches </a>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
          <a :class="[selected ? 'underline' : 'no-underline']"> Notes </a>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
          <a :class="[selected ? 'underline' : 'no-underline']"> Settings </a>
        </Tab>
      </TabList>
    </TabGroup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getDatabase, ref, onValue } from "firebase/database";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import SettingsComponent from "@/components/SettingsComponent";
import SwitchListComponent from "@/components/SwitchListComponent";

export default {
  name: "Home",
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
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
