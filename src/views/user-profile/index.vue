<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" class="page-nav-bar" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange">
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image width="30" height="30" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow=true"></van-cell>
    <van-cell title="性别" :value="user.gender===0? '男' :'女'" is-link @click="isUpdateGenderShow=true"></van-cell>
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow=true"></van-cell>
    <!-- /个人信息 -->
    <!-- 编辑昵称弹出层 -->
    <van-popup v-model="isUpdateNameShow" style="height:100%;" position="bottom">
      <UpdateName v-if="isUpdateNameShow" @close="isUpdateNameShow=false" v-model="user.name"></UpdateName>
    </van-popup>
    <!-- /编辑昵称弹出层 -->

    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <UpdateGender v-if="isUpdateGenderShow" @close="isUpdateGenderShow=false" v-model="user.gender"></UpdateGender>
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday v-if="isUpdateBirthdayShow" v-model="user.birthday" @close="isUpdateBirthdayShow=false"></UpdateBirthday>
    </van-popup>
    <!-- /编辑生日 -->

    <!-- 编辑头像 -->
    <van-popup v-model="isUpdatePhotoShow" style="height:100%;" position="bottom">
      <UpdatePhoto v-if="isUpdatePhotoShow" :img="img" @close="isUpdatePhotoShow=false" @update-photo="user.photo=$event"></UpdatePhoto>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from '@/views/user-profile/components/update-name.vue'
import UpdateGender from '@/views/user-profile/components/update-gender.vue'
import UpdateBirthday from '@/views/user-profile/components/update-birthday.vue'
import UpdatePhoto from '@/views/user-profile/components/update-photo.vue'
export default {
  namea: 'UserProfile',
  data() {
    return {
      user: {}, //个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('信息获取失败')
      }
    },
    onFileChange() {
      //获取文件对象
      const file = this.$refs.file.files[0]
      //基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      //展示预览图片弹出层
      this.isUpdatePhotoShow = true

      //file-input 如果选择同一个文件，不会触发change事件
      //需要手动把file-input的value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
</style>