import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'paca',
      component: require('@/components/Paca').default
    },
    {
      path: '/animation',
      name: 'animation',
      component: require('@/components/Animation/AnimationsManager').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
