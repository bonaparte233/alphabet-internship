<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="item in items" :key="item.title">
        <v-card>
          <v-card-title>{{ item.title }}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
      ]
    };
  }
};
</script>

<style>

</style>
