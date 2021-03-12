/*
 * @Author: pimzh
 * @Date: 2021-03-12 11:00:49
 * @LastEditTime: 2021-03-12 15:04:28
 * @LastEditors: pimzh
 * @Description: node脚本: 编辑器换肤器，放入 DistCodeEditor 组件同级目录即可执行
 */
const theme = ["darcula.css"];

const fs = require("fs");

let res = fs.readFileSync("./DistCodeEditor.vue", { encoding: "utf-8" });

let i = 0;
const timeout = setInterval(() => {
  res = res.replace(
    /"codemirror\/theme\/[a-z0-9-]+\.css";/,
    `"codemirror/theme/${theme[i]}";`
  );
  res = res.replace(
    /theme: "[a-z0-9-]+",/,
    `theme: "${theme[i].replace(/\.css/, "")}",`
  );
  fs.writeFileSync("./DistCodeEditor.vue", res, { encoding: "utf-8" });
  console.log(theme[i]);
  if (i++ === theme.length - 1) {
    clearInterval(timeout);
  }
}, 3000);
