<script setup>
import Header from '../components/Header.vue'
import MusicList from "@/components/MusicList.vue";
</script>

<template>
  <v-app>
    <Header />

    <v-main style="background-color: #131313;">
      <v-spacer style="height: 50px;"></v-spacer>
      <MusicList title="New releases" />
      <v-spacer style="height: 100px;"></v-spacer>
      <MusicList title="Recommended for you" />
    </v-main>


    <v-footer style="background-color: #131313;">
    </v-footer>
  </v-app>
</template>

<style scoped>



</style>