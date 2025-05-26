<template>
  <AppMenubar :model="[]" class="navbar">
    <template #start>
      <span class="navbar-brand">{{ $t("appName") }}</span>
    </template>
    <template #end>
      <div class="navbar-actions">
        <Menubar :model="items" class="menu-inline" />
        <select class="lang-switcher" v-model="$i18n.locale">
          <option value="sl">Slovenščina</option>
          <option value="en">English</option>
        </select>
      </div>
    </template>
  </AppMenubar>
</template>

<script>
import Menubar from "primevue/menubar";

export default {
  name: "AppNavbar",
  components: { Menubar },
  computed: {
    items() {
      return [
        {
          label: this.$t("menu.calculator"),
          icon: "pi pi-calculator",
          command: () => this.$router.push("/"),
        },
        {
          label: this.$t("menu.about"),
          icon: "pi pi-info-circle",
          command: () => this.$router.push("/about"),
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
  background: #f5ffee;
  padding: 1rem 2rem;
  margin: 1rem;
}

.navbar-brand {
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: 1px;
  margin-right: 2rem;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.menu-inline {
  background: none;
  border: none;
  box-shadow: none;
  padding: 0;
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
