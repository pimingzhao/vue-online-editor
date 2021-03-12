<!--
 * @Author: pimzh
 * @Date: 2021-03-09 14:33:29
 * @LastEditTime: 2021-03-12 17:46:46
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <codemirror
    ref="codemirror"
    v-model="code"
    :options="options"
    @ready="onCodeReady"
  />
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
// language
import "codemirror/mode/vue/vue.js";
// theme
import "codemirror/theme/darcula.css";
// autoCloseBrackets
import "codemirror/addon/edit/closebrackets.js";
// matchBrackets
import "codemirror/addon/edit/matchbrackets.js";
// autoCloseTags
import "codemirror/addon/edit/closetag.js";
// foldGutter
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/markdown-fold.js";

// styleActiveLine
import "codemirror/addon/selection/active-line.js";
//hintOptions
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/anyword-hint.js";
import "codemirror/addon/hint/css-hint.js";
// 提供一种非常简单的方式来查询用户的文本输
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
// 用于注释和取消注释代码的插件
import "codemirror/addon/comment/comment.js";
// 该实例可用于实现搜索/替换功能
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.css";
import "codemirror/addon/search/match-highlighter.js";
// 提供在滚动条上显示标记以调出文档某些部分的功能
import "codemirror/addon/selection/mark-selection.js";
// keyMap
import "codemirror/keymap/sublime.js";

import { getTemplate } from "@/api";

export default {
  name: "code-editor",
  components: {
    codemirror
  },
  data() {
    return {
      code: "",
      initCode: "",
      options: {
        // 配置
        mode: "htmlmixed", // 模式类型
        lineNumbers: true, // 左侧显示行
        showCursorWhenSelecting: true, //select显示光标
        tabSize: 2, // 缩进宽度
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers"
        ], // 可用于添加额外的装订线（在行号装订线之外或代替行号装订线）。应该是CSS类名或类名/ CSS字符串对的数组
        autofocus: true, // 可用于使CodeMirror专注于初始化
        keyMap: "sublime", // 配置要使用的键映射
        extraKeys: null, // 可用于为编辑器指定额外的键绑定，以及由定义的键绑定
        theme: "darcula", // 用于设置编辑器样式的主题。您必须确保定义了相应.cm-s-[name] 样式的CSS文件已加载
        scrollbarStyle: "null",

        // 插件配置
        autoCloseBrackets: true, // 该选项将在键入时自动将方括号和引号引起来
        matchBrackets: true, // 只要光标位于括号旁边，该括号就会突出显示匹配的括号
        autoCloseTags: true, // 该选项将在键入“ >”或“ /”时自动关闭XML标记
        foldGutter: true, // 该选项可用于创建带有标记的装订线，该标记指示可折叠的块
        styleActiveLine: true, // 启用该选项后，将为包含光标的行的包装器提供class CodeMirror-activeline
        hintOptions: {
          completeSingle: false
        } // 提供用于显示自动完成提示的框架
      }
    };
  },
  watch: {
    "$store.state.doRun": {
      handler(val) {
        this.handleDo(val);
      },
      immediate: true
    },
    "$store.state.doReset": {
      handler(val) {
        if (!val) {
          return;
        }
        this.code = this.initCode;
        this.$store.dispatch("doRun");
      },
      immediate: true
    },
    "$store.state.doCopy": {
      handler(val) {
        this.handleDo(val);
      },
      immediate: true
    },
    "$route.query.template": {
      async handler(val) {
        if (!val) {
          return;
        }
        const environment = this.$store.state.environment;
        const res = await getTemplate(environment, val);
        this.code = res.code;
        this.initCode = this.code;
        await this.$nextTick();
        this.$store.dispatch("doRun");
      },
      immediate: true
    },
    "$store.state.isUpload": {
      handler(val) {
        if (!val) {
          return;
        }
        this.code = this.$store.state.code;
        this.$store.dispatch("doRun");
      },
      immediate: true
    }
  },
  methods: {
    handleDo(val) {
      val && this.$store.commit("SET_CODE", this.code);
    },
    onCodeReady(codemirror) {
      codemirror.on("keypress", () => {
        codemirror.showHint();
      });
    }
  }
};
</script>

<style>
.vue-codemirror {
  height: 100%;
}
.CodeMirror {
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  font-family: monospace;
}
</style>
