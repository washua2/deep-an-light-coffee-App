<template>
  <div class="findPassowrd">
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
    <div class="user-box">
      <div class="title-box">
        <div class="zhtitle">找回密码！</div>
        <div class="entitle">Find password</div>
      </div>
      <div class="from-box">
        <van-form @submit="getRetrievePassword">
          <div class="ipt">
            <van-field
              v-model="info.phone"
              name="phone"
              label="手机号"
              placeholder="手机号11位"
              :rules="[
                { required: true, message: '请填写手机号' },
                { pattern: phoneReg, message: '手机格式不正确' },
              ]"
            />

            <van-field
              v-model="info.password"
              :type="isOpen ? 'text' : 'password'"
              name="password"
              label="新密码"
              placeholder="密码必须以字母开头(6-16位)"
              :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
              :rules="[
                {
                  required: true,
                  message: '请填写正确的密码',
                },
                {
                  pattern: passwordReg,
                  message: '支持数字字母下划线组合并且以字母开头',
                },
              ]"
              @click-right-icon="togglePasswordStatus"
            />
          </div>

          <div class="forgot-box">
            <div class="forgot-text" @click="goPage('Forget')">
              已有账号，立即登录
            </div>
          </div>
          <div class="login-findPassowrd">
            <van-button round block color="#0C34BA" native-type="submit"
              >提&nbsp;&nbsp;&nbsp;交</van-button
            >
          </div>
          <div class="login-register">
            <van-button round block native-type="button" @click="goPage"
              >返&nbsp;&nbsp;&nbsp;回</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getRetrievePassword } from "network/menu"
export default {
  name: 'findPassowrd',
  data() {
    return {
      info: {
        phone: '',
        password: '',
      },

      isOpen: false,
      //验证手机号
      phoneReg: /^1[3-9]\d{9}$/,

      //验证密码(数字字母下划线组合并且以字母开头6-16位)
      passwordReg: /^[A-Za-z]\w{5,15}$/,

    };
  },
  watch: {

  },
  methods: {

    //跳转页面
    goPage() {
      this.$router.go(-1);
    },
    //是否显示密码
    togglePasswordStatus() {
      this.isOpen = !this.isOpen
    },
    //提交的数据
    onSubmit(values) {
    },
    // 跳转提示
    jump() {
      this.$toast('登录成功正在跳转页面...');
      setTimeout(() => {
        this.$toast.clear();
      }, 1000);
    },

    //登录
    getRetrievePassword(info) {
      getRetrievePassword(info).then(res => {
        this.$toast(res.data.msg + "正在跳转登录界面...");
        if (res.data.code === "L001") {
          setTimeout(() => {
            this.$router.push("/Sign");

          }, 2000);
        }
      }).catch(err => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.findPassowrd {
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
  .user-box {
    margin-top: 100px;

    .title-box {
      padding-left: 15px;
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
    .from-box {
      .forgot-box {
        margin-top: 10px;
        margin-right: 10px;
        display: flex;
        .forgot-text {
          margin-left: auto;
          margin-bottom: 40px;
          font-size: 14px;
          color: #666;
        }
      }
      .ipt {
        padding: 0px 20px;
      }
      .login-register {
        margin-top: 50px;
        padding: 0px 20px;
      }
      .login-findPassowrd {
        padding: 0px 20px;
      }
      .forgot-box {
        padding: 0px 10px;
      }
    }
  }
}
</style>