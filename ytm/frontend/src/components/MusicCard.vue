<script setup>
import { ref, computed, getCurrentInstance, defineProps, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = '/api'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers['Authorization'] = `Bear ${token}`
}

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
</template>


<style scoped>

</style>