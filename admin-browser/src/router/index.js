import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/system',
    component: Layout,
    meta: { perm:'m:sys', title: '系统管理', icon: 'chart' },
    children: [
      {
        path: 'user_manage',
        name: 'user_manage',
        component: _import('_system/user/index'),
        meta: { perm: 'm:sys:user', title: '用户管理', icon: 'chart', noCache: true }
      },
      {
        path: 'role_manage',
        name: 'role_manage',
        component: _import('_system/role/index'),
        meta: { perm: 'm:sys:role', title: '角色管理', icon: 'chart', noCache: true },
      },
      {
        hidden: true,
        path: 'role_manage/:roleId/assign_perm',
        name: 'role_manage_assign_perm',
        component: _import('_system/role/assign_perm'),
        meta: { hiddenTag: true , title: '角色授权'},
      },
      {
        path: 'perm_manage',
        name: 'perm_manage',
        component: _import('_system/perm/index'),
        meta: { perm: 'm:sys:perm', title: '权限管理', icon: 'chart', noCache: true }

      },
    ]
  },
  {
    path: '/cus_manage',
    component: Layout,
    children: [{
      path: 'cus_manage',
      name: 'cus_manage',
      component: _import('customer/index'),
      meta: { perm:'m:sys:customer', title: '分享足迹用户管理', icon: 'icon' }
    }]
  },


  {
    path: '/menu2',
    component: Layout,
    children: [{
      path: 'index',
      name: 'menu2',
      component: _import('menu/menu2'),
      meta: { perm:'m:menu2', title: '区域维护', icon: 'icon' }
    }]
  },

  {
    path: '/contentOpretion',
    component: Layout,
    meta: {
      perm:'m:contentOpretion',
      title: '内容运营',
      icon: 'chart'
    },
    children: [
      { path: 'subject', component: _import('contentOpretion/subject'), name: 'subject', meta: { perm:'m:contentOpretion:subject', title: '主题管理', icon: 'chart', noCache: true }},
      { path: 'content', component: _import('contentOpretion/content'), name: 'content', meta: { perm:'m:contentOpretion:content', title: '内容审核', icon: 'chart', noCache: true }},
      { path: 'viewspot', component: _import('contentOpretion/viewSpot'), name: 'viewspot', meta: { perm:'m:contentOpretion:viewSpot', title: '景点录入', icon: 'chart', noCache: true }},
      // 隐藏页面1(内容评论)
      {
        hidden: true,
        path: 'content/:content_id/comment',
        name: 'content_comment',
        component: _import('contentOpretion/contentComment'),
        meta: { hiddenTag: true , title: '内容评论'},
      },
      // 隐藏内容2（景点点评）
      {
        hidden: true,
        path: 'viewspot/:spot_id/publicPraise',
        name: 'viewspot_publicPraise',
        component: _import('contentOpretion/spotComment'),
        meta: { hiddenTag: true , title: '景点点评'},
      },
    ]
  },
  {
    path: '/comments',
    component: Layout,
    children: [{
      path: 'comments',
      name: 'comments',
      component: _import('comments/index'),
      meta: { perm:'m:sys:comment', title: '评论分析', icon: 'icon' }
    }]
  },
  {
    path: '/publicPraiseView',
    component: Layout,
    children: [{
      path: 'publicPraiseView',
      name: 'publicPraiseView',
      component: _import('publicPraiseView/index'),
      meta: { perm:'m:sys:publicPraiseView', title: '口碑评价体系', icon: 'icon' }
    }]
  },
  {
    path: '/webSet',
    component: Layout,
    meta: {
      perm:'m:webset',
      title: '网站管理',
      icon: 'chart'
    },
    children: [
      { path: 'webset', component: _import('webSet/webSet'), name: 'webset', meta: { perm:'m:webset:set', title: '系统信息配置', icon: 'chart', noCache: true }}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
