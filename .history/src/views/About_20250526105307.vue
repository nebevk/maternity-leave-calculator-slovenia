<template>
  <div class="about">
    <h2>About</h2>
    <p>This page will provide sources and explanations for the maternity leave calculations used in this application.</p>
    <h3>Sources</h3>
    <ul>
      <li>Official Slovenian government resources on parental leave</li>
      <li>Relevant labor law documents</li>
      <li>Other reputable sources</li>
    </ul>
    <h3>Calculation Explanation</h3>
    <p>
      The calculator uses the latest Slovenian regulations to estimate the duration and breakdown of maternity, paternity, and mixed parental leave. Please consult official resources for the most up-to-date information.
    </p>
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
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