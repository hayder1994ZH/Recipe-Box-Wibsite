<template>
  <div class="iq-sidebar">
    <div class="iq-sidebar-logo d-flex justify-content-between">
      <router-link :to="{ name: 'dashboard.home-1' }">
        <!-- <img :src="logo" v-if="onlyLogo" class="img-fluid" alt="logo" /> -->
        <div v-if="onlyLogoText" class="logo-title">
          <span class="text-primary text-uppercase">Recipe Box</span>
        </div>
      </router-link>
      <div class="iq-menu-bt-sidebar" id="fadeshow1">
        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu" @click="miniSidebar">
            <div class="main-circle"><i class="las la-bars"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div id="sidebar-scrollbar">
      <nav class="iq-sidebar-menu" :class="horizontal ? 'd-xl-none' : ''">
        <CollapseMenu
          :items="items"
          :open="true"
          :horizontal="horizontal"
          :sidebarGroupTitle="sidebarGroupTitle"
        />
      </nav>
    </div>
  </div>
  <!-- TOP Nav Bar -->
</template>

<script>
import CollapseMenu from '../menus/CollapseMenu'
import { APPNAME } from '../../../config/pluginInit'
export default {
  name: 'Sidebar',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'dashboard.home-1' }) },
    items: { type: Array },
    logo: {
      type: String,
      default: require('../../../assets/images/logo-full.png')
    },
    horizontal: { type: Boolean },
    toggleButton: { type: Boolean, default: false },
    logoShow: { type: Boolean, default: true },
    onlyLogo: { type: Boolean, default: false },
    onlyLogoText: { type: Boolean, default: true },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  components: {
    CollapseMenu
  },
  mounted () {},
  methods: {
    miniSidebar () {
      this.$emit('toggle')
    }
  },
  data () {
    return {
      appName: APPNAME
    }
  }
}
</script>
<style>
@media only screen and (min-width: 900px) {
    #fadeshow1 {
        display: none;
    }
}
</style>
