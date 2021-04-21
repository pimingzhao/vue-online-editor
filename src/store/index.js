/*
 * @Author: pimzh
 * @Date: 2021-03-09 15:36:48
 * @LastEditTime: 2021-04-21 13:24:28
 * @LastEditors: pimzh
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";

import { getMenu, getTemplate } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    code: "",
    initCode: "",
    doRun: false,
    environment: "", // 组件环境：ele/iview
    icons: {
      ViewDesign: "logo-buffer",
      ElementUI: "logo-euro"
    }, // 组件环境对应的图标
    menu: [], // 侧边栏
    seletedMenu: "", // 选中的侧边栏
    selectChange: false, // computed函数set在接收到get就会触发更新，用这个属性来阻止
    isUpload: false
  },

  mutations: {
    SET_RUN(state, isRun) {
      state.doRun = isRun;
    },
    SET_CODE(state, code) {
      if (code.init) {
        state.initCode = code.code;
        state.code = code.code;
      } else {
        state.code = code;
      }
    },
    SET_SELECTED_CHANGE(state, val) {
      state.selectChange = val;
    },
    SET_SELECTED_MENU(state, seletedMenu) {
      state.seletedMenu = seletedMenu;
      router.push({
        query: {
          template: seletedMenu
        }
      });
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
    SET_ENVIROMENT(state, environment) {
      state.environment = environment;
    },
    SET_UPLOAD(state, isUpload) {
      state.isUpload = isUpload;
    }
  },

  actions: {
    async doRun({ commit }) {
      commit("SET_RUN", true);
      await Vue.nextTick();
      commit("SET_RUN", false);
    },
    async doReset({ state, commit, dispatch }) {
      commit("SET_CODE", state.initCode);
      dispatch("doRun");
    },
    async setMenu({ commit, dispatch }, name) {
      commit("SET_ENVIROMENT", name);
      const res = await getMenu(name);
      if (res) {
        commit("SET_MENU", res.components);
        const query = router.currentRoute.query;
        if (query.template) {
          const canFind = res.components.some(
            item => item.name === query.template
          );
          dispatch(
            "setSelectedMenu",
            canFind ? query.template : res.components[0].name
          );
        } else {
          dispatch("setSelectedMenu", res.components[0].name);
        }
      }
    },
    async setSelectedMenu({ state, commit, dispatch }, name) {
      if (!name) return;
      commit("SET_SELECTED_CHANGE", true);
      commit("SET_SELECTED_MENU", name);

      const res = await getTemplate(state.environment, name);
      commit("SET_CODE", {
        code: res,
        init: true
      });
      await dispatch("doRun");
      commit("SET_SELECTED_CHANGE", false);
    },
    async uploadCode({ commit }, code) {
      commit("SET_CODE", code);
      await Vue.nextTick();
      commit("SET_UPLOAD", true);
      await Vue.nextTick();
      commit("SET_UPLOAD", false);
    }
  },

  getters: {
    iconType: state => state.icons[state.environment]
  }
});
