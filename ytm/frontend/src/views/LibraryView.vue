<script setup>
import Header from '../components/Header.vue'
import Card from "@/components/PlaylistCard.vue";

</script>

<template>
  <v-app>
    <Header />

    <v-main class="main-background">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="2" v-for="n in 6" :key="n">
            <router-link :to="`/playlist`">
              <Card :id="'playlist' + n" :title="'Playlist' + n" subtitle="Playlist • Steve • 0 tracks"/>
            </router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="2" v-for="n in 6" :key="n">
            <router-link :to="`/album/${n}`">
              <Card :id="'album' + n" :title="'Album' + n" subtitle="Album • Author • 0 tracks"/>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-app>
</template>

<style scoped>
.main-background {
  background-color: #131313;
}

/* Adjust the padding inside the container */
.v-container {
  padding-bottom: 2rem;
}

/* Adjust the spacing between the cards */
.v-col {
  padding: 1rem;
}
</style>
