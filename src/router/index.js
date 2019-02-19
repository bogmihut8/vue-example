import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login')
const AlbumPage = () => import('@/components/AlbumPage')
const Profile = () => import('@/components/Profile')
const AdminPage = () => import('@/components/AdminPage')
const PostsPage = () => import('@/components/PostsPage')

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
    },
    { path: '/admin',
      name: "AdminPage",  
      component: AdminPage
    }
    ,
    { path: '/posts',
      name: "PostsPage",  
      component: PostsPage
    }
  ]
})
