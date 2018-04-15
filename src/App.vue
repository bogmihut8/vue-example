<template>
  <div id="app">
    <router-view/>
    <!--<app-footer v-if="loggedIn"></app-footer>-->
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
export default {
  name: 'App',
  components: { AppFooter },
  data () {
    return {
      loggedIn: true
    }
  }
}
</script>

<style>
html, body{
  height:100%;
  width:100%;
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width:100%;
  height:100%;
  background: #56CCF2;  /* fallback for old browsers */
}

#app #profile, #app #album-page{
  background: #56CCF2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(#2F80ED, #56CCF2);
  background: -moz-linear-gradient(#2F80ED, #56CCF2);
  background: -o-linear-gradient(#2F80ED, #56CCF2);
  background: linear-gradient(#2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */ /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
