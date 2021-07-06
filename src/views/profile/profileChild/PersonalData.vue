<template>
  <div class="personal-data">
    <div class="nav">
      <nar-bar leftArrow leftText="返回" title="个人资料" />
    </div>
    <div class="collection-all-bg"></div>
    <div class="item-box">
      <div class="head-portrait-box">
        <div class="text">头像</div>
        <div class="head-img" @click="selectFile">
          <img :src="img" alt="" />
        </div>
      </div>
      <div class="user-id">
        <div class="text">用户id</div>
        <div class="text-id items">{{ dataList.userId }}</div>
      </div>
      <div class="nickname" @click="nick">
        <div class="text">昵称</div>
        <div class="nickname-text items">{{ dataList.nickName }}</div>
      </div>
      <div class="introduction-box" @click="jianjie">
        <div class="text">简介</div>
        <div class="introduction-text items">{{ dataList.desc }}</div>
      </div>
    </div>

    <div class="icon">
      <van-popup
        v-model="show"
        position="center"
        :style="{ height: '30%', width: '90%' }"
      >
        <div>
          <div class="ipt-box">
            <input
              type="text"
              placeholder="请输入修改的内容"
              class="ipt"
              v-model="text"
              @change="ipt"
            />
            <p :style="{ color: pColor }">
              {{
                ownMsg ||
                (flag ? "请输入2-5位数的昵称" : "请输入长度不大于16位数的简介")
              }}
            </p>
          </div>
          <div class="head-box">
            <div class="cancel">
              <van-button type="danger" @click="cancel">取消</van-button>
            </div>
            <div class="confirm">
              <van-button type="info" :disabled="discheck" @click="confirm"
                >确认</van-button
              >
            </div>
          </div>
        </div>
      </van-popup>
    </div>
    <div>
      <!-- <van-overlay :show="select" @click="show = false"> -->

      <van-dialog
        v-model="select"
        title="请选择修改图片"
        show-cancel-button
        @confirm="confirme"
      >
        <div class="block">
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            multiple
            :max-count="1"
          >
          </van-uploader>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>

import { getFindAccountInfo, getUpdateNickName, getUpdateDesc, getUpdateAvatar } from "network/menu"

import NarBar from '../../../components/common/NavBar/NarBar.vue'
import { mapState } from "vuex"
export default {
  name: 'PersonalData',
  data() {
    return {
      info: {
        nickName: '',
      },
      infe: {
        desc: "",
      },
      infn: {
        imgType: '',
        serverBase64Img: '',
      },
      show: false,
      text: '',
      flag: true,
      select: false,
      out: false,
      ownMsg: "",
      pColor: "black",
      discheck: false,
      fileList: [],


    }
  },
  watch: {
    text() {
      if (this.chooseReg(this.flag).test(this.text)) {
        this.changeData("输入格式正确", "green");
        this.discheck = false

      } else {
        this.changeData("输入格式错误", "red");
        this.discheck = true

      }
      if (this.text == "") {
        this.changeData("", "black");
      }
    },
  },
  computed: {
    ...mapState({
      dataList: state => state.dataList,
      introduction: state => state.introduction,
      img: state => state.img
    })
  },
  methods: {
    confirme() {
      this.getUpdateAvatar(this.infn)
    },
    cancele() {
      this.fileList = []
    },

    changeData(str, str2) {
      this.ownMsg = str;
      this.pColor = str2;
    },

    //修改头像
    getUpdateAvatar(info) {
      getUpdateAvatar(info).then(res => {
        if (res.data.code === "H001") {
          this.$toast(res.data.msg)
          this.$store.commit("img", res.data.userImg);
          this.select = false
        }
      }).catch(err => {
        this.$toast("修改失败请选择5kb大小的图片")
        this.select = false
      })
    },


    getUpdateDesc(info) {
      getUpdateDesc(info).then(res => {

        if (res.data.code === "D001") {
          this.$toast(res.data.msg)
          this.getFindAccountInfo()
        }
      })
    },

    getUpdateNickName(info) {
      getUpdateNickName(info).then(res => {
        if (res.data.code === "C001") {
          this.$toast(res.data.msg)
          this.getFindAccountInfo()
        }
      })
    },

    getFindAccountInfo() {
      getFindAccountInfo().then(res => {
        if (res.data.code == 'B001') {
          this.$store.commit("data", res.data.result[0])
        }
      })
    },
    //选择图片
    selectFile() {
      this.out = true
      this.select = true
      if (this.select) {
        this.fileList = []
      }

    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.infn.imgType = file.file.type.replace('image/', '')

      this.infn.serverBase64Img = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, '')

    },


    nick() {
      this.show = true;
      this.flag = true;
    },
    ipt() {

    },
    jianjie() {
      this.show = true;
      this.flag = false;
    },
    confirm() {
      if (this.flag === true) {
        this.info.nickName = this.text;
        this.getUpdateNickName(this.info)

      } else {
        this.infe.desc = this.text;
        this.getUpdateDesc(this.infe)
      }
      this.show = false


    },
    cancel() {
      this.show = false
      this.text = ''
    },
    chooseReg() {
      if (this.flag) {
        return /^[\u4E00-\u9FA5A-Za-z0-9_]{2,5}$/;
      } else {
        return /^[\u4E00-\u9FA5A-Za-z0-9_]{0,16}$/
      }

    }

  },

  created() {
    this.getFindAccountInfo()
  },
  mounted() {

  },
  components: {
    NarBar
  }

}
</script>

<style lang="scss" scoped>
@mixin text() {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  padding-top: 30px;
}

.user-id {
  border-bottom: 1px dashed #999;
}
.nickname {
  border-bottom: 1px dashed #999;
}

.personal-data {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  margin-bottom: 1px;
  .collection-all-bg {
    width: 100%;
    height: 100px;
    background-color: var(--color-tint);
  }
  .item-box {
    position: relative;
    top: -20px;
    width: 96%;
    min-height: 230px;
    margin: auto;
    border-radius: 10px 10px 0 0;
    background: #fff;
    .head-portrait-box {
      @include text();
        border-bottom: 1px dashed #999;
      .head-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        img {
          width: 39px;
          height: 39px;
        }
      }
    }
    .items {
      font-size: 15px;
    }
    .text {
      font-size: 15px;
      font-weight: inherit;
      color: #000;
    }
    .user-id {
      @include text();

    }
    .nickname {
      @include text();
    }
    .introduction-box {
      @include text();
    }
  }
  ::v-deep.van-overlay {
    background-color: rgb(0, 0, 0, 0.2);
  }
  ::v-deep.van-popup--center {
    border-radius: 10px;
  }
  .head-box {
    position: relative;
    top: 40px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
  }
  ::v-deep.van-button {
    width: 120px;
    height: 20px;
    border-radius: 40px;
    font-size: 17px;
  }
  .ipt-box {
    position: relative;
    top: 10px;
    width: 88%;
    margin: auto;
    padding-top: 35px;
    .ipt {
      width: 100%;
      height: 30px;
      font-size: 16px;
    }
    p {
      width: 200px;
      padding-top: 10px;
      font-size: 14px;
    }
  }
  ::v-deep.van-dialog__header {
    height: 200px;
    font-size: 20px;
  }
  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
  ::v-deep.van-uploader__preview-delete {
    position: absolute;
    left: 75px;
  }
  ::v-deep.van-uploader__file {
    position: absolute;
    // display: none;
  }
  ::v-deep.van-uploader__wrapper {
    position: relative;
    left: 10px;
    width: 100px;
  }

  .block {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ::v-deep.van-button {
    height: 50px;
  }
}
</style>