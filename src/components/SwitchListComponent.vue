<template>
  <div class="h-full">
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
      now: 0,
    };
  },
  methods: {
    updateNow() {
      this.now = Math.round(Date.now() / 1000);
    },
  },
  created() {
    setInterval(this.updateNow.bind(this), 1000);
  },
  components: {
    SwitchComponent,
  },
  props: ["switches"],
};
</script>
