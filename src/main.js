import Vue from 'vue'
import 'mutationobserver-shim'
import './Utils/fliter'
import App from './App.vue'
import router from './router'
import store from './store'
import Raphael from 'raphael/raphael'
import './plugins'
import './registerServiceWorker'
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'
import VueCoreVideoPlayer from 'vue-core-video-player'
import VueJWT from 'vuejs-jwt'
import 'vue-search-select/dist/VueSearchSelect.css'
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);
Vue.use(VueJWT)
Vue.use(VueCoreVideoPlayer)
Vue.use(VueSweetalert2)
Vue.use(VueAxios, axios)

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
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status = '401') {
//       localStorage.clear();
//       router.push({ name: 'Login'})
//     }
//     return Promise.reject(error);
//   }
// )
global.Raphael = Raphael

Vue.config.productionTip = false

let vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
