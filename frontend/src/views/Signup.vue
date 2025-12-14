<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleSignup = async () => {
  try {
    // 1. Saadame andmed serverisse
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    // 2. Kui tekkis viga (nt email juba olemas), näitame seda
    if (!response.ok) {
      alert(data.error)
      return
    }

    // 3. Kui kõik korras, salvestame tokeni ja suuname avalehele
    console.log("Registreerimine õnnestus, token:", data.token)
    localStorage.setItem('token', data.token) // Salvestame "ID-kaardi" brauserisse
    router.push('/') // Suuname Avalehele

  } catch (error) {
    console.error("Viga:", error)
    alert("Ei saanud serveriga ühendust!")
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h3>Signup</h3>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Email" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Password" />
      </div>

      <button @click="handleSignup" class="blue-btn">Signup</button>
    </div>
  </div>
</template>

<style scoped>
/* See disain teeb lehe sarnaseks Figure 1a-ga */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Peaaegu terve ekraani kõrgus */
}

.auth-card {
  background-color: #e0e0e0; /* Hall taust */
  padding: 40px;
  border-radius: 15px; /* Ümarad nurgad */
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
}

.blue-btn {
  background-color: #3498db; /* Sinine nupp */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}

.blue-btn:hover {
  background-color: #2980b9;
}
</style>