<template>
  <div class="forget-box">
    <van-nav-bar>
      <template #left>
        <div class="logo-box">
          <div class="logo">
            <img
              src="~assets/img/tabbar1/标题.png"
              alt=""
              class="auto-img"
            />
          </div>
          <div class="logo-text">Deep and light coffee</div>
        </div>
      </template>
      <template #right>
        <div class="right-text" @click="goPage('Menu')">先逛一逛</div>
      </template>
    </van-nav-bar>

    <div class="title-box">
      <div class="zhtitle">找回密码！</div>
      <div class="entitle">Find password</div>
    </div>
    <van-form @submit="onSubmit">
      <div class="ipt">
        <van-field
          v-model="info.email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[
            { required: true, message: '请正确的填写邮箱' },
            {
              pattern: emailReg,
              message: '请输入正确的邮箱格式',
            },
          ]"
        />
        <van-field
          v-model="info.verification"
          type="password"
          name="验证码"
          label="验证码"
          placeholder="验证码(6个字符)"
          :rules="[
            { required: true, message: '请填写正确的验证码' },
            {
              pattern: verificationReg,
              message: '请输入6位验证码',
            },
          ]"
        />
        <div :class="flag ? 'active' : 'send'" @click="send(info.email)">
          {{ flag ? time : "发送验证码" }}
        </div>
      </div>
      <div class="forgot-box">
        <div class="forgot-text" @click="goPage('Sign')">已有账号,立即登录</div>
      </div>
      <div class="sumbit" @click="jump">
        <van-button round block type="info" native-type="submit" color="#0C34BA"
          >下一步</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getEmail } from "network/menu"
export default {
  name: 'Forget',
  data() {
    return {
      info: {
        email: '',
        verification: '',
      },
      //验证邮箱
      emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      //验证验证码
      verificationReg: /^\d{6}$/,
      //切换验证码界面
      flag: false,
      time: '',
      timer: null,
      info: {
        email: "",
      },
      next: false,



    };
  },
  watch: {
    time() {
    }

  },
  methods: {
    //跳转页面
    goPage(name) {
      this.$router.push({ name });


    },
    //获取邮箱
    send(email) {
      this.info.email = email;
      this.getEmail(this.info)
      //切换界面 防止 用户反复点击

      this.flag = !this.flag
      if (this.flag == true) {
        this.clear()
        this.timer = setInterval(() => {
          this.time--
          if (this.time == 0) {
            clearInterval(this.timer)
            this.flag = !this.flag
          }
        }, 1000)
      } else {
        this.clear()
      }

    },
    //发送验证码
    getEmail(info) {
      getEmail(info).then(res => {
        this.$toast(res.data.msg)
        this.next = true;
      }).catch(err => {

      })
    },
    onSubmit(values) {
    },
    clear() {
      clearInterval(this.timer)
      this.timer = null;
      this.time = 3
    },
    jump() {
      if (this.next) {
        this.$router.push("/FindPassowrd")
      }

    }
  },
}
</script>

<style lang="scss" scoped>
@mixin sends() {
  position: absolute;
  bottom: 4px;
  right: 35px;
  width: 80px;
  height: 36px;
  color: #fff;
  font-size: 13px;
  border: 1px solid;
  text-align: center;
  line-height: 36px;
}
.forget-box {
  .logo-box {
    display: flex;
    align-items: center;
    .logo {
      .auto-img {
        width: 36px;
        height: 36px;
      }
    }
    .logo-text {
      font-size: 18px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
  .right-text {
    font-weight: bold;
    color: #0c34ba;
  }
  .title-box {
    padding-left: 15px;
    margin-top: 100px;
    .zhtitle {
      font-weight: bold;
      font-size: 25px;
      padding-bottom: 20px;
    }
    .entitle {
      font-size: 18px;
      padding-bottom: 20px;
      color: #999;
      padding-bottom: 40px;
    }
  }
  .ipt {
    padding: 0px 20px;
    position: relative;
    .send {
      @include sends();
      background-color: #0c34ba;
    }
  }
  .sumbit {
    margin-top: 50px;
    padding: 0px 20px;
    font-size: 18px;
  }
  .forgot-box {
    margin-top: 30px;
    padding: 0px 20px;
    display: flex;
    .forgot-text {
      margin-left: auto;
      font-size: 14px;
      color: #666;
    }
  }
  .active {
    @include sends();
    background-color: #ccc;
    font-size: 18px;
    pointer-events: none;
  }
}
</style>