<template>
  <div id="app">
    <layout class="layout" />
  </div>
</template>

<script>
import Layout from "./Layout";
export default {
  name: "App",
  components: { Layout }
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
.layout {
  width: 100%;
  height: 100%;
}
</style>
