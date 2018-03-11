import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const asyncRouterMap = [
  {
    path: '/manager',
    component: Layout,
    redirect: '/manager/user',
    name: 'Manager',
    meta: { title: '管理', icon: 'example', role: [{ 'authority': 'admin' }] },
    children: [
      {
        path: 'list',
        name: 'list',
        component: _import('manager/user/list/index'),
        meta: { title: '用户列表', icon: 'form' }
      },
      {
        path: './allcomments',
        name: './allcomments',
        component: _import('manager/allcomments/index'),
        meta: { title: '评论列表', icon: 'form' }
      },
      {
        path: './check',
        name: './check',
        component: _import('manager/check/index'),
        meta: { title: '审核列表', icon: 'form' }
      },
      {
        path: './report',
        name: './report',
        component: _import('manager/report/index'),
        meta: { title: '举报列表', icon: 'form' }
      }
    ]
  }

]
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/index/info',
    name: 'Info',
    meta: { title: '个人信息', icon: 'example' },
    children: [
      {
        path: 'info',
        name: 'Info',
        component: _import('index/info/index'),
        meta: { title: '个人信息', icon: 'table' }
      }
    ]
  },

  {
    path: '/comments',
    component: Layout,
    redirect: '/comments/receive',
    name: 'Comments',
    meta: { title: '我的评论', icon: 'example' },
    children: [
      {
        path: 'receive',
        name: 'Receive',
        component: _import('comments/receive/index'),
        meta: { title: '我的评论', icon: 'form' }
      },
      {
        path: 'replied',
        name: 'Replied',
        component: _import('comments/replied/index'),
        meta: { title: '我的回复', icon: 'form' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'Article',
    meta: { title: '我的文章', icon: 'example' },
    children: [
      {
        path: 'publish',
        name: 'Publish',
        component: _import('article/publish/index'),
        meta: { title: '发表文章', icon: 'form' }
      },
      {
        path: 'list',
        name: 'List',
        component: _import('article/list/index'),
        meta: { title: '文章列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/manager',
    component: Layout,
    redirect: '/manager/user',
    name: 'Manager',
    meta: { title: '管理', icon: 'example', role: [{ 'authority': 'admin' }] },
    children: [
      {
        path: 'list',
        name: 'list',
        component: _import('manager/user/list/index'),
        meta: { title: '用户列表', icon: 'form' }
      },
      {
        path: './allcomments',
        name: './allcomments',
        component: _import('manager/allcomments/index'),
        meta: { title: '评论列表', icon: 'form' }
      },
      {
        path: './check',
        name: './check',
        component: _import('manager/check/index'),
        meta: { title: '审核列表', icon: 'form' }
      },
      {
        path: './report',
        name: './report',
        component: _import('manager/report/index'),
        meta: { title: '举报列表', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

