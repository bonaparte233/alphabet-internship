<template>
  <v-card class="playlist-card" color="grey darken-4" dark @click="this.$router.push({ name: 'playlist', params: { pid: this.id } })">
    <v-img
        height="200"
        width="200"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
    >
    </v-img>
    <v-card-text>
    <div class="text-h7">{{ title }}</div>
      <div class="text-subtitle-3">{{ subtitle }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PlaylistCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  },

};

</script>

<style scoped>
.playlist-card {
  max-width: 200px;
}

.v-card-text {
  background-color: #131313;
  position: relative;
}
.text-h7 {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.5px;
}
.text-subtitle-3 {
  color: rgba(255, 255, 255, 0.7);
}


</style>
