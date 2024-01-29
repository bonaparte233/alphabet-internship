<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>{{ album.title }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    pid: String
  },
  data() {
    return {
      album: {
      }
    };
  }
};
</script>

<style>

</style>
