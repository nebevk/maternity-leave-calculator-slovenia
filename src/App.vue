<template>
  <div id="app">
    <AppNavbar />
    <PrimeToast />
    <main class="app-main">
      <router-view />
    </main>
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

:root {
  --p-font-family: "Nunito", sans-serif;
}

html,
body {
  margin: 0;
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--p-text-color);
  background-color: var(--p-surface-ground);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1 0 auto;
}
</style>
