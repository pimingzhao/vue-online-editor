/*
 * @Author: pimzh
 * @Date: 2021-03-09 16:01:01
 * @LastEditTime: 2021-03-11 14:06:16
 * @LastEditors: pimzh
 * @Description:
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": 0,
    "no-debugger": 0,
    "prefer-const": [
      2,
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false
      }
    ],
    "no-var": 2,
    "no-unused-vars": 0,
    "no-use-v-if-with-v-for": 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    eqeqeq: [2, "always"]
  }
};
