<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="white--text">{{ title }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <!-- Loop to create six MusicCard components -->
      <v-col v-for="(item, index) in list" :key="`card-${index}`" cols="12" sm="4" md="2">
        <MusicCard :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import MusicCard from "@/components/MusicCard.vue";
import { queryAlbumsApi } from '@/api/album'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  }
})

const list = ref([])

onMounted(() => {
  queryAlbumsApi().then(res => {
    console.log(res)
    list.value = res.data || []
  })
})

</script>

<style scoped>
.white--text {
  color: white;
}

/* Adjust the card spacing */
.v-col {
  padding: 4px;
}

</style>
