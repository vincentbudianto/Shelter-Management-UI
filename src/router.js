import Vue from 'vue'
import Router from 'vue-router'
import Vuelayers from 'vuelayers'
import 'vuelayers/lib/style.css'

// Page content
import Home from '@/components/Home/Home'
import Dashboard from '@/components/Dashboard/Dashboard'
import Search from '@/components/Search/Search'
import Disaster from '@/components/Disaster/Disaster'
import Shelter from '@/components/Shelter/Shelter'
import ShelterDetails from '@/components/Shelter/ShelterOverview'
import Login from '@/components/Login/Login'
import Logout from '@/components/Logout/Logout'
import Details from '@/components/Details/Details'
import Placement from '@/components/Placement/Placement'
import InputVictim from '@/components/InputVictim/InputVictim'
import Register from '@/components/Register/Register'
import AssignStaff from '@/components/AssignStaff/AssignStaff'

// Fallback page
// import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)
Vue.use(Vuelayers, {
  dataProjection: 'EPSG:4326'
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
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
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
      path: '/shelter/:id',
      name: 'ShelterDetails',
      component: ShelterDetails,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/placement',
      name: 'Placement',
      component: Placement
    },
    {
      path: '/input-victim',
      name: 'Input Victim',
      component: InputVictim
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/assign-staff',
      name: 'Assign Staff',
      component: AssignStaff
    }
  ]
})
