import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import PostDetailVue from '@/views/PostDetail.vue';
import PostWriteVue from '@/views/PostWrite.vue';

const routes = [
	{
		path: '/:nav*',
		name: 'main',
		component: Main,
	},
	{
		path: '/:nav+/:id',
		name: 'detail',
		component: PostDetailVue,
	},
	{
		path: '/:nav/write',
		name: 'write',
		component: PostWriteVue,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
