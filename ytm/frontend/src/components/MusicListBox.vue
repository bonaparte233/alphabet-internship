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
          <div v-if="currentAudio.album" style="color: #fff;">
            <div>专辑：{{ currentAudio.album }}</div>
            当前播放：{{ currentAudioName }}
          </div>
          <audio-player
            ref="playerRef"
            :audio-list="audioList.map(elm => elm.url)"
            :before-play="handleBeforePlay"
            theme-color="#ff2929"
            @play="report"
            @playing="timeupdate"
            @progress-end="report"
            @progress-click="report"
          />
        </v-col>
      </v-row>
    </div>
    <v-dialog
      v-model="dialog"
      width="auto"
      persistent
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="同一时间只能有一个设备在播放"
        title="提示"
      >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { queryMusicsApi } from '@/api/track'
import { getInfoApi, reportInfoApi } from '@/api/user'
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import axios from 'axios'
axios.defaults.baseURL = '/api'
import { useRoute } from 'vue-router'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers['Authorization'] = `Bear ${token}`
}

const { proxy } = getCurrentInstance()

const playerState = ref(false)
const currentAudioName = ref('')
const audioList = ref([])
const dialog = ref(false)
const currentAudio = ref({})

const route = useRoute()

const list = ref([])
const playerRef = ref(null)

const handleBeforePlay = (next) => {
  currentAudioName.value = audioList.value[playerRef.value.currentPlayIndex].name
  currentAudio.value = list.value[playerRef.value.currentPlayIndex]
  console.log(currentAudio.value)
  next()
}

const timeupdate = () => {
  const currentTime = Math.floor(Math.round(playerRef.value.currentTime))
  if (currentTime % 30 == 0) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    getInfoApi(user.uid).then(res => {
      const mid = localStorage.getItem('mid') || ''
      if (mid != user.playing) {
        playerRef.value.pause()
        dialog.value = true
      }
    })
  }
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

const report = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const mid = localStorage.getItem('mid') || ''
  reportInfoApi(user.uid, mid)
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
