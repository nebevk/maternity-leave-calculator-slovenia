<template>
  <div id="app" class="app-shell">
    <AppNavbar />
    <PrimeToast />
    <div class="app-body">
      <main class="app-main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script>
import AppNavbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
  },
  watch: {
    "$i18n.locale": {
      immediate: true,
      handler(locale) {
        if (typeof document !== "undefined") {
          document.documentElement.lang = locale;
        }
      },
    },
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
}

/* Mobile-first: everything stacks vertically (sidebar becomes a top bar). */
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
}

.app-main {
  flex: 1 0 auto;
}

/* Desktop: sidebar on the left, content fills the rest. */
@media (min-width: 1024px) {
  .app-shell {
    flex-direction: row;
    align-items: stretch;
  }

  .app-body {
    min-height: 100vh;
  }
}
</style>
