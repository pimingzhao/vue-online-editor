<!--
 * @Author: pimzh
 * @Date: 2021-03-09 11:05:29
 * @LastEditTime: 2021-03-11 14:08:05
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <Layout class="flex flex-col">
    <Header class="header">
      <Menu
        class="h-full flex justify-between"
        mode="horizontal"
        theme="light"
        :active-name="environment"
      >
        <div class="layout-lg flex items-center text-primary">
          <Icon class="vertical-mid" size="30" type="logo-codepen" />
          <span class="text-big font-bold logo-title">vue online editor</span>
        </div>
        <div class="llayout-box">
          <MenuItem
            :name="item.to.name"
            v-for="item in menuList"
            :key="item.title"
            :to="item.to"
          >
            <Icon :type="icons[item.icon]"></Icon>
            {{ item.title }}
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Layout class="flex-1 flex">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <sider-menu :class="menuitemClasses" />
      </Sider>
      <Layout class="flex-1 flex flex-col">
        <Content class="flex-1 overflow-y-auto">
          <router-view class="w-full h-full container" />
        </Content>
        <div class="footer text-center">2021 &copy; copyright by pimzh</div>
      </Layout>
    </Layout>
  </Layout>
</template>

<script>
import { mapState } from "vuex";
import SiderMenu from "./components/SiderMenu.vue";

export default {
  name: "layout",
  components: {
    SiderMenu
  },
  data() {
    return {
      isCollapsed: false,
      menuList: [
        {
          title: "View Design",
          to: {
            name: "view-design"
          },
          icon: "ViewDesign"
        },
        {
          title: "Element UI",
          to: {
            name: "element-ui"
          },
          icon: "ElementUI"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      icons: state => state.icons
    }),
    environment() {
      return this.$route.name;
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  }
};
</script>

<style scoped>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.header {
  padding: 0;
}
.layout-lg {
  padding: 0 30px;
}
.logo-title {
  margin-left: 5px;
}
.llayout-box {
  padding-right: 30px;
}
.footer {
  height: 50px;
  line-height: 50px;
}
.container {
  padding: 15px 20px;
}
.layout {
  border: none;
}
</style>
