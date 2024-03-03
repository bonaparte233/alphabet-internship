<script setup>
import Header from '../components/Header.vue'
import MusicList from "@/components/MusicList.vue";
import Trending from "@/components/Trending.vue";
</script>

<template>
  <v-app>
    <Header />

    <v-main style="background-color: #131313;">
      <v-spacer style="height: 50px;"></v-spacer>
      <MusicList title="New albums and singles" />
      <v-spacer style="height: 100px;"></v-spacer>
      <Trending />
    </v-main>


    <v-footer style="background-color: #131313;">
    </v-footer>
  </v-app>
</template>

<style scoped>



</style>