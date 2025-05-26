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
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");

body,
#app {
  font-family: "Nunito", var(--font-family), sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  margin: 0;
  padding: 1rem;
  min-height: 100vh;
  background-color: var(--surface-ground);
}
</style>
