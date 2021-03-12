<!--
 * @Author: pimzh
 * @Date: 2021-03-12 15:53:50
 * @LastEditTime: 2021-03-12 16:15:34
 * @LastEditors: pimzh
 * @Description: 
-->
<template>
  <Modal
    v-model="show"
    width="30"
    title="导出组件"
    :mask-closable="false"
    @on-cancel="handleCancel"
  >
    <Form ref="form" :model="params" :rules="rules" :label-width="80">
      <FormItem label="组件名称" prop="name">
        <Input
          v-model.trim="params.name"
          placeholder="请为你的组件命名"
        ></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click.stop="handleCancel">取消</Button>
      <Button type="primary" @click.stop="handleOk">完成</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "modal-explore",
  data() {
    return {
      show: false,
      rules: {
        name: [{ required: true, message: "请为你的组件命名", trigger: "blur" }]
      },
      params: {
        name: ""
      }
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    handleOk() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("on-ok", this.params);
          this.handleCancel();
        } else {
          this.$Message.warning("请按照提示完成内容输入");
        }
      });
    },
    handleCancel() {
      this.show = false;
      this.$refs["form"].resetFields();
    }
  }
};
</script>
