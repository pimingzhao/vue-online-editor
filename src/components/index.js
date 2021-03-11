/*
 * @Author: pimzh
 * @Date: 2021-03-09 14:35:05
 * @LastEditTime: 2021-03-09 14:36:42
 * @LastEditors: pimzh
 * @Description: 组件自动注册器
 */
import Vue from "vue";

// 检索目录下以 .vue 为结尾的文件
const req = require.context(".", true, /\.vue$/);
req.keys().forEach(fileName => {
  const str = "Dist";
  if (fileName.includes(str)) {
    const componentConfig = req(fileName);
    // 如果没有提供 name 选项，则使用文件名
    const name =
      fileName.name ||
      fileName.replace(/^\.\/(.*\/)?/, "").replace(/\.vue$/, "");
    // 注册以 Dist 开头的组件
    /^Dist/.test(name) &&
      Vue.component(
        name.replace(str, ""),
        componentConfig.default || componentConfig
      );
  }
});
