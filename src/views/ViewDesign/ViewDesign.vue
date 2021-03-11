<!--
 * @Author: pimzh
 * @Date: 2021-03-09 13:58:58
 * @LastEditTime: 2021-03-10 17:21:57
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <code-editor />
</template>

<script>
export default {
  name: "view-design",
  async created() {
    this.$store.dispatch("setMenu", "ViewDesign");
  }
};
</script>
