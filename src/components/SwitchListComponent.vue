<template>
  <div class="h-full w-full">
    <SwitchComponent
      v-for="(s, index) in this.switches"
      :switch="s"
      :key="index"
      :index="index"
      :now="now"
    ></SwitchComponent>
  </div>
</template>

<script>
import SwitchComponent from "./SwitchComponent.vue";

export default {
  data() {
    return {
      now: Math.round(Date.now() / 1000),
      interval: null,
    };
  },
  methods: {
    updateNow() {
      this.now = Math.round(Date.now() / 1000);
    },
  },
  created() {
    console.log("open");
    this.interval = setInterval(this.updateNow.bind(this), 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  components: {
    SwitchComponent,
  },
  props: ["switches"],
};
</script>
