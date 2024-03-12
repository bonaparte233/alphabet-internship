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
      <v-col cols="24">
        <v-list class="trending-list" lines="one">
          <v-list-item v-for="(item, index) in list" @click="toDetail(item, index)" :key="item.id" active-class="active-list-item">
            <v-row style="color: #999">
              <v-col cols="4" md="3">{{ item.title }}</v-col>
              <v-col cols="4" md="3">{{ item.artist.join(',') }}</v-col>
              <v-col cols="4" md="3">{{ item.album }}</v-col>
              <v-col cols="4" md="3">{{ item.length }}</v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <div class="v-container" style="position: fixed;bottom: 20px;z-index: 1;">
      <v-row>
        <v-col cols="24">
          <audio-player
            ref="playerRef"
            :audio-list="audioList.map(elm => elm.url)"
            :before-play="handleBeforePlay"
            theme-color="#ff2929"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { queryMusicsApi } from '@/api/track'
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import axios from 'axios'
axios.defaults.baseURL = '/api'
import { useRoute } from 'vue-router'

const { proxy } = getCurrentInstance()

const playerState = ref(false)
const currentAudioName = ref('')
const audioList = ref([])

const route = useRoute()

const list = ref([])
const playerRef = ref(null)

const handleBeforePlay = (next) => {
  currentAudioName.value = audioList.value[playerRef.value.currentPlayIndex].name
  next()
}

const downloadAudio = (id) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(`/stream/${id}`)
    if (response.status == 200) {
      resolve(response.data)
    } else {
      reject()
    }
  })
}

const toDetail = (item, index) => {
  playerState.value = true
  playerRef.value.play()
}

const display = computed(() => proxy.$vuetify.display)

onMounted(() => {
  queryMusicsApi({
    album_id: route.params.pid
  }).then(res => {
    let datas = res.data || []
    list.value = datas
    audioList.value = datas.map(item => {
      const url = downloadAudio(item.track_id)
      return {
        name: item.title,
        url: `http://127.0.0.1:3000/${item.file}`
      }
    })
  })
  // queryPlayListsApi().then(res => {
  //   let list = res.data || []
  //   list.forEach(async item => {
  //     item.image = await downloadImg(item.pid)
  //   })
  //   trendingItems.value = list
  // })
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
