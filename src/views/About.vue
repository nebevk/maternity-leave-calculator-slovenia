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
    <KofiButton class="about-kofi" />
    <p class="about-personal">
      {{ $t("about.personalPageText") }}
      <a
        href="https://nejcbevk.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        nejcbevk.netlify.app
      </a>
    </p>
  </div>
</template>

<script>
import KofiButton from "../components/KofiButton.vue";

export default {
  name: "AboutPage",
  components: {
    KofiButton,
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
.about-kofi {
  justify-content: flex-start;
  margin: 1rem 0;
}
.about-personal {
  color: var(--p-text-muted-color);
}
.about-personal a {
  color: var(--p-primary-color);
  font-weight: 600;
}
</style>
