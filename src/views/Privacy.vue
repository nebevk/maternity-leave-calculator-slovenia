<template>
  <div class="privacy">
    <h2>{{ $t("privacy.title") }}</h2>
    <p>{{ $t("privacy.intro") }}</p>

    <h3>{{ $t("privacy.dataTitle") }}</h3>
    <p>{{ $t("privacy.dataText") }}</p>

    <h3>{{ $t("privacy.storageTitle") }}</h3>
    <p>{{ $t("privacy.storageText") }}</p>

    <h3>{{ $t("privacy.analyticsTitle") }}</h3>
    <p>{{ $t("privacy.analyticsText") }}</p>

    <h3>{{ $t("privacy.thirdPartyTitle") }}</h3>
    <p>{{ $t("privacy.thirdPartyText") }}</p>

    <h3>{{ $t("privacy.contactTitle") }}</h3>
    <p>
      {{ $t("privacy.contactText") }}
      <a
        href="https://nejcbevk.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        nejcbevk.netlify.app
      </a>
    </p>

    <p class="privacy-updated">{{ $t("privacy.updated") }}</p>
  </div>
</template>

<script>
export default {
  name: "PrivacyPage",
};
</script>

<style scoped>
.privacy {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  font-family: "Nunito", sans-serif;
}
.privacy h2 {
  font-weight: 800;
  margin-bottom: 1rem;
}
.privacy h3 {
  margin-top: 1.75rem;
  font-weight: 700;
}
.privacy a {
  color: var(--p-primary-color);
  font-weight: 600;
}
.privacy-updated {
  margin-top: 2rem;
  color: var(--p-text-muted-color);
  font-size: 0.85rem;
}
</style>
