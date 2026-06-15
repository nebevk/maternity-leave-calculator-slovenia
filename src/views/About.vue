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
  </div>
</template>

<script>
export default {
  name: "AboutPage",
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
</style>
