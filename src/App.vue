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
}

html * {
  font-family: "Midpoint Pro Regular";
  font-weight: normal;
}

#app-box {
  padding: calc(env(safe-area-inset-top) + 1rem)
    calc(env(safe-area-inset-right) + 1rem)
    calc(env(safe-area-inset-bottom) + 1rem)
    calc(env(safe-area-inset-left) + 1rem);
}
</style>

<script>
export default {
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
};
</script>
