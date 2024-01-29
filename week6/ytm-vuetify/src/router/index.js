import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import ExploreMusic from '../components/ExploreMusic.vue';
import MusicLibrary from '../components/MusicLibrary.vue';
import MusicPlaylist from '../components/MusicPlaylist.vue';
import MusicAlbum from '../components/MusicAlbum.vue';

const routes = [
    {
        path: '/login',
        name: 'UserLogin',
        component: UserLogin
    },
    {
        path: '/explore',
        name: 'ExploreMusic',
        component: ExploreMusic
    },
    {
        path: '/library',
        name: 'MusicLibrary',
        component: MusicLibrary
    },
    {
        path: '/playlist',
        name: 'MusicPlaylist',
        component: MusicPlaylist
    },
    {
        path: '/album',
        name: 'MusicAlbum',
        component: MusicAlbum
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
