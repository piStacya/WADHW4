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
/* Üldine paigutus */
.home-layout {
  width: 100%;
  max-width: 500px;
  border-radius: 20px; /* Ümaramad servad */
  background: #ffffff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); /* Õrn vari raamile */
  font-family: 'Segoe UI', sans-serif;
}

/* Ülemine riba */
.top-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* Logout nupp */
.logout-btn {
  background: linear-gradient(135deg, #6fa8dc, #3b82f6); /* Kaunis gradient */
  color: white;
  border: none;
  padding: 10px 35px;
  border-radius: 25px; /* Ümarad nupud */
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95em;
  transition: all 0.2s ease; /* Sujuv hover efekt */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Õrn varjuefekt */
}

.logout-btn:hover {
  transform: translateY(-2px); /* Kergelt üles liikumine hoveril */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Tugevam vari hoveril */
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
  height: 400px;
  overflow-y: auto; /* Kerimisriba */
  display: flex;
  flex-direction: column;
  gap: 15px; /* Vahe postituste vahel */
  padding: 5px;
}

/* Tekst, kui postitusi pole */
.no-posts {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin-top: 50px;
}

/* Üksik postitus */
.post-item {
  background: linear-gradient(145deg, #f0f0f0, #e0e0e0); /* Pehme gradient */
  padding: 18px;
  border-radius: 20px; /* Ümarad postitused */
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease; /* Sujuv hover efekt */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08); /* Väike vari */
}

.post-item:hover {
  transform: translateY(-3px) scale(1.02); /* Natuke suuremaks ja üles hoveril */
  background: linear-gradient(145deg, #e0e0e0, #d0d0d0); /* Hoveril tumedam gradient */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15); /* Tugevam vari */
}

/* Postituse kuupäev ja pealkiri */
.post-header {
  text-align: right;
  font-size: 0.8em;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

/* Postituse sisu */
.post-body {
  margin: 0;
  font-size: 1.1em;
  line-height: 1.5;
  word-wrap: break-word; /* Tekst ei lähe kastist välja */
  color: #333;
}

/* Alumised nupud */
.bottom-bar {
  display: flex;
  justify-content: space-between; /* Nupud ääres */
  width: 100%;
  margin-bottom: 15px;
}

/* Toimingunupud (Add/Delete) */
.action-btn {
  background: linear-gradient(135deg, #6fa8dc, #3b82f6); /* Gradient */
  border: none;
  padding: 12px 30px;
  border-radius: 25px; /* Ümarad nupud */
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 0.95em;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Õrn vari */
}

.action-btn:hover {
  transform: translateY(-2px); /* Kergelt üles hoveril */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #5b9bd5, #2176f2); /* Tumedam gradient hoveril */
}

/* Alumine hall riba (valikuline) */
.card-footer-bar {
  height: 30px;
  background-color: #eee;
  border-radius: 20px;
  width: 100%;
}
</style>