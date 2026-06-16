<template>
  <div class="about">
    <h2>{{ $t("about.title") }}</h2>
    <p>{{ $t("about.aboutText") }}</p>
    <h3>{{ $t("about.sources") }}</h3>
    <ul>
      <li v-for="(src, i) in $tm('about.sourcesList')" :key="i">
        {{ $rt(src) }}
      </li>
    </ul>
    <h3>{{ $t("about.explanation") }}</h3>
    <p>{{ $t("about.explanationText") }}</p>

    <h3>{{ $t("about.support") }}</h3>
    <p>{{ $t("about.supportText") }}</p>
    <div class="about-actions">
      <KofiButton />
      <PrimeButton
        class="personal-button"
        icon="pi pi-external-link"
        :label="$t('about.personalPageButton')"
        @click="openPersonal"
      />
    </div>

    <p class="about-privacy">
      <router-link to="/privacy">{{ $t("menu.privacy") }}</router-link>
    </p>
  </div>
</template>

<script>
import KofiButton from "../components/KofiButton.vue";

const PERSONAL_URL = "https://nejcbevk.netlify.app";

export default {
  name: "AboutPage",
  components: {
    KofiButton,
  },
  methods: {
    openPersonal() {
      if (typeof window !== "undefined") {
        window.open(PERSONAL_URL, "_blank", "noopener");
      }
    },
  },
};
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  font-family: "Nunito", sans-serif;
}
.about h2 {
  font-weight: 800;
  margin-bottom: 1rem;
}
.about h3 {
  margin-top: 2rem;
  font-weight: 700;
}
.about ul {
  margin-left: 1.5rem;
}
.about-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
}
.personal-button {
  background: #1e40af !important;
  border-color: #1e40af !important;
}
.personal-button:hover {
  background: #1e3a8a !important;
  border-color: #1e3a8a !important;
}
.about-privacy {
  margin-top: 1.5rem;
}
.about-privacy a {
  color: var(--p-primary-color);
  font-weight: 600;
}
</style>
