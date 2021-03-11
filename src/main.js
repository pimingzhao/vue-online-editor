/*
 * @Author: pimzh
 * @Date: 2021-03-09 10:42:51
 * @LastEditTime: 2021-03-10 11:12:10
 * @LastEditors: pimzh
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import viewDesign from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(viewDesign);

import eleUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(eleUI);

import "./styles/index.css";
import "./components";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
