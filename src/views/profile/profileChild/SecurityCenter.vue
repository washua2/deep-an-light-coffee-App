<template>
  <div class="security-center">
    <nar-bar leftArrow leftText="返回" title="安全中心" />
    <div class="security-center-bg"></div>
    <div class="security-center-box">
      <div class="select-text-box">
        <div
          class="select-text"
          v-for="(item, index) in list"
          :key="item.id"
          @click="jump(index)"
        >
          <div class="data">{{ item.title }}</div>
          <div class="diantou">
            <img src="~assets/img/other/箭头.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="sign-out" @click="signOut">
      <van-button type="info">退出登录</van-button>
    </div>
    <van-action-sheet v-model="show" title="修改密码">
      <div class="content">
        <van-field
          v-model="newPassword"
          :type="isOpen1 ? 'text' : 'password'"
          name="newPassword"
          label="旧密码"
          placeholder="密码必须以字母开头(6-16位)"
          :right-icon="isOpen1 ? 'eye-o' : 'closed-eye'"
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
          @click-right-icon="togglePasswordStatus1"
        />
        <van-field
          v-model="oldPassword"
          :type="isOpen2 ? 'text' : 'password'"
          name="oldPassword"
          label="新密码"
          placeholder="密码必须以字母开头(6-16位)"
          :right-icon="isOpen2 ? 'eye-o' : 'closed-eye'"
          :rules="[
            {
              required: true,
              message: '请填写正确的密码',
            },
          ]"
          @click-right-icon="togglePasswordStatus2"
        />

        <div class="submit">
          <van-button type="info" @click="submit">提交</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import NarBar from 'components/common/NavBar/NarBar.vue'
import { getUpdatePassword, getLogout, getDestroyAccount } from "network/menu"
export default {
  name: 'SecurityCenter',
  data() {
    return {
      list: [
        {
          title: '修改密码',
          path: '/personalData',
          id: '1',
        },
        {
          title: '注销账号',
          path: '/myOrder',
          id: '2',
        }

      ],
      show: false,
      isOpen1: false,
      isOpen2: false,
      newPassword: '',
      oldPassword: '',
      info: {
        password: '',
        oldPassword: '',
      },
      //验证密码格式
      passwordReg: /^[A-Za-z]\w{5,15}$/,
    }
  },
  methods: {
    //提交修改密码
    submit() {
      this.$dialog.alert({
        message: "确认修改密码吗", //改变弹出框的内容
        showCancelButton: true //展示取水按钮
      })
        .then(() => { //点击确认按钮后的调用
          this.info.password = this.newPassword
          this.info.oldPassword = this.oldPassword

          this.getUpdatePassword(this.info)
        })
        .catch(() => { //点击取消按钮后的调用

        })
    },
    //提交注销账号
    jump(index) {
      if (index == 0) {
        this.show = true
      }
      if (index == 1) {
        this.$dialog.alert({
          title: '注销账号',
          message: "是否注销账户，一旦注销无法恢复", //改变弹出框的内容
          showCancelButton: true //展示取水按钮
        })
          .then(() => { //点击确认按钮后的调用
            this.getDestroyAccount()
          })
          .catch(() => { //点击取消按钮后的调用

          })
      }


    },
    //提交退出登录
    signOut() {
      this.$dialog.alert({
        message: "是否退出登录", //改变弹出框的内容
        showCancelButton: true //展示取水按钮
      })
        .then(() => { //点击确认按钮后的调用
          this.getLogout()

        })
        .catch(() => { //点击取消按钮后的调用

        })
    },
    //退出登录
    getLogout() {
      getLogout().then(res => {
        if (res.data.code == "F001") {
          this.$toast(res.data.msg);
          this.$router.push("/Home")
           sessionStorage.removeItem("token")  
        }
      })
    },
    //修改密码
    getUpdatePassword(info) {
      getUpdatePassword(info).then(res => {
        if (res.data.code === "E003") {
          this.$toast(res.data.msg);

        }
        if (res.data.code === "E001") {
          this.$toast(res.data.msg);
          this.show = false
        }
      })
    },
    getDestroyAccount() {
      getDestroyAccount().then(res => {
        if (res.data.code === "G001") {
          this.$toast(res.data.msg);
          this.$router.push("/Home")
           sessionStorage.removeItem("token")  
        }
      })
    },
    togglePasswordStatus1() {
      this.isOpen1 = !this.isOpen1
    },
    togglePasswordStatus2() {
      this.isOpen2 = !this.isOpen2

    },

  },
  components: {
    NarBar,
  }
}
</script>

<style lang="scss" scoped>
.security-center {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .security-center-bg {
    width: 100%;
    height: 100px;
    background-color: var(--color-tint);
  }
  .security-center-box {
    position: relative;
    top: -20px;
    width: 96%;
    min-height: 139px;
    margin: auto;
    border-radius: 10px;
    background: #fff;
  }
  .select-text-box {
    width: 100%;
    height: 70px;
    margin-top: 5px;
    padding: 0px 10px;
    .select-text {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #eeeff0;
      background-color: #fff;

      .data {
        font-size: 15px;
      }
      .diantou {
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  .content {
    height: 250px;
    padding: 0 20px;
  }
  ::v-deep.van-button {
    position: relative;
    top: 100px;
    width: 94%;
    height: 50px;
    border-radius: 40px;
    border: 0 solid;
    margin: 0 10px;
    background-color: var(--color-tint);
  }
  ::v-deep.van-action-sheet__header {
    display: flex;
    padding-left: 10px;
  }
}
</style>