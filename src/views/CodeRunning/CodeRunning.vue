<!--
 * @Author: pimzh
 * @Date: 2021-03-09 11:10:32
 * @LastEditTime: 2021-03-12 09:16:38
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <div class="split-wrapper">
    <Split class="w-full h-full" :min="0.3" v-model="split">
      <router-view slot="left" class="h-full" />
      <code-display slot="right" class="h-full code-run" />
    </Split>
  </div>
</template>

<script>
export default {
  name: "code-running",
  data() {
    return {
      split: 0.5
    };
  }
};
</script>

<style scoped>
.split-wrapper {
  padding: 5px;
  background-color: #ffffff;
}
.code-run {
  padding-left: 15px;
}
</style>
