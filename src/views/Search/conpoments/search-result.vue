<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="加载失败，请点击重试" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" :to="'/article/'+item.art_id" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchReslut',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResult({
          page: this.page, //页码
          per_page: this.per_page, //每页大小
          q: this.searchText //关键词
        })
        //2.将数据添加到列表当中
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载中的loading给关闭
        this.loading = false
        // 4.判断请求是否还有数据
        if (results.length) {
          //如果有，更新请求页码page
          this.page++
        } else {
          //如果没有，设置finished为true
          this.finished = true
        }
      } catch (err) {
        //展示加载失败的提示
        this.error = true
        //关闭加载
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>