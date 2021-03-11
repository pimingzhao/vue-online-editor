<!--
 * @Author: pimzh
 * @Date: 2021-03-09 13:57:48
 * @LastEditTime: 2021-03-10 13:21:51
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <code-editor />
</template>

<script>
export default {
  name: "element-ui",
  async created() {
    this.$store.dispatch("setMenu", "ElementUI");
  }
};
</script>
