<template>
  <div class="kofi-button" v-html="kofiHtml"></div>
</template>

<script>
// Ko-fi official widget (kofiwidget2). The ID maps to the ko-fi.com/nejcbevk page.
const KOFI_WIDGET_ID = "M1X421IBSF";
const KOFI_COLOR = "#bf7fff";
const KOFI_SCRIPT = "https://storage.ko-fi.com/cdn/widget/Widget_2.js";

export default {
  name: "KofiButton",
  data() {
    return {
      kofiHtml: "",
    };
  },
  mounted() {
    this.loadKofiWidget();
  },
  watch: {
    "$i18n.locale"() {
      // Re-render so the button label follows the active language.
      this.renderKofiButton();
    },
  },
  methods: {
    renderKofiButton() {
      const kofi = typeof window !== "undefined" && window.kofiwidget2;
      if (!kofi) return;
      kofi.init(this.$t("donate"), KOFI_COLOR, KOFI_WIDGET_ID);
      this.kofiHtml = kofi.getHTML();
    },
    loadKofiWidget() {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }
      if (window.kofiwidget2) {
        this.renderKofiButton();
        return;
      }
      let script = document.getElementById("kofi-widget-script");
      if (!script) {
        script = document.createElement("script");
        script.id = "kofi-widget-script";
        script.src = KOFI_SCRIPT;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", () => this.renderKofiButton());
    },
  },
};
</script>

<style scoped>
.kofi-button {
  display: flex;
  justify-content: center;
}
</style>
