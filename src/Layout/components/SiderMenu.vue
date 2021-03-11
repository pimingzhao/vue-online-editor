<!--
 * @Author: pimzh
 * @Date: 2021-03-10 17:30:04
 * @LastEditTime: 2021-03-11 09:57:25
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <Menu
    v-if="hasMenuList"
    theme="dark"
    width="auto"
    class="h-full"
    :active-name="seletedMenu"
    :open-names="openNames"
    @on-select="handleSelect"
  >
    <MenuItem v-for="(item, i) in menuList" :key="i" :name="item.name">
      <Icon :type="iconType"></Icon>
      <span>{{ item.title }}</span>
    </MenuItem>
  </Menu>
</template>

<script>
export default {
  name: "sider-menu",
  data() {
    return {
      openNames: []
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menu || [];
    },
    iconType() {
      return this.$store.state.iconType || [];
    },
    hasMenuList() {
      return this.menuList.length !== 0;
    },
    seletedMenu() {
      return this.$route.query.template || "";
    }
  },
  methods: {
    handleSelect(name) {
      // TODO: 页面刷新后state 会更新： fix it
      this.$store.commit("SET_SELECTED_MENU", name);
    }
  }
};
</script>
