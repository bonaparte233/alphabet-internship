<template>
  <div>
    <v-toolbar
        dark
        color=#232323
    >
      <!-- Title -->
      <v-toolbar-title>Music</v-toolbar-title>


      <router-link :to="{ path: '/', name: 'home' }" tag="span">
        <v-btn text>
          <span :class="{'text-color': true, 'active': route.name === 'home'}">Home</span>
        </v-btn>
      </router-link>

      <router-link to="/explore" tag="span">
        <v-btn text>
          <span :class="{'text-color': true, 'active': route.name === 'explore'}">Explore</span>
        </v-btn>
      </router-link>

      <router-link to="/library" tag="span">
        <v-btn text>
          <span :class="{'text-color': true, 'active': route.name === 'library'}">Library</span>
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <!-- User Avatar -->
      <v-btn icon @click="userLoggedIn ? showUserProfile() : $router.push('/login')">
        <v-avatar>
          <img v-if="userLoggedIn" :src="userAvatar" alt="User's Profile Photo"/>
          <MingcuteUser4Line />
        </v-avatar>
      </v-btn>
      <span v-if="userLoggedIn">{{ userId }}</span>
    </v-toolbar>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import MingcuteUser4Line from "@/components/MingcuteUser4Line.vue";


export default {
  name: 'Header',
  components: {MingcuteUser4Line},
  setup() {
    const userLoggedIn = ref(false); // Reactive variable to track login state
    const userId = ref(''); // Reactive variable to store user ID
    const userAvatar = ref(''); // Reactive variable to store user avatar URL
    const route = useRoute();

    function showUserProfile() {
    }


    return {
      userLoggedIn,
      userId,
      userAvatar,
      showUserProfile,
      route
    };
  }
};
</script>

<style scoped>
.text-color {
  color: #6e6e6e;
  transition: color 1s ease;
}

.text-color:hover {
  color: #f0f0f0;
}

.active {
  color: #f0f0f0;
}

</style>