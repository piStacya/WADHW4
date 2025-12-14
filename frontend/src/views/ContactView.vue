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
/* Üldine konteiner */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Keskendatud vertikaalselt */
  font-family: 'Segoe UI', sans-serif;
}

/* Kaart */
.auth-card {
  background: linear-gradient(145deg, #ffffff, #e0e0e0); /* Kerge gradient kaardile */
  padding: 40px;
  border-radius: 25px; /* Ümarad servad */
  width: 350px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); /* Sügavam vari */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.auth-card:hover {
  transform: translateY(-5px); /* Hoveril kerge tõstmine */
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2); /* Hoveri vari tugevam */
}

/* Pealkiri */
.auth-card h3 {
  margin-bottom: 25px;
  color: #333;
  font-weight: 600;
  font-size: 1.5em;
}

/* Kontaktinfo */
.contact-info {
  text-align: left;
  margin-top: 20px;
  line-height: 1.6;
  color: #444;
}

.contact-info p {
  margin: 8px 0;
}

.contact-info strong {
  color: #333; /* Tugevam rõhutus nimedele */
}

</style>