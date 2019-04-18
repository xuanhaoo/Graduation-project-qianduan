import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/view/layout/Layout'

Vue.use(Router)

const router = new Router({
  // base: 'front',  //基础路径
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: '/index'
    },
    {path: '/login', name: 'login', component: () => import('@/view/login/login'), hidden:true},
    {path: '/register', name: 'register', component: () => import('@/view/login/register'), hidden:true},
    {
    	path: '/',
    	name: 'Layout',
    	component: Layout,
    	children: [
    		{
    			path: '/index',
		    	name: 'index',
		    	component: () => import('@/view/web/index')
          // component: _import('./web/index'),
		    	// component: r => require.ensure([], () => r(require('@/view/blog_index')), 'index')
    		},

        // 个人主页
        {
          path: '/userPage',
          name: 'userPage',
          component: () => import('@/view/userPage/index')
        },
        {
          path: '/user_manage/:userid/personInfo',
          name: 'user_manage',
          component: () => import('@/view/userPage/personInfo')
        },
        // 发布内容
        {
          path: '/pubContent',
          name: 'pubContent',
          component: () => import('@/view/userPage/pubContent')
        },

        // 目的地
        {
          path: '/destination',
          name: 'destination',
          component: () => import('@/view/web/destination')
        },
        // 主题社区
        // 1 足迹
        {
          path: '/sharepug',
          name: 'sharepug',
          component: () => import('@/view/web/sharepug')
        },




        // 以下需要删除
        {
          path: '/article/:id',
          name: 'Article',
          component: () => import('@/components/Article/articleInfoItem')
          // props: { default: true, sidebar: false }
        },
        {
          path: '/archiving',
          name: 'Archiving',
          component: () => import('@/view/archiving')
        },
        {
          path: '/links',
          name: 'Links',
          component: () => import('@/view/friend_link')
        },
        {
          path: '/about',
          name: '/About',
          component: () => import('@/view/about')
        },
        {
          path: '/resume',
          name: 'Name',
          component: () => import('@/view/resume')
        }
    	]
    }
  ],

})




export default router
