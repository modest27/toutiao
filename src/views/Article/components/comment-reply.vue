<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count>0? `${comment.reply_count}条回复`:'暂无回复'">
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <CommentItem :comment="comment"></CommentItem>
      <!-- /当前评论项 -->
      <!-- 评论回复列表 -->
      <van-cell title="全部回复"></van-cell>
      <CommentList :source="comment.com_id" type="c" :list="commentList"></CommentList>
      <!-- /评论回复列表 -->
    </div>
    <!-- 发布回复评论 -->
    <div class="post-wrap">
      <van-button size="small" round class="post-btn" @click="isPostShow=true">写评论</van-button>
    </div>
    <!-- /发布回复评论 -->
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost :target="comment.com_id" @post-success="onPostSuccess"></CommentPost>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  data() {
    return {
      isPostShow: false,
      commentList: [] //评论回复的列表数据
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  methods: {
    onPostSuccess(data) {
      //更新回复数量
      this.comment.reply_count++
      //关闭弹出层
      this.isPostShow = false
      //更新展示回复
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>
 <style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>