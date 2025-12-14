<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="top-nav">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/contact">Contacts</RouterLink> |
      <RouterLink to="/login">Login</RouterLink> |
      <RouterLink to="/signup">Signup</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.top-nav {
  background-color: #ccc; /* Hall riba nagu pildil */
  padding: 10px;
  text-align: center;
  border-radius: 10px 10px 0 0;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  margin: 0 5px;
}

a.router-link-active {
  color: #000;
  text-decoration: underline;
}
</style>

<style scoped>
/* Siia tuleb hiljem disain */
</style>