<!--
 * @Author: pimzh
 * @Date: 2021-03-09 14:33:29
 * @LastEditTime: 2021-03-11 13:25:34
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
// theme css
import "codemirror/theme/base16-dark.css";
// active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";
// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
//hint
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/hint/show-hint.css";
//
import "codemirror/addon/edit/closebrackets.js";

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
        mode: "htmlmixed",
        lineNumbers: true, //行号
        // scrollbarStyle: "simple",
        autoCloseBrackets: true, //自动补全括号
        matchBrackets: true, //匹配括号
        showCursorWhenSelecting: true, //select显示光标
        autoCloseTags: true,
        tabSize: 2,
        foldGutter: true, //可折叠的块
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers"
        ],
        autofocus: true,
        styleActiveLine: true,
        hintOptions: {
          completeSingle: false
        },
        keyMap: "sublime",
        extraKeys: {
          "Ctrl-Q": "autocomplete"
        }
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
