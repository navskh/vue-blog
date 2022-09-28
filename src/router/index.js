import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import PostDetailVue from '@/views/PostDetail.vue';
import PostWriteVue from '@/views/PostWrite.vue';
import PostEditVue from '@/views/PostEdit.vue';

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
	{
		path: '/:nav/write/:id',
		name: 'edit',
		component: PostEditVue,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
