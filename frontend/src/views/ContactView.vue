<script setup>
// Siia pole skripti vaja, sest see on avalik leht (pole vaja tokenit kontrollida)
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h3>Contact Us</h3>

      <div class="contact-info">
        <p>See on kodutöö nr 4.</p>
        <p><strong>Email:</strong> mina@ut.ee</p>
        <p><strong>Telefon:</strong> 555-1234</p>
        <p>Helista meile, kui julged!</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Sama disain mis Login/Signup lehel */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.auth-card {
  background-color: #e0e0e0;
  padding: 40px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.contact-info {
  text-align: left;
  margin-top: 20px;
  line-height: 1.6;
}
</style>