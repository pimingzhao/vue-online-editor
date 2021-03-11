/*
 * @Author: pimzh
 * @Date: 2021-03-10 11:35:56
 * @LastEditTime: 2021-03-10 17:43:57
 * @LastEditors: pimzh
 * @Description:
 */
import axios from "axios";

// const http = axios.create({
//   baseURL:
// })
const GET = async (url, name, config = {}) => {
  try {
    const res = (await axios.get(url, config)).data;
    if (url.endsWith(".js")) {
      return new Function(res)();
    }
    if (url.endsWith(".json") && typeof res === "string") {
      return JSON.parse(res);
    }
    return res;
  } catch (error) {
    console.error(`请求--${name}--失败`, error);
    throw error;
  }
};

export const getMenu = async name => {
  try {
    return await GET(`static/${name}/menu.json`, "获取菜单栏");
  } catch {
    return null;
  }
};

export const getTemplate = async (name, codeName) => {
  try {
    return await GET(`static/${name}/${codeName}.js`, "获取Layout");
  } catch {
    return null;
  }
};
