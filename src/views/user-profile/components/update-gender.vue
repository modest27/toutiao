<template>
  <div class="update-gender">
    <van-picker title="标题" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="$emit('close')" :default-index="value" />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'

export default {
  name: 'UpdateGender',
  data() {
    return {
      columns: ['男', '女'],
      localGender: 0
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm(value, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, //禁止点击背景
        duration: 0 //持续展示
      })
      try {
        const { data } = await updateUserProfile({
          gender: index
        })
        //更新视图
        this.$emit('input', index)
        //关闭弹出层
        this.$emit('close')
        //提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
</style>