/*
 * @Author: pimzh
 * @Date: 2021-03-09 16:55:05
 * @LastEditTime: 2021-04-21 14:24:16
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
    return localStorage.getItem(key);
  },
  set: function(key, val) {
    localStorage.setItem(key, val);
  },
  remove: function(key) {
    localStorage.removeItem(key);
  },
  clear: function() {
    localStorage.clear();
  }
};
