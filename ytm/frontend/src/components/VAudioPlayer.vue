script>
import {useDisplay} from "vuetify";

export default {
  methods: {useDisplay},
  components: {
    VAudioPlayer: () => import("@woodydark/vuetify-audio-player"),
  }
}
</script>

<template>
  <v-audio-player
      src="http://www.example.com/your_music.ogg"
      track-title="The Walker"
      track-subtitle="Best of Electro Swing"
      allow-previous
      allow-next
      :compact="useDisplay().smAndDown"
      :autoplay="false"
      album-art="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      @next-audio="nextSrc()"
      @previous-audio="prevSrc()"
      prev-track-icon="mdi-skip-previous"
      next-track-icon="mdi-skip-next"
      back-forward-icon="mdi-rewind-5"
      fast-forward-icon="fast-forward-5"
      play-icon="mdi-play"
      pause-icon="mdi-pause"
      mute-volume-icon="mdi-volume-off"
      low-volume-icon="mdi-volume-low"
      medium-volume-icon="mdi-volume-medium"
      high-volume-icon="mdi-volume-high"
  ></v-audio-player>
</template>

<style scoped>

</style>