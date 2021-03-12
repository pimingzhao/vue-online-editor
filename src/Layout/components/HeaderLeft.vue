<!--
 * @Author: pimzh
 * @Date: 2021-03-12 16:47:15
 * @LastEditTime: 2021-03-12 17:35:44
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <div class="flex items-center">
    <div class="layout-lg flex items-center text-primary">
      <Icon class="vertical-mid" size="30" type="logo-codepen" />
      <span class="text-big font-bold logo-title">vue online editor</span>
    </div>
    <ul class="flex items-center btns text-md">
      <template v-for="item in btns">
        <Upload
          v-if="item.type && item.type === 'upload'"
          :key="item.title"
          class="btn"
          action="//"
          accept=".vue"
          :format="['.vue']"
          :show-upload-list="false"
          :before-upload="
            (file, files) => {
              handleBeforeUpload(item.title, file, files);
            }
          "
        >
          <Button type="text" size="large" :icon="item.icon">
            {{ item.title }}
          </Button>
        </Upload>
        <Button
          :key="item.title"
          class="btn"
          v-else
          type="text"
          size="large"
          @click="item.event"
          :icon="item.icon"
        >
          {{ item.title }}
        </Button>
      </template>
    </ul>
    <!-- ModalExplore -->
    <modal-explore ref="modalExplore" @on-ok="exploredCode" />
  </div>
</template>

<script>
import ModalExplore from "./ModalExplore";

export default {
  name: "header-left",
  components: {
    ModalExplore
  },
  data() {
    return {
      btns: [
        {
          title: "运行",
          icon: "ios-play-outline",
          event: this.runCode
        },
        {
          title: "重置",
          icon: "ios-refresh",
          event: this.resetCode
        },
        {
          title: "复制",
          icon: "ios-copy-outline",
          event: this.copyCode
        },
        {
          title: "导入",
          icon: "ios-cloud-upload-outline",
          type: "upload",
          event: this.importCode
        },
        {
          title: "导出",
          icon: "ios-cloud-download-outline",
          event: () => this.$refs["modalExplore"].open()
        }
      ]
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
      const input = document.createElement("textarea");
      document.body.appendChild(input);
      input.value = code;
      input.style.position = "absolute";
      input.style.zIndex = -999;
      input.select();
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$Message.success("复制成功！");
      document.body.removeChild(input);
    },
    handleBeforeUpload(title, file, files) {
      if (title === "导入") {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8"); //读取文件
        const _this = this;
        reader.onload = function(evt) {
          _this.$store.dispatch("uploadCode", evt.target.result);
        };
      }
      return false;
    },
    importCode() {},
    async exploredCode({ name }) {
      const code = await this.$store.dispatch("doCopy");
      const link = document.createElement("a");
      const blob = new Blob([code]);
      link.href = window.URL.createObjectURL(blob);
      link.download = `${name}.vue`;
      link.click();
    }
  }
};
</script>

<style scoped>
.layout-lg {
  padding: 0 30px;
}
.logo-title {
  margin-left: 5px;
}
.btn {
  margin-left: 10px;
}
</style>
