<template>
  <router-view/>
</template>
<script>
import { core } from './config/pluginInit'

export default {
  name: 'App',
  components: {
  },
  mounted () {
    core.mainIndex()
  }, 
  methods: {}
}
</script>
<style lang="scss">
  @import "assets/scss/style.scss";
</style>
