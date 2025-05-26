<template>
  <AppMenubar :model="items" class="navbar">
    <template #start>
      <span class="navbar-brand">{{ $t("appName") }}</span>
    </template>
    <template #end>
      <select class="lang-switcher" v-model="$i18n.locale">
        <option value="sl">Slovenščina</option>
        <option value="en">English</option>
      </select>
    </template>
  </AppMenubar>
</template>

<script>
export default {
  name: "AppNavbar",
  computed: {
    items() {
      return [
        {
          label: this.$t("menu.calculator"),
          to: "/",
        },
        {
          label: this.$t("menu.about"),
          to: "/about",
        },
      ];
    },
  },
};
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #eee;
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;
  background: #fff;
  padding: 0 2rem;
}

.navbar-brand {
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: 1px;
  margin-right: 2rem;
}

.lang-switcher {
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f8f8f8;
  margin-left: 1rem;
}
</style>
