<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title" type="info" size="small" round icon="search" to="/search" class="search-btn">搜索</van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <!-- 右边占位挤开 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChannelEditShow" closeable position="bottom" close-icon-position="top-left" :style="{ height: '100%' }">
      <ChannelEdit :my-channels="channels" :active="active" @update-active="onUpdateActive"></ChannelEdit>
    </van-popup>
  </div>
</template>
<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/views/Home/conpoments/ArticleList.vue'
import ChannelEdit from '@/views/Home/conpoments/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      channels: [], //频道列表
      isChannelEditShow: false // 默认频道编辑弹出层展示状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        let channels = []
        if (this.user) {
          //已登录,调用接口获取频道列表数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          //未登录，判断是否有本地频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          //如果有，直接拿来用
          if (localChannels) {
            channels = localChannels
          } else {
            //如果没有，调用接口获取默认频道列表，注意这里还是原接口，但是不强制用户登录，返回默认频道
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }

        this.channels = channels
      } catch (err) {
        this.$toast('获取频道列表失败!')
      }
    },
    onUpdateActive(val, isChannelEditShow = ture) {
      this.active = val
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      z-index: 1;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>