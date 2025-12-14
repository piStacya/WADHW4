<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const body = ref('') // Siia tuleb postituse sisu

const addPost = async () => {
  const token = localStorage.getItem('token')

  // Saadame postituse serverisse
  try {
    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // NB! Saadame tokeni kaasa
      },
      body: JSON.stringify({ body: body.value })
    })

    if (response.ok) {
      // Kui õnnestus, suuname tagasi avalehele
      router.push('/')
    } else {
      alert("Viga postitamisel!")
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h3>Add Post</h3>

      <div class="form-group">
        <label>Body</label>
        <input type="text" v-model="body" placeholder="body" />
      </div>

      <button @click="addPost" class="blue-btn">Add</button>
    </div>
  </div>
</template>

<style scoped>
/* Kasutame samu stiile mis Login/Signup lehel */
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
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

input {
  width: 70%;
  padding: 8px;
  border-radius: 5px;
  border: none;
}

.blue-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}
</style>