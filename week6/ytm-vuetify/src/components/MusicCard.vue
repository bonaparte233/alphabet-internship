<script>
export default {
  computed: {
    display () {
      return this.$vuetify.display
    },
  },
}
</script>

<template>
  <v-bottom-sheet inset>
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-card
            class="mx-auto"
            height="200"
            image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            max-width="200"
            theme="dark"
            title="Music Title"
            v-bind="props"
        ></v-card>
      </div>

    </template>

    <v-sheet>
      <v-progress-linear model-value="50"></v-progress-linear>

      <v-list>
        <v-list-item>
          <v-list-item-title>Music title</v-list-item-title>

          <v-list-item-subtitle>Author</v-list-item-subtitle>

          <template v-slot:append>
            <v-btn
                icon="mdi-rewind"
                variant="text"
            ></v-btn>

            <v-btn
                :class="{ 'mx-5': display.mdAndUp.value }"
                icon="mdi-pause"
                variant="text"
            ></v-btn>

            <v-btn
                :class="{ 'me-3': display.mdAndUp.value }"
                class="ms-0"
                icon="mdi-fast-forward"
                variant="text"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>


<style scoped>

</style>