/*
 * @Author: pimzh
 * @Date: 2021-03-09 15:36:48
 * @LastEditTime: 2021-04-21 14:41:09
 * @LastEditors: pimzh
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";

import { getMenu, getTemplate } from "@/api";

import { localStore } from "@/utils/tool";

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
    menu: [],
    menuMap: null, // 菜单栏选项缓存
    seletedMenu: localStore.get("template"), // 选中的侧边栏
    selectChange: false, // computed函数set在接收到get就会触发更新，用这个属性来阻止
    templateMap: null // 模板缓存
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
      localStore.set("template", seletedMenu);
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
    SET_ENVIROMENT(state, environment) {
      state.environment = environment;
    },
    SET_MENUMAP(state, payload) {
      state.menuMap = Object.assign(state.menuMap || {}, payload);
    },
    SET_TEMPMAP(state, { name, res }) {
      let obj;
      if (!state.templateMap) {
        obj = {};
        obj[state.environment] = {};
      } else if (state.environment in state.templateMap) {
        obj = state.templateMap;
      } else {
        obj = state.templateMap;
        obj[state.environment] = {};
      }
      obj[state.environment][name] = res;
      state.templateMap = obj;
      obj = null;
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
    async setMenu({ state, commit, dispatch }, name) {
      commit("SET_ENVIROMENT", name);
      let res;
      if (state.menuMap && name in state.menuMap) {
        res = state.menuMap[name];
      } else {
        res = await getMenu(name);
        const obj = {};
        obj[name] = res;
        commit("SET_MENUMAP", obj);
      }
      if (res) {
        commit("SET_MENU", res.components);
        const template = localStore.get("template");
        if (template) {
          const canFind = res.components.some(item => item.name === template);
          dispatch(
            "setSelectedMenu",
            canFind ? template : res.components[0].name
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

      let res;
      if (
        state.templateMap &&
        state.environment in state.templateMap &&
        name in state.templateMap[state.environment]
      ) {
        res = state.templateMap[state.environment][name];
      } else {
        res = await getTemplate(state.environment, name);
        commit("SET_TEMPMAP", { name, res });
      }
      commit("SET_CODE", {
        code: res,
        init: true
      });
      await dispatch("doRun");
      commit("SET_SELECTED_CHANGE", false);
    },
    async uploadCode({ commit, dispatch }, code) {
      commit("SET_CODE", code);
      await Vue.nextTick();
      dispatch("doRun");
    }
  },

  getters: {
    iconType: state => state.icons[state.environment]
  }
});
