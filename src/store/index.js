import { createStore } from "vuex";

const store = createStore({
  state: {
    houses: [],
    selectedHouse: 0,
    username: "A Housemate",
  },
  mutations: {
    setHouses(state, houses) {
      state.houses = houses;
    },
    addHouse(state, house) {
      state.houses.unshift(house);
    },
    selectHouse(state, id) {
      state.selectedHouse = id;
    },
    setUsername(state, name) {
      state.username = name;
    },
    leaveHouse(state) {
      state.houses.splice(state.selectedHouse, 1);
      state.selectedHouse = 0;
    },
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem("store")) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
  },
  getters: {
    getSelectedHouse(state) {
      return state.houses[state.selectedHouse];
    },
    hasHouse(state) {
      return (id) => {
        return state.houses.includes(id);
      };
    },
  },
  actions: {},
  modules: {},
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
