import Vue from 'vue'
import Router from 'vue-router'
import Vuelayers from 'vuelayers'
import 'vuelayers/lib/style.css'

// Page content
import Home from '@/components/Home/Home'
import Search from '@/components/Search/Search'
import Disaster from '@/components/Disaster/Disaster'
import Shelter from '@/components/Shelter/Shelter'
import Login from '@/components/Login/Login'
import Details from '@/components/Details/Details'

// Fallback page
// import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)
Vue.use(Vuelayers, {
  dataProjection: 'EPSG:4326',
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/disaster',
      name: 'Disaster',
      component: Disaster
    },
    {
      path: '/shelter',
      name: 'Shelter',
      component: Shelter
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    }
  ]
})