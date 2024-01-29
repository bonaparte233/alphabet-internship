import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

// Create the Vue instance
const app = createApp(App);

// Use Vue Router
app.use(router);

// Use Vuetify
app.use(vuetify);

// Mount the app
app.mount('#app');
