<template>
  <v-container>
    <!-- Title -->
    <v-row>
      <v-col>
        <h1 class="white--text">Trending</h1>
      </v-col>
    </v-row>

    <!-- Trending list -->
    <v-row class="trending-list">
      <v-col cols="12" md="6">
        <v-list class="trending-list" lines="two">
          <v-list-item v-for="item in trendingItems.slice(0, 6)" @click="toDetail(item)" :key="item.id" active-class="active-list-item">
            <template #prepend>
              <v-avatar size="48">
                <v-img :src="item.image"></v-img>
              </v-avatar>
            </template>

            <div class="list-item-content">
              <div class="title">{{ item.name }}. {{ item.author }}</div>
              <div class="subtitle">{{ item.description }} • {{ item.liked }} Liked</div>
            </div>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="6">
        <v-list class="trending-list" lines="two">
          <v-list-item v-for="item in trendingItems.slice(6, 12)" @click="toDetail(item)" :key="item.pid" active-class="active-list-item">
            <template #prepend>
              <v-avatar size="48">
                <v-img :src="item.image"></v-img>
              </v-avatar>
            </template>

            <div class="list-item-content">
              <div class="title">{{ item.name }}. {{ item.author }}</div>
              <div class="subtitle">{{ item.description }} • {{ item.liked }} Liked</div>
            </div>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { queryPlayListsApi } from '@/api/playlist'
import { ref, onMounted } from 'vue'
import axios from 'axios'
axios.defaults.baseURL = '/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const trendingItems = ref([
  { id: 1, rank: 1,title: 'Doctor (Work It Out)', artist: 'Pharrell Williams & Miley Cyrus', views: '4M', thumbnail: 'thumbnail_1.jpg' },
  { id: 2, rank: 2,title: 'Popular', artist: 'The Weeknd, Madonna & Playboi Carti', views: '12M', thumbnail: 'thumbnail_2.jpg' },
  { id: 3, rank: 3,title: 'Overcompensate', artist: 'twenty one pilots', views: '3.6M', thumbnail: 'thumbnail_3.jpg' },
  { id: 4, rank: 4,title: 'Like What (Freestyle)', artist: 'Cardi B', views: '3.3M', thumbnail: 'thumbnail_4.jpg' },
  { id: 5, rank: 5,title: 'Flowers (LIVE at the 66th Grammys)', artist: 'Miley Cyrus', views: '15M', thumbnail: 'thumbnail_5.jpg' },
  { id: 6, rank: 6,title: 'EASY', artist: 'LE SSERAFIM', views: '57M', thumbnail: 'thumbnail_6.jpg' },
  { id: 7, rank: 7,title: 'Heat Waves', artist: 'Glass Animals', views: '1.2B', thumbnail: 'thumbnail_7.jpg' },
  { id: 8, rank: 8,title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', views: '842M', thumbnail: 'thumbnail_8.jpg' },
  { id: 9, rank: 9,title: 'INDUSTRY BABY', artist: 'Lil Nas X & Jack Harlow', views: '778M', thumbnail: 'thumbnail_9.jpg' },
  { id: 10, rank: 10,title: 'Need to Know', artist: 'Doja Cat', views: '224M', thumbnail: 'thumbnail_10.jpg' },
  { id: 11, rank: 11,title: 'good 4 u', artist: 'Olivia Rodrigo', views: '689M', thumbnail: 'thumbnail_11.jpg' },
  { id: 12, rank: 12,title: 'Kiss Me More', artist: 'Doja Cat ft. SZA', views: '523M', thumbnail: 'thumbnail_12.jpg' },
])

const downloadImg = (pid) => {
  return new Promise(async (resolve) => {
    const response = await axios.get(`/image/${pid}`, { responseType: 'blob' })
    if (response.status == 200) {
      const blob = new Blob([response.data], { type: response.headers['content-type'] })
      resolve(URL.createObjectURL(blob))
    } else {
      resolve(new URL('../assets/imgs/default.jpg', import.meta.url).href)
    }
  })
}

const toDetail = (item) => {
  router.push({
    name: 'playlistDetail',
    params: {
      pid: item.pid
    }
  })
}

onMounted(() => {
  queryPlayListsApi().then(res => {
    let list = res.data || []
    list.forEach(async item => {
      item.image = await downloadImg(item.pid)
    })
    trendingItems.value = list
  })
})

</script>

<style scoped>
.white--text {
  color: white;
}

.trending-list {
  background-color: #131313;
}

.active-list-item {
  background-color: #131313;
}

.list-item-content .title {
  color: white;
  font-weight: bold;
}

.list-item-content .subtitle {
  color: rgba(255, 255, 255, 0.7);
}

.v-list-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
