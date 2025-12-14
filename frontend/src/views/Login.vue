<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // 1. Saadame andmed serverisse
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error) // "Vale email või parool"
      return
    }

    // 2. Õnnestumisel salvestame tokeni
    console.log("Sisselogimine õnnestus, token:", data.token)
    localStorage.setItem('token', data.token)
    router.push('/') // Suuname Avalehele

  } catch (error) {
    console.error("Viga:", error)
    alert("Ei saanud serveriga ühendust!")
  }
}

const goToSignup = () => {
  router.push('/signup')
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h3>Login</h3>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Email" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Password" />
      </div>

      <div class="button-group">
        <button @click="handleLogin" class="blue-btn">Login</button>
        <span class="or-text">Or</span>
        <button @click="goToSignup" class="blue-btn">Signup</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Kordame samu stiile, et oleks ühtne */
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
  width: 350px; /* Natuke laiem, et nupud ära mahuks */
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

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.blue-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1; /* Nupud võtavad võrdselt ruumi */
}

.or-text {
  margin: 0 10px;
  font-weight: bold;
  color: #555;
}
</style>