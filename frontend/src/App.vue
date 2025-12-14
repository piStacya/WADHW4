<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <nav class="top-nav">
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/contact">Contacts</RouterLink> |
        <RouterLink to="/login">Login</RouterLink> |
        <RouterLink to="/signup">Signup</RouterLink>
      </nav>
    </header>

    <!-- Siia laetakse lehe sisu (Home, Login jne) -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- See on FOOTER, mis on nüüd igal lehel -->
    <footer class="app-footer">
      <p>Homework 4 - Sinu Nimi - 2025</p>
    </footer>
  </div>
</template>

<style scoped>
/* See konteiner tagab, et footer on alati all */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Terve ekraani kõrgus */
  font-family: Arial, sans-serif;
}

.top-nav {
  background-color: #ccc; /* Hall riba */
  padding: 15px;
  text-align: center;
  font-weight: bold;
  border-radius: 0 0 10px 10px; /* Ümarad nurgad all */
}

.top-nav a {
  text-decoration: none;
  color: #333;
  margin: 0 10px;
}

.top-nav a.router-link-active {
  color: #000;
  text-decoration: underline;
}

.main-content {
  flex: 1; /* See lükkab footeri lehe alla */
  padding: 20px;
  display: flex;
  justify-content: center; /* Hoiab sisu keskel */
}

.app-footer {
  background-color: #ccc;
  padding: 15px;
  text-align: center;
  color: #555;
  font-size: 0.9em;
  border-radius: 10px 10px 0 0; /* Ümarad nurgad üleval */
  margin-top: 20px;
}
</style>