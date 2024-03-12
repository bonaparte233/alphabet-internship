<script setup>
import { ref, computed, getCurrentInstance, defineProps, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = '/api'

const { proxy } = getCurrentInstance()

const router = useRouter()

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
  clickAble: {
    type: Boolean,
    default: true
  },
  showTitle: {
    type: Boolean,
    default: true
  }
})

const imgUrl = ref('')

const downloadImg = async () => {
  const response = await axios.get(`/image/${props.item.pid}`, { responseType: 'blob' })
  if (response.status == 200) {
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    imgUrl.value = URL.createObjectURL(blob)
  } else {
    imgUrl.value = new URL('../assets/imgs/default.jpg', import.meta.url).href
  }
  
}

watch(() => props.item, (value) => {
  if (value && value.image) {
    downloadImg()
  } else {
    imgUrl.value = new URL('../assets/imgs/default.jpg', import.meta.url).href
  }
}, {
  deep: true,
  immediate: true
})

const display = computed(() => proxy.$vuetify.display)

const toDetail = () => {
  if (!props.clickAble) return
  router.push({
    name: 'AlbumDetail',
    params: {
      pid: props.item.pid
    }
  })
}

</script>

<template>
  <v-bottom-sheet inset>
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-card
            class="mx-auto"
            height="200"
            :image="imgUrl"
            max-width="200"
            theme="dark"
            :title="props.showTitle ? item.name : ''"
            v-bind="props"
            @click="toDetail"
        ></v-card>
      </div>

    </template>

    <v-sheet>
      <v-progress-linear model-value="50"></v-progress-linear>

      <v-list>
        <v-list-item>
          <v-list-item-title>{{ props }}</v-list-item-title>

          <v-list-item-subtitle>Author</v-list-item-subtitle>

          <template v-slot:append>
            <v-btn
                icon="mdi-rewind"
                variant="text"
            ></v-btn>

            <v-btn
                :class="{ 'mx-5': display.mdAndUp.value }"
                icon="mdi-pause"
                variant="text"
            ></v-btn>

            <v-btn
                :class="{ 'me-3': display.mdAndUp.value }"
                class="ms-0"
                icon="mdi-fast-forward"
                variant="text"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>


<style scoped>

</style>