<template>
  <div id="app-footer" class="app-footer">
    <div class="container">
      <span class="text-muted">Place sticky footer content here.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.app-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}
.app-footer > .container {
  padding-right: 15px;
  padding-left: 15px;
}
</style>
