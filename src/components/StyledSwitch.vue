<template>
  <Switch
    :checked="enabled"
    class="switch-base w-20 h-10 relative inline-flex items-center"
    :class="enabled ? 'bg-primary' : 'bg-main'"
    @click="onToggle"
  >
    <span className="sr-only">Toggle {{ name ? name : "" }}</span>
    <span
      v-if="timed !== null ? !timed : true"
      aria-hidden="true"
      :class="enabled ? 'translate-x-11' : 'translate-x-1'"
      class="h-8 w-8 rounded-full bg-white shadow-lg switch-ball-base"
    />
    <svg
      v-else
      class="h-8 w-8 switch-ball-base"
      :class="enabled ? 'translate-x-11' : 'translate-x-1'"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke="currentColor"
        stroke-width="2"
      ></circle>
      <path stroke="currentColor" stroke-width="2" d="M12 5V12L16 16"></path>
    </svg>
  </Switch>
</template>

<script>
import { Switch } from "@headlessui/vue";

export default {
  methods: {
    onToggle() {
      this.$emit("update:enabled", !this.enabled);
      this.$emit("toggle");
    },
  },
  components: {
    Switch,
  },
  props: ["enabled", "name", "timed"],
  emits: ["toggle", "update:enabled"],
};
</script>
