/*
 * @Author: pimzh
 * @Date: 2021-03-09 16:55:05
 * @LastEditTime: 2021-04-22 09:32:41
 * @LastEditors: pimzh
 * @Description:
 */
/**
 * @description: 生成24位的uuid
 * @param {type}
 * @return {type}
 */
export const uuid = () => {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 24; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

  const uuid = s.join("");

  return uuid;
};

export const localStore = {
  get: function(key) {
    const val = localStorage.getItem(key);
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  },
  set: function(key, val) {
    if (typeof val === "string") {
      localStorage.setItem(key, val);
    } else {
      localStorage.setItem(key, JSON.stringify(val));
    }
  },
  remove: function(key) {
    localStorage.removeItem(key);
  },
  clear: function() {
    localStorage.clear();
  }
};
// 防抖函数
export const debounce = function(fn, wait = 300) {
  let time;
  return function() {
    const args = arguments;
    const _this = this;
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fn.apply(_this, args);
      clearTimeout(time);
      time = null;
    }, wait);
  };
};
