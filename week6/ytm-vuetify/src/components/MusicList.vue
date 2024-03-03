<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="white--text">{{ title }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <!-- Loop to create six MusicCard components -->
      <v-col v-for="i in 6" :key="`card-${i}`" cols="12" sm="4" md="2">
        <MusicCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MusicCard from "@/components/MusicCard.vue";

export default {
  name: "MusicList",
  components: {
    MusicCard
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.white--text {
  color: white;
}

/* Adjust the card spacing */
.v-col {
  padding: 4px;
}

/* Style your card as needed */
</style>
