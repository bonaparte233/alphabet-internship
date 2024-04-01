<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MusicCard from '@/components/MusicCard.vue';
import { queryPlayListApi, deletePlayListApi } from '@/api/playlist'
import MusicListBox from '@/components/MusicListBox.vue'

const route = useRoute()
const router = useRouter()

const detail = ref({})

const dialog = ref(false)

const remove = () => {
  deletePlayListApi(route.params.pid).then(() => {
    router.go(-1)
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    dialog.value = false
  })
}

onMounted(() => {
  queryPlayListApi(route.params.pid).then(res => {
    detail.value = res
  })
})

</script>

<template>
  <v-app>
    <v-main style="background-color: #131313;">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <MusicCard :item="detail" :click-able="false" :show-title="false" />
          </v-col>
          <v-col cols="12" md="3">
            <h1 style="color: #fff;font-weight: bold;margin-bottom: 20px;">{{ detail.name }}</h1>
            <!-- <div style="color: #999;">{{ detail.author }}</div> -->
            <div style="color: #999;">{{ detail.description }} • {{ detail.liked }} Liked</div>
            <div style="display: flex; gap:10px;margin-top: 20px;">
              <!-- <v-btn rounded="xl" block>shuffle</v-btn> -->
              <v-btn rounded="xl" color="#5865f2" @click="dialog = true" block>Delete playlist</v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="24">
            <MusicListBox />
          </v-col>
        </v-row>
      </v-container>
      <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        text="Are you sure Delete this playlist？"
        title="Delete Tips"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="remove"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
    </v-main>
    <v-footer style="background-color: #131313;">
    </v-footer>
  </v-app>
</template>

<style scoped>



</style>