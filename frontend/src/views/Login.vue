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
/* Üldine konteiner */
.auth-container {
  min-height: 80vh; /* Täielik vertikaalne kõrgus */
  width: 100vw;      /* Täielik laiuse katvus */
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fdfbfb, #ebedee); /* Pehme taust */
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Kaart */
.auth-card {
  background: linear-gradient(145deg, #ffffff, #f0f0f0); /* Kaardile gradient */
  padding: 40px;
  border-radius: 25px; /* Ümarad servad */
  width: 380px; /* Natuke laiem kaart */
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); /* Õrn vari */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.auth-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2); /* Hoveril sügavam vari */
}

/* Pealkiri */
.auth-card h3 {
  margin-bottom: 25px;
  color: #333;
  font-weight: 600;
  font-size: 1.6em;
}

/* Vormigrupid */
.form-group {
  margin-bottom: 18px;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px; /* Ümarad väljad */
  border: 1px solid #ccc;
  margin-top: 5px;
  font-size: 1em;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #3498db; /* Sinine rõhutus focusil */
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
}

/* Nuppude rühm */
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}

.blue-btn {
  background: linear-gradient(135deg, #3498db, #2980b9); /* Gradient nuppudele */
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 20px; /* Ümarad nupud */
  cursor: pointer;
  flex: 1; /* Nupud võtavad võrdselt ruumi */
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.blue-btn:hover {
  transform: translateY(-2px); /* Kergelt üles */
  box-shadow: 0 6px 15px rgba(0,0,0,0.25); /* Hoveri vari */
  background: linear-gradient(135deg, #2980b9, #2471a3); /* Tumedam gradient hoveril */
}

/* “Or” tekst */
.or-text {
  margin: 0 12px;
  font-weight: bold;
  color: #555;
}

</style>