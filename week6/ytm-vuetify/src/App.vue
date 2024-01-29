<template>
  <v-app>
    <v-main>
    </v-main>
    <v-footer fixed padless>
      <v-audio-player
          src="http://www.example.com/your_music.ogg"
          track-title="Your Music"
          track-subtitle="Best of Electro Swing"
          allow-previous
          allow-next
          :compact="$vuetify.breakpoint.smAndDown"
          :autoplay="false"
          album-art="https://www.example.com/my-beautiful-art.jpeg"
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
    </v-footer>
  </v-app>
</template>

<script>

import VAudioPlayer from "@woodydark/vuetify-audio-player";

export default {
  components: {
    VAudioPlayer
  },
  data: () => ({
    tracks: [
      {
        title: "Track 1",
        artist: "Artist 1",
        src: "public/sample.mp3",
        cover: "path/to/cover1.jpg"
      },
    ]
  })

};
</script>

<style>

</style>
