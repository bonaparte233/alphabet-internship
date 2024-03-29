import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ExploreView from '../views/ExploreView.vue'
import LibraryView from '../views/LibraryView.vue'
import PlaylistView from '../views/PlaylistView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView
    },
    {
      path: '/playlist/<pid>',
      name: '/playlist/<pid>',
      component: PlaylistView,
      prop: true
    },
    {
      path: '/album/<pid>',
      name: '/album/<pid>',
      component: PlaylistView,
      prop: true
    }
  ]
})

export default router
