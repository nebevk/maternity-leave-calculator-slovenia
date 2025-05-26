<template>
  <nav class="navbar">
    <div class="navbar-brand">{{ $t("appName") }}</div>
    <div class="navbar-menu">
      <router-link to="/" class="navbar-link" exact-active-class="active">
        {{ $t("menu.calculator") }}
      </router-link>
      <router-link to="/about" class="navbar-link" exact-active-class="active">
        {{ $t("menu.about") }}
      </router-link>
      <select class="lang-switcher" v-model="$i18n.locale">
        <option value="sl">Slovenščina</option>
        <option value="en">English</option>
      </select>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;
}

.navbar-brand {
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: 1px;
}

.navbar-menu {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.navbar-link {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.navbar-link.active,
.navbar-link:hover {
  color: #007ad9;
}

.lang-switcher {
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f8f8f8;
  margin-left: 1rem;
}
</style>
