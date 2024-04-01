<script setup>
import Header from '../components/Header.vue'
import MusicList from "@/components/MusicList.vue";
import Trending from "@/components/Trending.vue";
import MCard from '@/components/MCard.vue'
import { ref, onMounted } from 'vue'
import { savePlayListApi, queryPlayListsApi } from '@/api/playlist'
import axios from 'axios'
axios.defaults.baseURL = '/api'

const dialog = ref(false)
const list = ref([])
const form = ref({
  name: '',
  description: ''
})

const onSubmit = () => {
  savePlayListApi(form.value).then(res => {
    dialog.value = false
    loadList()
  }).catch(err => {
    console.log(err)
  })
}

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

const loadList = () => {
  queryPlayListsApi({
    _user: 'me',
    _type: 'playlist'
  }).then(res => {
    let _list = res.data || []
    _list.forEach(async item => {
      item.image = await downloadImg(item.pid)
    })
    list.value = _list
  })
}

onMounted(() => {
  loadList()
})
</script>

<template>
  <v-app>
    <Header />

    <v-main style="background-color: #131313;">
      <div>
        <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <div style="width: 160px;">
          <v-btn
            block
            rounded="xl"
            style="margin-top: 30px;margin-left: 30px;"
            color="#fff"
            text="Create"
            v-bind="activatorProps"
          ></v-btn>
        </div>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Create playlist"
      >
        <v-card-text>
          <div>
            <v-text-field
              v-model="form.name"
                label="name*"
                required
              ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="form.description"
                label="description*"
                required
              ></v-text-field>
          </div>
          

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="onSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </div>
      <v-spacer style="height: 50px;"></v-spacer>
      <div style="display: flex;gap: 20px;padding: 20px;flex-wrap: wrap;">
        <MCard v-for="(item) in list" :item="item" :key="item.id"></MCard>
      </div>
      <!-- <MusicList title="New albums and singles" /> -->
      <v-spacer style="height: 100px;"></v-spacer>
      <!-- <Trending /> -->
    </v-main>


    <v-footer style="background-color: #131313;">
    </v-footer>
  </v-app>
</template>

<style scoped>



</style>