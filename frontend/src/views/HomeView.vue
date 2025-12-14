<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = ref([]) // Siia tulevad hiljem postitused

// See funktsioon käivitub iga kord, kui leht avatakse
onMounted(() => {
  // 1. TURVALISUS: Kontrollime, kas kasutajal on token
  const token = localStorage.getItem('token')

  if (!token) {
    // Kui tokenit pole, viskame kohe Login lehele
    router.push('/login')
    return
  }

  // Siia lisame hiljem postituste laadimise serverist
  console.log("Olen sisse logitud, token on olemas.")
})

const handleLogout = () => {
  // Kustutame tokeni (see ongi välja logimine)
  localStorage.removeItem('token')
  router.push('/login')
}

const goToAddPost = () => {
  router.push('/addpost') // Seda lehte meil veel pole, teeme järgmisena
}

const handleDeleteAll = () => {
  console.log("Kustutan kõik postitused...")
  // Siia tuleb hiljem serveri päring
}
</script>

<template>
  <div class="home-container">
    <div class="content-card">
      <div class="header-row">
        <h3>Home | Contacts</h3> <!-- Lihtsalt tekst nagu pildil -->
      </div>

      <button @click="handleLogout" class="logout-btn">Logout</button>

      <div class="posts-area">
        <!-- Siia tulevad postitused -->
        <p>Siin peaksid olema postitused...</p>
      </div>

      <div class="footer-row">
        <button @click="goToAddPost" class="action-btn add-btn">Add post</button>
        <button @click="handleDeleteAll" class="action-btn delete-btn">Delete all</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.content-card {
  background-color: #e0e0e0;
  padding: 20px;
  border-radius: 15px;
  width: 400px;
  text-align: center;
  position: relative;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.header-row {
  background-color: #ccc;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-weight: bold;
}

.logout-btn {
  align-self: flex-end; /* Nupp paremale serva */
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.posts-area {
  flex-grow: 1; /* Võtab kogu vaba ruumi */
  background-color: white; /* Postituste taust */
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}

.footer-row {
  display: flex;
  justify-content: space-between;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.add-btn {
  background-color: #3498db;
}

.delete-btn {
  background-color: #3498db;
}
</style>