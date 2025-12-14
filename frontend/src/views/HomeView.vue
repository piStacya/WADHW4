<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = ref([])

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }
  try {
    const response = await fetch('http://localhost:3000/api/posts', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.ok) {
      posts.value = await response.json()
    }
  } catch (error) {
    console.error(error)
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const goToAddPost = () => { router.push('/addpost') }

const handleDeleteAll = async () => {
  const token = localStorage.getItem('token')
  try {
    await fetch('http://localhost:3000/api/posts', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    posts.value = []
  } catch (error) { console.error(error) }
}

const goToPost = (postId) => { router.push(`/post/${postId}`) }
</script>

<template>
  <div class="home-layout">

    <!-- 1. Logout nupp (Keskel) -->
    <div class="top-bar">
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </div>

    <!-- 2. Postituste ala (Ilma küljekastideta) -->
    <div class="content-area">
      <div class="posts-container">
        <p v-if="posts.length === 0" class="no-posts">No posts yet.</p>

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
    </div>

    <!-- 3. Nupud (Joondatud täpselt postituste servadega) -->
    <div class="bottom-bar">
      <button @click="goToAddPost" class="action-btn add-btn">Add post</button>
      <button @click="handleDeleteAll" class="action-btn delete-btn">Delete all</button>
    </div>
  </div>
</template>

<style scoped>
/* Üldine raam */
.home-layout {
  width: 100%;
  max-width: 500px; /* Natuke kitsam ja elegantsem */
  border: 1px solid #999;
  padding: 20px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

/* Logout */
.top-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logout-btn {
  background-color: #6fa8dc;
  color: black;
  border: none;
  padding: 8px 30px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9em;
}

/* Sisu ala */
.content-area {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.posts-container {
  width: 100%;
  height: 400px; /* Fikseeritud kõrgus */
  overflow-y: auto; /* Kerimisriba */
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* Ilusasti raamitud sisu */
  padding: 5px;
}

.no-posts {
  text-align: center;
  color: #888;
  margin-top: 50px;
}

/* Postituse disain */
.post-item {
  background-color: #e0e0e0;
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  text-align: left;
  transition: transform 0.1s; /* Väike efekt */
}

.post-item:hover {
  transform: scale(1.01); /* Läheb hiirega natuke suuremaks */
  background-color: #d6d6d6;
}

.post-header {
  text-align: right;
  font-size: 0.8em;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.post-body {
  margin: 0;
  font-size: 1.1em;
  word-wrap: break-word; /* Et pikk tekst ei läheks kastist välja */
}

/* Alumised nupud */
.bottom-bar {
  display: flex;
  justify-content: space-between; /* Lükkab nupud äärtesse */
  width: 100%;
  margin-bottom: 15px;
}

.action-btn {
  background-color: #6fa8dc;
  border: none;
  padding: 10px 25px;
  border-radius: 20px;
  cursor: pointer;
  color: black;
  font-weight: bold;
}

.action-btn:hover {
  background-color: #5b9bd5;
}

/* Alumine hall riba */
.card-footer-bar {
  height: 30px;
  background-color: #ccc;
  border-radius: 15px;
  width: 100%;
}
</style>