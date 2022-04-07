import Vue from 'vue'
import Vuex from 'vuex'
import Setting from './Setting/index'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting
  },
  state: {
    infoForms: [
      {
        title: '',
        subcategory_id: null,
        gender_id: null,
        age_range_id: null,
        image_mobile: null,
        image_poster: null
      }
    ]
  },
  mutations: {
    UPDATE_INFO_FORMS: (state, form, index) => {
      state.infoForms[index] = form
    }
  },
  actions: {
    updateInfoForms: ({ commit }, form, index) => {
      commit('UPDATE_INFO_FORMS', form, index)
    }
  },
  getters: {
  },
  strict: debug
})
