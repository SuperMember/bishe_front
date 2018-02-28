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
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'data',
        name: 'Data',
        component: _import('data/index'),
        meta: { title: 'Data', icon: 'data' }
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
        meta: { title: '收到的评论', icon: 'form' }
      },
      {
        path: 'replied',
        name: 'Replied',
        component: _import('comments/replied/index'),
        meta: { title: '已回复的评论', icon: 'form' }
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/added',
    name: 'Article',
    meta: { title: '我的文章', icon: 'example' },
    children: [
      {
        path: 'added',
        name: 'added',
        component: _import('article/added/index'),
        meta: { title: '已发表', icon: 'form' }
      },
      {
        path: 'unpublish',
        name: 'Unpublish',
        component: _import('article/unpublish/index'),
        meta: { title: '未发表', icon: 'form' }
      },
      {
        path: 'publish',
        name: 'Publish',
        component: _import('article/publish/index'),
        meta: { title: '发表文章', icon: 'form' }
      },
      {
        path: 'audit',
        name: 'Audit',
        component: _import('article/audit/index'),
        meta: { title: '审核文章', icon: 'form' }
      }
    ]
  },

  {
    path: '/manager',
    component: Layout,
    redirect: '/manager/user',
    name: 'Manager',
    meta: { title: '管理', icon: 'example' },
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

