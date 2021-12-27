<template>
  <van-list v-model="loading" :immediate-check="false" :error.sync="error" error-text="加载失败，请点击重试" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <CommentItem v-for="(item,index) in list" :key="index" :comment='item' @reply-click="$emit('reply-click',$event)" />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  components: {
    CommentItem
  },
  created() {
    //手动onload不会开启初始的loading
    this.loading = true
    this.onLoad()
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求加载数据
        const { data } = await getComments({
          type: this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), //源id，文章id或评论id
          offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2. 将数据放在列表中
        const { results } = data.data
        this.list.push(...results)

        //将评论数据传给父组件
        this.$emit('onload-success', data.data)

        // 3. 将loading设置为false
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          //有就更新下一页的页码
          this.offset = data.data.last_id
        } else {
          //没有数据了，就设置finished为true
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>