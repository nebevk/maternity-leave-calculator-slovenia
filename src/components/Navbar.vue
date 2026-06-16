<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
    <div class="sidebar-brand">
      <span class="brand-title">{{ $t("appName") }}</span>
      <PrimeButton
        text
        rounded
        class="sidebar-toggle"
        :icon="
          collapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'
        "
        :aria-label="$t('a11y.toggleSidebar')"
        @click="toggleCollapsed"
      />
    </div>

    <PrimeSelect
      v-model="locale"
      :options="localeOptions"
      optionLabel="label"
      optionValue="value"
      class="lang-switcher"
      :aria-label="$t('a11y.languageSelector')"
    />

    <nav class="sidebar-nav">
      <PrimeMenu :model="navItems">
        <template #item="{ item, props }">
          <router-link
            v-slot="{ href, navigate, isExactActive }"
            :to="item.to"
            custom
          >
            <a
              :href="href"
              v-bind="props.action"
              class="sidebar-menu__link"
              :class="{ 'sidebar-menu__link--active': isExactActive }"
              @click="navigate"
            >
              <span
                :class="item.icon"
                class="sidebar-menu__icon"
                aria-hidden="true"
              />
              <span class="sidebar-menu__label">{{ item.label }}</span>
            </a>
          </router-link>
        </template>
      </PrimeMenu>
    </nav>

    <div class="sidebar-foot">
      <PrimeButton
        class="donate-button"
        icon="pi pi-heart"
        :label="$t('donate')"
        :aria-label="$t('donate')"
        @click="openDonate"
      />
      <a
        class="sidebar-copyright"
        href="https://nejcbevk.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t("footer", { year }) }}
      </a>
    </div>
  </aside>
</template>

<script>
import { LOCALE_STORAGE_KEY } from "../i18n";

const COLLAPSE_KEY = "mlc.sidebarCollapsed";

const KOFI_URL = "https://ko-fi.com/nejcbevk";

export default {
  name: "AppNavbar",
  data() {
    return {
      collapsed:
        (typeof window !== "undefined" &&
          window.localStorage?.getItem(COLLAPSE_KEY) === "1") ||
        false,
      localeOptions: [
        { label: "Slovenščina", value: "sl" },
        { label: "English", value: "en" },
      ],
    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    navItems() {
      return [
        {
          label: this.$t("menu.calculator"),
          icon: "pi pi-calculator",
          to: "/",
        },
        {
          label: this.$t("menu.about"),
          icon: "pi pi-info-circle",
          to: "/about",
        },
      ];
    },
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
  methods: {
    openDonate() {
      if (typeof window !== "undefined") {
        window.open(KOFI_URL, "_blank", "noopener");
      }
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      if (typeof window !== "undefined") {
        window.localStorage?.setItem(COLLAPSE_KEY, this.collapsed ? "1" : "0");
      }
    },
  },
};
</script>

<style scoped>
/* ===== Mobile-first: sticky top header ===== */
.sidebar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1rem;
  padding: 0.7rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid var(--p-surface-200, #eee);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  font-family: "Nunito", sans-serif;
}

.sidebar-brand {
  order: 1;
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-title {
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.3px;
  line-height: 1.2;
}

/* Collapse toggle is desktop-only. */
.sidebar-toggle {
  display: none;
}

.lang-switcher {
  order: 2;
  margin-left: auto;
  min-width: 8rem;
}

/* ----- Navigation menu (PrimeVue Menu, blended into the sidebar) ----- */
.sidebar-nav {
  order: 3;
  flex: 1 1 100%;
  width: 100%;
  min-width: 0;
}

/* Strip the Menu's default chrome and let it shrink with the sidebar. */
.sidebar-nav :deep(.p-menu) {
  width: 100%;
  min-width: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
}

.sidebar-nav :deep(.p-menu-list) {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0;
}

.sidebar-nav :deep(.p-menu-item) {
  flex: 1;
  margin: 0;
  min-width: 0;
}

.sidebar-menu__link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  color: var(--p-text-color);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.sidebar-menu__link:hover {
  background: var(--p-surface-100);
}

.sidebar-menu__link--active,
.sidebar-menu__link--active:hover {
  background: rgba(5, 150, 105, 0.14);
  color: var(--p-primary-color);
  font-weight: 600;
}

.sidebar-menu__icon {
  font-size: 1rem;
}

.sidebar-foot {
  order: 4;
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.donate-button {
  flex: 0 0 auto;
  border: 2px solid #ec4899 !important;
}

.sidebar-copyright {
  display: none;
  margin: 0;
  color: var(--p-text-muted-color);
  font-size: 0.8rem;
  text-decoration: none;
}

.sidebar-copyright:hover {
  color: var(--p-primary-color);
  text-decoration: underline;
}

/* ===== Desktop: vertical sidebar pinned to the left ===== */
@media (min-width: 1024px) {
  .sidebar {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 1.25rem;
    width: 260px;
    flex: 0 0 260px;
    height: 100vh;
    padding: 1.75rem 1rem;
    border-bottom: none;
    box-shadow: none;
    border-right: 1px solid var(--p-surface-200, #eee);
    background: linear-gradient(180deg, #ecfdf5 0%, #ffffff 45%);
    transition: width 0.2s ease, flex-basis 0.2s ease;
  }

  .sidebar-brand {
    order: 0;
    flex: 0 0 auto;
    align-items: flex-start;
  }

  .brand-title {
    flex: 1 1 auto;
    font-size: 1.3rem;
    line-height: 1.25;
  }

  .sidebar-toggle {
    display: inline-flex;
    flex: 0 0 auto;
    margin-left: auto;
  }

  .lang-switcher {
    order: 0;
    margin-left: 0;
    width: 100%;
    min-width: 0;
  }

  .sidebar-nav {
    order: 0;
    flex: 0 0 auto;
  }

  .sidebar-nav :deep(.p-menu-list) {
    flex-direction: column;
    gap: 0.25rem;
  }

  .sidebar-nav :deep(.p-menu-item) {
    flex: 0 0 auto;
  }

  .sidebar-menu__link {
    justify-content: flex-start;
  }

  .sidebar-foot {
    order: 0;
    margin-top: auto;
    flex: 0 0 auto;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .donate-button {
    width: 100%;
  }

  .sidebar-copyright {
    display: block;
    text-align: center;
  }

  /* Collapsed rail: icons only. */
  .sidebar--collapsed {
    width: 76px;
    flex-basis: 76px;
    padding: 1.75rem 0.6rem;
  }

  .sidebar--collapsed .sidebar-brand {
    justify-content: center;
  }

  .sidebar--collapsed .sidebar-toggle {
    margin-left: 0;
  }

  .sidebar--collapsed .brand-title,
  .sidebar--collapsed .lang-switcher,
  .sidebar--collapsed .sidebar-copyright {
    display: none;
  }

  .sidebar--collapsed .sidebar-menu__link {
    justify-content: center;
  }

  .sidebar--collapsed .sidebar-menu__label {
    display: none;
  }

  .sidebar--collapsed .donate-button :deep(.p-button-label) {
    display: none;
  }
}
</style>
