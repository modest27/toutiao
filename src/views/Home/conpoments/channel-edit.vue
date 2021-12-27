<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">
        我的频道
      </div>
      <van-button type="danger" plain round size="mini" class="edit-btn" @click="isEdit=!isEdit">{{isEdit ? '完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item v-for="(item,index) in myChannels" :key="index" class="grid-item" @click="onMyChannelClick(item,index)">
        <van-icon slot="icon" name="clear" v-show="isEdit && !fiexdChannels.includes(item.id)"></van-icon>
        <span slot="text" class="text" :class="{active: index===active}">{{item.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">
        频道推荐
      </div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item v-for="(item,index) in  recommendChannels" :key="index" icon="plus" :text="item.name" class="grid-item" @click="addChannel(item)" />
    </van-grid>

  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], //所有频道列表
      isEdit: false, //编辑状态
      fiexdChannels: [0] //固定不删除的那些频道
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      const channels = []
      this.allChannels.forEach(channel => {
        //find遍历数组，找到满足条件的元素项
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        //如果我的频道中没有该项，就加入到新数组中
        if (!ret) {
          channels.push(channel)
        }
      })
      //把计算结果返回
      return channels
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取所以频道数据失败')
      }
    },
    async addChannel(channel) {
      this.myChannels.push(channel)
      //数据持久化处理
      if (this.user) {
        try {
          //已登录，频道列表数据存储保存在后端
          await addUserChannel({
            id: channel.id, //频道id
            seq: this.myChannels.length //添加的那个频道的序号
          })
        } catch (err) {
          this.$toast('添加失败，请稍后重试')
        }
      } else {
        //未登录，频道列表数据保存在本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        if (this.fiexdChannels.includes(index)) {
          return
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        //编辑状态，执行删除
        this.myChannels.splice(index, 1) //两个参数分别是，删除的开始索引位置和删除的个数
        //本地或者后端上删除频道项
        this.deleteChannel(channel)
      } else {
        //非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        //已登录，后端删除频道项
        try {
          await deleteUserChannel(channel.id)
        } catch (err) {
          this.$toast('删除失败，请稍后重试')
        }
      } else {
        //未登录,本地删除频道项
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>