<template>
  <div class="home">
    <SimpleCard>
      <template #title> Welcome to My App </template>
      <template #content>
        <p>This is the main page of our application.</p>
      </template>
    </SimpleCard>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
</style>
