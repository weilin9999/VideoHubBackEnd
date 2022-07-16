import { defineStore } from 'pinia';

export const Application = defineStore('Application',{
   state: () => {
       return {
            showBox: false,
            menu: [
                {
                    path: '/admin/dashboard',
                    name: '控制台',
                    icon: 'iconfont icon-igw-f-dashboard'
                },
                {
                    path: '/admin/video/list',
                    name: '视频管理',
                    icon: 'iconfont icon-shipinxinxi'
                },
                {
                    path: '/admin/photo/list',
                    name: '图片管理',
                    icon: 'iconfont icon-duosucai'
                },
                {
                    path: '/admin/class/list',
                    name: '分类管理',
                    icon: 'iconfont icon-guanli'
                },
                {
                    path: '/admin/user/list',
                    name: '用户管理',
                    icon: 'iconfont icon-yonghuguanli'
                },
                {
                    path: '/admin/file/list',
                    name: '文件列表',
                    icon: 'iconfont icon-liebiao1'
                }
            ]
        };
    },
   actions: {

    },
   getters: {

    }
})