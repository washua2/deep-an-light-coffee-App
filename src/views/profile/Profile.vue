<template>
  <div class="profile">
    <div class="profile-bg">
      <div class="head-img" @click="selectFile">
        <img :src="bgImg==''?'~assets/img/tabbar/店铺.jpg':bgImg" alt="" v-if="backstage" />
        <img src="~assets/img/other/网络.png" v-else/>
      </div>
    </div>
    <div class="mask"></div>
    <div class="profile-text">
      <div class="profile-text-head">
        <div class="portrait" @click="open(img)">
         <img :src="bgImg==''?'~assets/img/other/时钟.png':img" alt="" v-if="backstage" />
        <img src="~assets/img/other/网络.png" v-else/>
        </div>
        <div class="text">
          <div class="name">{{ backstage?dataList.nickName:"游客" }}</div>
          <div class="signature">{{ backstage?dataList.desc:'欢迎来到深浅咖啡' }}</div>
        </div>
      </div>
      <!-- 选择 -->
      <div class="select-text-box">
        <div
          class="select-text"
          v-for="(item, index) in list"
          :key="item.id"
          @click="jump(index, item.path)"
        >
          <div class="data">{{ item.title }}</div>
          <div class="diantou">
            <img src="~assets/img/other/箭头.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="select"
      title="请选择修改图片"
      show-cancel-button
      @confirm="confirme"
      @cancel="cancele"
    >
      <div class="block">
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          multiple
          :max-count="1"
        >
          <template #preview-cover="{ img }">
            <img :src="img" alt="" class="preview-cover van-ellipsis" />
          </template>
        </van-uploader>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { getUpdateUserBg } from "network/menu"
import { getFindMy } from "network/menu"
import { mapState } from "vuex"
export default {
  name: 'Profile',
  data() {
    return {
      list: [
        {
          title: '个人资料',
          path: '/personalData',
          id: '1',
        },
        {
          title: '我的订单',
          path: '/myOrder',
          id: '2',
        },
        {
          title: '我的收藏',
          path: '/collection',
          id: '3',
        },
        {
          title: '地址管理',
          path: '/addressManagement',
          id: '4',
        },
        {
          title: '个人中心',
          path: '/securityCenter',
          id: '5',
        }
      ],
      count: -1,
      select: false,
      out: false,
      infn: {
        imgType: '',
        serverBase64Img: '',
      },
      show: true,
      fileList: [],
      choose: false,



    }
  },
  computed: {
    ...mapState({
      dataList: state => state.dataList,
      img: state => state.img,
      bgImg: state => state.bgImg,
      backstage: state => state.backstage,

    })
  },
  methods: {
    open(img) {
      ImagePreview({
        images: [
          this.img
        ],
      });
    },
    confirme() {
      this.getUpdateUserBg(this.infn)
    },
    cancele() {
      this.fileList = []
    },


    jump(index, path) {
      this.count = index;
      if (this.count === index) {
        this.$router.push(path)
      }
    },
    getFindMy() {
      getFindMy().then(res => {
        if (res.data.code === 700) {
          //   跳转登录界面
          this.$toast(res.data.msg);
          clearTimeout(this.timers)
          this.timers = null
          this.timers = setTimeout(() => {
            this.$router.push('/Sign')
          }, 2000)
        }
      })
    },
    getUpdateUserBg(info) {
      getUpdateUserBg(info).then(res => {
        console.log(res);
        if (res.data.code === "I001") {
          this.$toast(res.data.msg)
          this.$store.commit("bg_img", res.data.userBg);
          this.select = false

        }
      }).catch(err => {
        this.$toast("修改失败请选择5kb大小的图片")
        this.select = false
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
    //跳转日历界面
    // dataTime(){
    //   this.$router.push("/PersonalDataTime")
    // }



  },
  activated() {
        this.getFindMy()


  },
mounted(){
}
}
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  color: #000;
  .profile-bg {
    width: 100%;
    img {
      width: 100%;
      height: 180px;
    }
  }
  .profile-text {
    position: relative;
    top: -40px;
    width: 96%;
    height: 388px;
    margin: auto;
    border-radius: 10px 10px 0 0;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.7) 50px,
      #fff,
      #fff
    );

    .profile-text-head {
      display: flex;
      padding: 10px;
      .portrait {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 70px;
          height: 70px;
        }
      }
      .name {
        font-size: 20px;
        margin-left: 20px;
      }
      .signature {
        margin: 10px 20px;
        border: 0px solid;
        width: 100%;
        font-size: 13px;
      }
    }
    .select-text-box {
      width: 100%;
      height: 50px;
      margin-top: 50px;
      padding: 0px 10px;
      .select-text {
        width: 100%;
        height: 50px;
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
  }
  ::v-deep.van-dialog__header {
    height: 200px;
    font-size: 20px;
  }
  ::v-deep.van-image-preview__index {
    display: none;
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
  .dataTime {
    position: absolute;
    right: 20px;
    width: 50px;
    height: 30px;
    color: #000;
    border: 1px solid var(--color-tint);
    border-radius: 15px;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    font-weight: bold;
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
}
</style>