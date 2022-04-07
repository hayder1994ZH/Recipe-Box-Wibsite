import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
/* Layouts */
const VerticleLayout = () => import('../layouts/VerticleLayout')
/* Dashboards View */
const Dashboard1 = () => import('../views/Dashboards/Dashboard1')
//Clients route
const ProductsClient = () => import('../views/Clients/Products')
const ProductClient = () => import('../views/Clients/Product')
//end Clients Route
function parseJwt (token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
};

Vue.use(VueRouter)
var Url = 'http://www.recipe-api.g4t.tech/api/v1/'

axios.interceptors.request.use(
  config => {
    config.baseURL = Url
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    // do something with the response data
    // console.log('Response was received from interseptor')
    return response
  },
  error => {
    // handle the response error
    return Promise.reject(error)
  }
)
const childRoutes = (prop) => [
  //clients
  {
    path: '',
    name: prop + '.client.products',
    meta: { auth: false, name: 'ProductsClient' },
    component: ProductsClient
  },
  {
    path: 'product/:id',
    name: prop + '.client.product',
    meta: { auth: false, name: 'ProductClient' },
    component: ProductClient
  }
  //end clients
]

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: VerticleLayout,
    meta: { auth: true },
    children: childRoutes('dashboard')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

//check auth
router.beforeEach((to, from, next) => {
  axios.get('profile/user').then((res) => {
    localStorage.setItem('user', JSON.stringify(res.data))
  }).catch(() => {
    // router.push({ name: 'auth1.sign-in1' })
  })
  const publicPages = ['/auth/sign-in1', '/auth/sign-up1']
  if (publicPages.includes(to.path)) {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (to.meta.auth) {
    if (authRequired && loggedIn === null) {
      // return next('/auth/sign-in1')
    } else if (to.name === 'dashboard') {
      // return next('/home-1')
    }
  }
  next()
})

export default router
