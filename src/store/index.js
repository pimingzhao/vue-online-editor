/*
 * @Author: pimzh
 * @Date: 2021-03-09 15:36:48
 * @LastEditTime: 2021-03-11 10:14:07
 * @LastEditors: pimzh
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";

import { getMenu } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    code: "",
    doRun: false,
    doReset: false,
    doCopy: false,
    environment: "", // 组件环境：ele/iview
    icons: {
      ViewDesign: "logo-buffer",
      ElementUI: "logo-euro"
    }, // 组件环境对应的图标
    iconType: "",
    menu: [], // 侧边栏
    seletedMenu: "" // 选中的侧边栏
  },

  mutations: {
    SET_RUN(state, isRun) {
      state.doRun = isRun;
    },
    SET_RESET(state, isReset) {
      state.doReset = isReset;
    },
    SET_CODE(state, code) {
      state.code = code;
    },
    SET_COPY(state, doCopy) {
      state.doCopy = doCopy;
    },
    SET_SELECTED_MENU(state, seletedMenu) {
      state.seletedMenu = seletedMenu;
      router.push({
        name: router.currentRoute.name,
        query: {
          template: seletedMenu
        }
      })
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
    SET_ENVIROMENT(state, environment) {
      state.environment = environment;
      state.iconType = state.icons[environment];
    }
  },

  actions: {
    async doRun({ commit }) {
      commit("SET_RUN", true);
      await Vue.nextTick();
      commit("SET_RUN", false);
    },
    async doReset({ commit }) {
      commit("SET_RESET", true);
      await Vue.nextTick();
      commit("SET_RESET", false);
    },
    async doCopy({ commit, state }) {
      commit("SET_COPY", true);
      await Vue.nextTick();
      commit("SET_COPY", false);
      return state.code;
    },
    async setMenu({ commit }, name) {
      commit("SET_ENVIROMENT", name);
      const res = await getMenu(name);
      if (res) {
        commit("SET_MENU", res.components);
        !router.currentRoute.query.template && commit("SET_SELECTED_MENU", res.components[0].name);
      }
    }
  }
});
