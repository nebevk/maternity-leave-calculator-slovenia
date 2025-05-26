<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <PrimeToast />
    <MaternityLeaveCalculator />
  </div>
</template>

<script>
import MaternityLeaveCalculator from "./components/MaternityLeaveCalculator.vue";

export default {
  name: "App",
  components: {
    MaternityLeaveCalculator,
  },
};
</script>

<style>
#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  margin: 0;
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--surface-ground);
}
</style>
