<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow=true" />
    </van-cell>
    <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="searchItemClick(item,index)">
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data() {
    return {
      isDeleteShow: false //展示历史记录删除状态
    }
  },
  props: {
    //props数据（是受父组件影响的）
    //如果是简单类型数据（字符串、数字、布尔值）绝对不能修改
    //如果是复杂类型数据（数组、对象）可以修改里面单个值，不能重新整个赋值
    //props数据修改了也不会影响父组件
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    searchItemClick(item, index) {
      if (this.isDeleteShow) {
        //删除状态下，点击就是删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>