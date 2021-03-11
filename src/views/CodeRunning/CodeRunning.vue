<!--
 * @Author: pimzh
 * @Date: 2021-03-09 11:10:32
 * @LastEditTime: 2021-03-11 10:17:16
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <div class="flex flex-col">
    <ul class="flex justify-center btns">
      <li class="btn" v-for="item in btns" :key="item.title">
        <Button type="primary" @click="item.event">{{ item.title }}</Button>
      </li>
    </ul>
    <Split class="flex-1" :min="0.3" v-model="split">
      <router-view slot="left" class="h-full" />
      <code-display slot="right" class="h-full code-run" />
    </Split>
  </div>
</template>

<script>
import { Button, Split } from "view-design";

export default {
  name: "code-running",
  components: {
    Button,
    Split
  },
  data() {
    return {
      btns: [
        {
          title: "运行",
          event: this.runCode
        },
        {
          title: "重置",
          event: this.resetCode
        },
        {
          title: "复制",
          event: this.copyCode
        }
      ],
      split: 0.5
    };
  },
  methods: {
    runCode() {
      this.$store.dispatch("doRun");
    },
    resetCode() {
      this.$store.dispatch("doReset");
    },
    async copyCode() {
      const code = await this.$store.dispatch("doCopy");
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.type = "text";
      input.value = code;
      input.style.position = "absolute";
      input.style.zIndex = -999;
      input.select();
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$Message.success("复制成功！");
      document.body.removeChild(input);
    }
  }
};
</script>

<style scoped>
.btns {
  margin-bottom: 15px;
}
.btn:not(:last-child) {
  margin-right: 8px;
}
.code-run {
  padding-left: 15px;
}
</style>
