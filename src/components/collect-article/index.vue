<template>
  <van-icon color="#777" :name="value? 'star' : 'star-o'" :class="{ collected:value }" @click="onCollect" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article.js'

export default {
  name: 'CollectArticle',
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          //已收藏，就取消收藏
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          //未收藏，就收藏
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        //更新父组件收藏图标视图
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  color: #ffa500 !important;
}
</style>