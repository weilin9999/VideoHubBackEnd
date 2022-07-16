import { createRouter, createWebHistory, RouteRecordRaw, beforEach } from 'vue-router';
import VueCookies from 'vue-cookies';
import login from '@/view/login/login.vue';
import admin from '@/view/AdminApp.vue';
import dashboard from '@/view/dashboard/dashboard.vue';
import userlist from '@/view/userlist/userlist.vue';
import videolist from '@/view/videolist/videolist.vue';
import classlist from '@/view/classlist/classlist.vue';
import filelist from '@/view/filelist/filelist.vue';
import photolist from '@/view/photolist/photolist.vue';

const routes: Array<RouteRecordRaw> = [
	{ path: '/login', name: 'login', component: login },

	{ path: '/admin', name: 'admin', component: admin,
		children: [
			{ path: 'dashboard', name: 'dashboard', component: dashboard },
			{ path: 'user/list', name: 'userlist', component: userlist },
			{ path: 'video/list', name: 'videolist', component: videolist },
			{ path: 'class/list', name: 'classlist', component: classlist },
			{ path: 'file/list', name: 'filelist', component: filelist },
			{ path: 'photo/list', name: 'photolist', component: photolist },
		]
	},
	{ path: '/:pathMatch(.*)' , name: '404', redirect: '/login' },
 ];
 
const router = createRouter({
   history: createWebHistory(),
   routes
})

router.beforeEach((to, from, next) => {
	const origin: string | null = VueCookies.get('origin');
	if(!origin && to.path!=='/login'){
		document.title= 'VideoHub 后台登录 ~'
		next('/login')
	}else{
		next()
	}
})


export default router
 