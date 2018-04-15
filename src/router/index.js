import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login')
const AlbumPage = () => import('@/components/AlbumPage')
const Profile = () => import('@/components/Profile')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    { path: '/albums/:id',
      name: "AlbumPage",  
      component: AlbumPage
    }
  ]
})
