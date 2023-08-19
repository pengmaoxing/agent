import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/modules/layout/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      // webpack动态import语法
      component: () => import('@/modules/login')
    },
    {
      path: '/fogot',
      name: '找回密码',
      // webpack动态import语法
      component: () => import('@/modules/fogot')
    },
    {
      path: '/regagent',
      name: '邀请注册',
      // webpack动态import语法
      component: () => import('@/modules/register/views/reg')
    },
    {
      path: '/',
      component: layout,
      redirect: '/index',
      children: [
        {
          name: '首页',
          path: 'index',
          component: () => import('@/modules/index/index')
        }
      ]
    },
    {
      path: '/merchant/public/views',
      component: layout,
      redirect: '/merchant/public/views/details',
      children: [
        {
          name: '详情',
          path: 'details',
          component: () => import('@/modules/merchant/public/views/details')
        }
      ]
    },
    {
      //
      path: '/operator/views',
      component: layout,
      redirect: '/operator/views/operaDetail',
      children: [
        {
          name: '详情',
          path: 'operaDetail',
          // 实际跳转页面地址
          component: () => import('@/modules/operator/views/operaDetail')
        }
      ]
    },
    {
      //
      path: '/distribute/agent/views',
      component: layout,
      redirect: '/distribute/agent/views/distributeDetail',
      children: [
        {
          name: '详情',
          path: 'distributeDetail',
          // 实际跳转页面地址
          component: () => import('@/modules/distribute/agent/views/distributeDetail')
        }
      ]
    },
    {
      //
      path: '/distribute/top/views',
      component: layout,
      redirect: '/distribute/top/views/distributeDetail',
      children: [
        {
          name: '详情',
          path: 'distributeDetail',
          // 实际跳转页面地址
          component: () => import('@/modules/distribute/top/views/distributeDetail')
        }
      ]
    },
    {
      //
      path: '/subordinate/public/detail',
      component: layout,
      redirect: '/subordinate/public/detail/subDetail',
      children: [
        {
          name: '详情',
          path: 'subDetail',
          // 实际跳转页面地址
          component: () => import('@/modules//subordinate/public/detail/subDetail')
        }
      ]
    },
    {
      //
      path: '/fuiouTest',
      component: () => import('@/modules/fuiou')
    },

    {path: '/404', name: '404', component: () => import('@/modules/404')}
  ]
})
