<template>
  <van-button v-if="isFollow" round size="small" :loading="loading" @click="onFollow">已关注</van-button>
  <van-button v-else type="info" color="#3296fa" round size="small" icon="plus" :loading="loading" @click="onFollow">关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'

export default {
  name: 'UserFollow',
  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow() {
      this.loading = true // 点击展示loading状态

      try {
        if (this.isFollow) {
          //已关注，就取消关注
          await deleteFollow(this.userId)
        } else {
          //未关注，添加关注
          await addFollow(this.userId)
        }
        //更新视图状态
        //  this.article.is_followed = !this.article.is_followed
        this.$emit('update-follow', !this.isFollow)
      } catch (err) {
        let message = '操作失败，请重试 !'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己 !'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭展示loading状态
    }
  }
}
</script>

<style lang="less" scoped>
</style>