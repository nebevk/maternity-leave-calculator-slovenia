<template>
  <header class="navbar">
    <span class="navbar-brand">
      {{ $t("appName") }}
      <PrimeTag severity="info" class="dev-tag">
        {{ $t("inDevelopment") }}
      </PrimeTag>
    </span>
    <nav class="navbar-actions">
      <PrimeButton
        text
        icon="pi pi-calculator"
        :label="$t('menu.calculator')"
        @click="$router.push('/')"
      />
      <PrimeButton
        text
        icon="pi pi-info-circle"
        :label="$t('menu.about')"
        @click="$router.push('/about')"
      />
      <PrimeSelect
        v-model="locale"
        :options="localeOptions"
        optionLabel="label"
        optionValue="value"
        class="lang-switcher"
      />
    </nav>
  </header>
</template>

<script>
import { LOCALE_STORAGE_KEY } from "../i18n";

export default {
  name: "AppNavbar",
  data() {
    return {
      localeOptions: [
        { label: "Slovenščina", value: "sl" },
        { label: "English", value: "en" },
      ],
    };
  },
  computed: {
    locale: {
      get() {
        return this.$i18n.locale;
      },
      set(value) {
        this.$i18n.locale = value;
        if (typeof window !== "undefined") {
          window.localStorage?.setItem(LOCALE_STORAGE_KEY, value);
        }
      },
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;
  background: #ffffff;
  padding: 1rem 2rem;
  margin: 1rem;
}

.navbar-brand {
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dev-tag {
  font-size: 0.9rem;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-switcher {
  min-width: 10rem;
}
</style>
