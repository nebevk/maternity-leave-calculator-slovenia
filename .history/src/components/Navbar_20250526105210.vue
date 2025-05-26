<template>
  <nav class="navbar">
    <div class="navbar-brand">Maternity Leave Calculator</div>
    <div class="navbar-menu">
      <router-link to="/" class="navbar-link" exact-active-class="active">
        Calculator
      </router-link>
      <router-link to="/about" class="navbar-link" exact-active-class="active">
        About
      </router-link>
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
</style>
