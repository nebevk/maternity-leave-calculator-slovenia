<template>
  <footer class="footer">
    {{ $t("footer", { year }) }}
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  text-align: center;
  padding: 1.5rem 0 1rem 0;
  color: #888;
  font-size: 1rem;
  background: none;
  font-family: "Nunito", sans-serif;
  border-top: 1px solid #eee;
  margin-top: 2rem;
}
</style>
