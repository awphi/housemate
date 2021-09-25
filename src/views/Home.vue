<template>
  <div class="h-full flex flex-col items-center">
    <h1 class="text-header text-3xl">{{ activeHouse.name }}</h1>
    <TabGroup>
      <TabPanels class="flex-1 w-full pt-4 pb-4">
        <TabPanel class="h-full">Content 1</TabPanel>
        <TabPanel class="h-full">Content 2</TabPanel>
        <TabPanel class="h-full"><SettingsComponent /></TabPanel>
      </TabPanels>
      <TabList class="flex space-x-8 text-header">
        <Tab v-slot="{ selected }" as="template">
          <a :class="[selected ? 'underline' : 'no-underline']"> Switches </a>
        </Tab>
        <Tab v-slot="{ selected }" as="template"
          ><a :class="[selected ? 'underline' : 'no-underline']">
            Notes
          </a></Tab
        >
        <Tab v-slot="{ selected }" as="template"
          ><a :class="[selected ? 'underline' : 'no-underline']">
            Settings
          </a></Tab
        >
      </TabList>
    </TabGroup>
  </div>
</template>

<script>
import store from "../store";
import { mapGetters, mapMutations } from "vuex";
import { getDatabase, ref, onValue } from "firebase/database";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import SettingsComponent from "@/components/SettingsComponent";

export default {
  name: "Home",
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    SettingsComponent,
  },
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
