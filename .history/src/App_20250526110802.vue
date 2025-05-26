<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <AppNavbar />
    <PrimeToast />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from "./components/Navbar.vue";
import AppFooter from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");

body,
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  margin: 0;
  min-height: 100vh;
  background-color: var(--surface-ground);
}
</style>
