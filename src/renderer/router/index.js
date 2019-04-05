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
      path: '/animations',
      name: 'animations',
      component: require('@/components/Animation/AnimationsManager').default
    },
    {
      path: '/directors',
      name: 'directors',
      component: require('@/components/Animation/DirectorsManager').default
    },
    {
      path: '/countries',
      name: 'countries',
      component: require('@/components/Animation/CountriesManager').default
    },
    {
      path: '/studios',
      name: 'studios',
      component: require('@/components/Animation/StudiosManager').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
