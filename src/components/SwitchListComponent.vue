<template>
  <div class="h-full w-full flex flex-col items-center">
    <div class="flex-1 overflow-scroll w-full mt-4">
      <SwitchComponent
        v-for="(s, index) in this.switches"
        :switch="s"
        :key="index"
        :index="index"
        :now="now"
      ></SwitchComponent>
      <div class="w-full switch-box-base justify-center items-center pt-1">
        <button @click="createNewClicked" class="button-base bg-main">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 5.75V18.25"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M18.25 12L5.75 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <modal v-model:isOpen="isModalOpen">
      <new-switch-options @confirm="newSwitchConfirmed" />
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import NewSwitchOptions from "./NewSwitchOptions.vue";
import SwitchComponent from "./SwitchComponent.vue";

export default {
  data() {
    return {
      now: Math.round(Date.now() / 1000),
      interval: null,
      isModalOpen: false,
    };
  },
  methods: {
    updateNow() {
      this.now = Math.round(Date.now() / 1000);
    },
    createNewClicked() {
      this.isModalOpen = true;
    },
    newSwitchConfirmed() {
      this.isModalOpen = false;
    },
  },
  created() {
    this.interval = setInterval(this.updateNow.bind(this), 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  components: {
    SwitchComponent,
    Modal,
    NewSwitchOptions,
  },
  props: ["switches"],
};
</script>
