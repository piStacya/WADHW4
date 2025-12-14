<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = ref([]) // Siia laeme postitused

// See funktsioon teeb kuupäeva ilusaks (nt "Dec 14, 2025")
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

onMounted(async () => {
  const token = localStorage.getItem('token')

  // 1. Turvakontroll
  if (!token) {
    router.push('/login')
    return
  }

  // 2. Laeme postitused serverist
  try {
    const response = await fetch('http://localhost:3000/api/posts', {
      headers: {
        'Authorization': `Bearer ${token}` // Näitame serverile "ID-kaarti"
      }
    })

    if (response.ok) {
      posts.value = await response.json() // Salvestame postitused muutujasse
    } else {
      console.error("Viga postituste laadimisel")
    }
  } catch (error) {
    console.error(error)
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const goToAddPost = () => {
  router.push('/addpost')
}

const handleDeleteAll = async () => {
  const token = localStorage.getItem('token')
  try {
    // Saadame serverile käsu KUSTUTA KÕIK
    await fetch('http://localhost:3000/api/posts', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    // Tühjendame ka ekraani koheselt
    posts.value = []
  } catch (error) {
    console.error(error)
  }
}

// See viib üksiku postituse vaatesse (teeme järgmisena)
const goToPost = (postId) => {
  router.push(`/post/${postId}`)
}
</script>

<template>
  <div class="home-container">
    <div class="content-card">
      <div class="header-row">
        <h3>Home | Contacts</h3>
      </div>

      <button @click="handleLogout" class="logout-btn">Logout</button>

      <div class="posts-area">
        <!-- Kui postitusi pole, näita kirja -->
        <p v-if="posts.length === 0">No posts yet.</p>

        <!-- Kui on postitusi, joonista igaühe jaoks kast -->
        <div
            v-for="post in posts"
            :key="post.id"
            class="post-item"
            @click="goToPost(post.id)"
        >
          <div class="post-header">
            <span class="post-date">{{ formatDate(post.date) }}</span>
          </div>
          <p class="post-body">{{ post.body }}</p>
        </div>

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
  align-self: flex-end;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

.posts-area {
  flex-grow: 1;
  background-color: white; /* Valge taust postituste taga */
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  overflow-y: auto; /* Kui postitusi on palju, tekib kerimisriba */
}

/* Üksiku postituse disain (hall kastike) */
.post-item {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer; /* Hiir muutub käekujuliseks */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: left;
}

.post-item:hover {
  background-color: #e8e8e8; /* Läheb natuke tumedamaks kui hiirega peale minna */
}

.post-header {
  display: flex;
  justify-content: flex-end; /* Kuupäev paremale */
  font-size: 0.8em;
  color: #666;
  margin-bottom: 5px;
}

.post-body {
  font-size: 1.1em;
  color: #333;
  margin: 0;
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
  font-weight: bold;
}

.add-btn {
  background-color: #3498db;
}

.delete-btn {
  background-color: #3498db; /* Kodutöö pildil on mõlemad sinised */
}
</style>