<template>
  <MenuBar :model="items" class="navbar">
    <template #start>
      <h1 class="title">Maternity calculator</h1>
    </template>
  </MenuBar>
</template>

<script>
export default {
  name: "PageNavbar",
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
          to: "/",
        },
        {
          label: "Calculator",
          icon: "pi pi-calculator",
          to: "/calculator",
        },
      ],
    };
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 2rem;
}

.title {
  color: var(--primary-color);
  margin: 0;
  font-size: 1.5rem;
}
</style>
