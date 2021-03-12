<!--
 * @Author: pimzh
 * @Date: 2021-03-09 15:12:14
 * @LastEditTime: 2021-03-12 17:42:47
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <div ref="display"></div>
</template>

<script>
import { uuid } from "@/utils/tool";
import Vue from "vue";

export default {
  name: "code-display",
  data() {
    return {
      comp: null,
      id: ""
    };
  },
  computed: {
    code() {
      return this.$store.state.code;
    }
  },
  watch: {
    "$store.state.doRun": {
      handler(val) {
        val && this.handleCode();
      },
      immediate: true
    }
  },
  methods: {
    getResource(code, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = code.match(regex);

      if (!openingTag) return "";
      else openingTag = openingTag[0];

      return code.slice(
        code.indexOf(openingTag) + openingTag.length,
        code.lastIndexOf(`</${type}>`)
      );
    },
    async handleReset() {
      if (this.id) {
        const target = document.getElementById(this.id);
        if (target) {
          target.parentNode.removeChild(target);
        }
        this.id = "";
      }
      if (this.comp) {
        this.$refs.display.removeChild(this.comp.$el);
        this.comp.$destroy();
        this.comp = null;
      }
      await this.$nextTick();
    },
    async handleCode() {
      try {
        await this.handleReset();
        const { code } = this;
        const template = this.getResource(code, "template");
        const script = this.getResource(code, "script").replace(
          /export default/,
          "return "
        );
        const css = this.getResource(code, "style");

        if (script.trim() === "" && template.trim() === "") {
          return;
        }
        let childVue = {};
        if (script.trim() !== "") {
          childVue = new Function(script)();
        }
        if (template.trim() !== "") {
          childVue.template = template;
        }

        const Profile = Vue.extend(childVue);
        this.comp = new Profile().$mount();
        this.$refs.display.appendChild(this.comp.$el);

        if (css.trim() !== "") {
          const id = uuid();
          this.id = id;
          const style = document.createElement("style");
          style.type = "text/css";
          style.id = id;
          style.innerHTML = css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
