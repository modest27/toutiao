<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(text,index) in suggestions" :key="index" @click="$emit('search',text)">
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
//按需加载有好处：只会把用到的函数打包到结果中
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestions: [] //联想数据列表
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // handler(val) {
      //   this.loadSearchSuggestion()
      // },
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val)
      }, 300),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      //如果需要根据动态变量来创建正则表达式，则手动new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>