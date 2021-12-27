<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="userFormRules.mobile" type="number" maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="code" placeholder="请输入验证码" v-model="user.code" :rules="userFormRules.code" type="number" maxlength="6">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="1000*10" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false" />
          <van-button round class="send-sms-btn" native-type="button" size="small" type="default" @click="onSendSms" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block class="login-btn" type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      const user = this.user

      this.$toast.loading({
        //在组件中必须通过this.$toast来调用Toast组件
        message: '登录中...',
        forbidClick: true, //禁用背景点击
        duration: 0 //默认展示时间是2秒
      })

      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功') //登录成功提示，或取消前面的加载状态提示

        this.$router.push('/my')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败')
        }
      }
    },
    async onSendSms() {
      //单独验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      //展示倒计时
      this.isCountDownShow = true
      //发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        //发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后再试~')
        } else {
          this.$toast('发送失败，请稍后再试~')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>