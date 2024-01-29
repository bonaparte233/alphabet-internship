<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="track in libraryTracks" :key="track.title">
        <v-card>
          <v-card-title>{{ track.title }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      libraryTracks: [
      ]
    };
  }
};
</script>

<style>

</style>
