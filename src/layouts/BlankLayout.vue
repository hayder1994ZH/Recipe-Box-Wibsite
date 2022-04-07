<template>
  <div>
    <Loader />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>
<script>
import Loader from '../components/core/loader/NewLoader'
import { core } from '../config/pluginInit'
export default {
  name: 'BlankLayout',
  components: {
    Loader
  },
  mounted () {
    core.mainIndex()
  }
}
</script>
<style>
@import url('../assets/css/custom.css');
.modal-backdrop {
  opacity: 0.5;
}
</style>
