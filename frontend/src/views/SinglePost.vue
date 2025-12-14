<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()  // Sellega saame kätte URL-i parameetrid (ID)
const router = useRouter() // Sellega saame suunata teisele lehele

const postBody = ref('')
const postId = route.params.id // Võtame ID aadressirealt

onMounted(async () => {
  const token = localStorage.getItem('token')

  // Laeme selle konkreetse postituse andmed
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (response.ok) {
      const data = await response.json()
      postBody.value = data.body // Paneme sisu kasti, et saaks muuta
    } else {
      router.push('/') // Kui posti ei leita, mine koju
    }
  } catch (error) {
    console.error(error)
  }
})

const updatePost = async () => {
  const token = localStorage.getItem('token')
  try {
    await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: 'PUT', // PUT on uuendamiseks
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ body: postBody.value })
    })
    router.push('/') // Pärast muutmist mine koju
  } catch (error) {
    console.error(error)
  }
}

const deletePost = async () => {
  const token = localStorage.getItem('token')
  try {
    await fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: 'DELETE', // DELETE on kustutamiseks
      headers: { 'Authorization': `Bearer ${token}` }
    })
    router.push('/') // Pärast kustutamist mine koju
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h3>A Post</h3>

      <div class="form-group">
        <label>Body</label>
        <input type="text" v-model="postBody" />
      </div>

      <div class="button-group">
        <button @click="updatePost" class="blue-btn">Update</button>
        <button @click="deletePost" class="blue-btn">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ikka sama disain, mis teistel lehtedel */
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

.form-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

input {
  width: 75%;
  padding: 8px;
  border-radius: 5px;
  border: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Vahe nuppude vahel */
}

.blue-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1; /* Nupud on võrdse laiusega */
  font-weight: bold;
}
</style>