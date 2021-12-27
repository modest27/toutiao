<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form class="search-form" action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" background="#3296fa" @search="onSearch" @cancel="onCancel" @focus="isResultShow=false" />
    </form>
    <!-- 搜索结果 -->
    <SearchReslut v-if="isResultShow" :search-text="searchText"></SearchReslut>
    <!-- 搜索联想建议 -->
    <SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></SearchSuggestion>
    <!-- 搜索历史记录 -->
    <SearchHistory :search-histories="searchHistories" @clear-search-histories="searchHistories=[]" @search="onSearch" v-else></SearchHistory>

  </div>
</template>

<script>
import SearchHistory from '@/views/Search/conpoments/search-history.vue'
import SearchSuggestion from '@/views/Search/conpoments/search-suggestion.vue'
import SearchReslut from '@/views/Search/conpoments/search-result.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      isResultShow: false, // 展示搜索结果
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] //搜索历史记录
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchReslut
  },
  watch: {
    searchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch(val) {
      //更新文本框内容
      this.searchText = val
      //存储搜索记录,要求：不要有重复历史记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      //展示渲染结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>