<template>
  <div id="app-box" class="h-full bg-background">
    <router-view />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

html * {
  font-family: "Midpoint Pro Regular";
  font-weight: normal;
}

#app-box {
  @apply p-4;
}
</style>

<script>
export default {
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
};
</script>
