<template>
  <van-icon color="#777" :name="value===1? 'good-job' : 'good-job-o'" :class="{ liked:value===1 }" @click="onLike" />
</template>

<script>
import { addLike, deleteLike } from '@/api/article.js'

export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
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
    async onLike() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          //已点赞，就取消点赞
          const { data } = await deleteLike(this.articleId)
          this.$toast.success('取消点赞')
        } else {
          //未点赞，就点赞
          const { data } = await addLike(this.articleId)
          status = 1
          this.$toast.success('成功点赞')
        }
        //更新视图
        this.$emit('input', status)
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  color: #e5645f !important;
}
</style>