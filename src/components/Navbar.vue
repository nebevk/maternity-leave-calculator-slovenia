<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
    <div class="sidebar-brand">
      <span class="brand-title">{{ $t("appName") }}</span>

      <PrimeButton
        v-if="isWide"
        text
        rounded
        class="sidebar-toggle"
        :icon="
          collapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'
        "
        :aria-label="$t('a11y.toggleSidebar')"
        @click="toggleCollapsed"
      />
      <PrimeButton
        v-else
        text
        rounded
        class="sidebar-burger"
        icon="pi pi-bars"
        :aria-label="$t('a11y.menu')"
        @click="toggleMobileMenu"
      />
    </div>

    <!-- Desktop: full vertical sidebar -->
    <template v-if="isWide">
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
        <div class="donate-widget">
          <KofiButton />
        </div>
        <a
          class="sidebar-copyright"
          href="https://nejcbevk.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t("footer", { year }) }}
        </a>
      </div>
    </template>

    <!-- Mobile: burger dropdown -->
    <PrimePopover v-else ref="menu" class="mobile-menu">
      <div class="mobile-menu__inner">
        <PrimeMenu :model="mobileNavItems" class="mobile-menu__nav" />
        <PrimeSelect
          v-model="locale"
          :options="localeOptions"
          optionLabel="label"
          optionValue="value"
          class="mobile-menu__lang"
          :aria-label="$t('a11y.languageSelector')"
        />
        <KofiButton />
      </div>
    </PrimePopover>
  </aside>
</template>

<script>
import { LOCALE_STORAGE_KEY } from "../i18n";
import KofiButton from "./KofiButton.vue";

const COLLAPSE_KEY = "mlc.sidebarCollapsed";

export default {
  name: "AppNavbar",
  components: {
    KofiButton,
  },
  data() {
    return {
      collapsed:
        (typeof window !== "undefined" &&
          window.localStorage?.getItem(COLLAPSE_KEY) === "1") ||
        false,
      isWide: false,
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
    mobileNavItems() {
      return [
        {
          label: this.$t("menu.calculator"),
          icon: "pi pi-calculator",
          command: () => this.goAndClose("/"),
        },
        {
          label: this.$t("menu.about"),
          icon: "pi pi-info-circle",
          command: () => this.goAndClose("/about"),
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
  mounted() {
    if (typeof window !== "undefined" && window.matchMedia) {
      this._mq = window.matchMedia("(min-width: 1024px)");
      this.isWide = this._mq.matches;
      this._mqHandler = (e) => {
        this.isWide = e.matches;
      };
      this._mq.addEventListener("change", this._mqHandler);
    }
  },
  beforeUnmount() {
    if (this._mq && this._mqHandler) {
      this._mq.removeEventListener("change", this._mqHandler);
    }
  },
  methods: {
    toggleMobileMenu(event) {
      this.$refs.menu?.toggle(event);
    },
    goAndClose(path) {
      if (this.$route.path !== path) this.$router.push(path);
      this.$refs.menu?.hide();
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
/* ===== Mobile-first: compact sticky top bar (title + burger) ===== */
.sidebar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid var(--p-surface-200, #eee);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  font-family: "Nunito", sans-serif;
}

.sidebar-brand {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-title {
  flex: 1 1 auto;
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.3px;
  line-height: 1.2;
}

.sidebar-burger {
  flex: 0 0 auto;
  margin-left: auto;
}

.sidebar-toggle {
  display: none;
}

/* Mobile dropdown (PrimeVue Popover) contents */
.mobile-menu__inner {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 12rem;
}

.mobile-menu :deep(.p-menu) {
  width: 100%;
  min-width: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  padding: 0;
}

.mobile-menu__lang {
  width: 100%;
}

/* ===== Desktop: vertical sidebar pinned to the left ===== */
@media (min-width: 1024px) {
  .sidebar {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
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
    flex: 0 0 auto;
    align-items: flex-start;
  }

  .brand-title {
    font-size: 1.3rem;
    line-height: 1.25;
  }

  .sidebar-toggle {
    display: inline-flex;
    flex: 0 0 auto;
    margin-left: auto;
  }

  .lang-switcher {
    width: 100%;
  }

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
    flex-direction: column;
    gap: 0.25rem;
    padding: 0;
  }

  .sidebar-nav :deep(.p-menu-item) {
    margin: 0;
  }

  .sidebar-menu__link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .donate-widget {
    display: flex;
    justify-content: center;
  }

  .sidebar-copyright {
    display: block;
    text-align: center;
    margin: 0;
    color: var(--p-text-muted-color);
    font-size: 0.8rem;
    text-decoration: none;
  }

  .sidebar-copyright:hover {
    color: var(--p-primary-color);
    text-decoration: underline;
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

  .sidebar--collapsed .donate-widget {
    display: none;
  }
}
</style>
