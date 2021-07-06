<template>
  <div class="home-box">
    <div class="nav-box">
      <div class="text-box">
        <div class="time-text">下午好</div>
        <div class="name-text">
          {{ backstage ? dataList.nickName : "游客" }}
        </div>
      </div>
      <div class="search-box">
        <van-search
          v-model="value"
          placeholder="请输入商品名称"
          @search="onSearch"
        />
      </div>
    </div>
    <div class="home-collection-search-bg" v-show="!isShow" />
    <scroller
      class="content"
      :pull-up-load="true"
      :probe-type="3"
      @scroll="contentText"
      ref="scroll"
    >
      <div class="show" v-show="isShow">
        <div class="item-box">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(img, index) in imageList" :key="index">
              <img v-lazy="img.bannerImg" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="recommend">
          <div class="recommend-text">热卖推荐</div>
        </div>
        <div class="box">
          <div
            class="goods-box"
            v-for="(item, index) in goodsList"
            :key="index"
            @click="jump(item.pid)"
          >
            <div class="icon">hot</div>
            <div class="img-box">
              <img :src="item.smallImg" alt="" @load="imgLoad" />
            </div>
            <div class="goods-name">{{ item.name }}</div>
            <div class="goods-enname">{{ item.enname }}</div>
            <div class="goods-price">￥{{ item.price }}</div>
          </div>
        </div>
      </div>
      <home-collection v-show="!isShow" @load="imgLoad" />
    </scroller>

    <div class="back" @click="backHome" v-show="!isShow" ref="back">
      <van-button plain type="info"></van-button>
    </div>
    <transition
      enter-active-class="animate__animated animate__heartBeat "
      leave-active-class="animate__animated animate__rubberBand animate__faster	300ms"
    >
      <back-top v-show="isTop" @click.native="backClick" />
    </transition>
  </div>
</template>

<script>
import { getBanner, getType, getMenuType, getSearch } from "network/menu"
import NarBar from '../../components/common/NavBar/NarBar.vue'
import Scroller from '../../components/common/scroller/Scroller.vue'
import BackTop from 'components/common/backTop/BackTop.vue'

import { mapState } from "vuex"
import HomeCollection from './homeChild/HomeCollection.vue'
export default {
  name: 'Home',
  data() {
    return {
      value: '',
      imageList: {},
      typeList: {},
      goodsList: {},
      isShow: true,
      timer: null,
      flag: 0,
      isTop: false,
      backstage: false,

    }
  },
  computed: {
    ...mapState({
      dataList: state => state.dataList,
      homeList: state => state.homeList,
    })
  },
  methods: {
    onSearch(val) {
      this.isShow = false;
      this.change()
      this.$store.commit("home_search", "")
      this.goodsList.forEach(v => {
        if (v.name.indexOf(val) > -1 && val !== "") {
          this.getSearch(val)
          this.$store.commit("home_search", v)
        } else {
          this.$toast("未查询到正确的商品")
        }
      })

    },
    getSearch() {
      getSearch().then(res => {

        if (res.data.code === 700) {
          //   跳转登录界面
          this.$toast(res.data.msg);
          clearTimeout(this.timers)
          this.timers = null
          this.timers = setTimeout(() => {
            this.$router.push('/Sign')
          }, 2000)
        }
        if (res.data.code === "Q001") {
          this.$toast(res.data.msg);
        }
      })
    },
    getMenuType(keys, values) {
      getMenuType(keys, values).then(res => {
        if (res.data.code === 500) {
          this.goodsList = res.data.result
        }
      })
    },


    getType() {
      getType().then(res => {
        if (res.data.code == 400) {
          res.data.result.unshift({ type: 'isHot', typeDesc: '热卖推荐', id: 0 })
          this.typeList = res.data.result
          let keys = this.typeList[0].type;
          let values = this.typeList[0].id;
          this.getMenuType(keys, values)

        }
      })
    },

    getBanner() {
      getBanner().then(res => {
        this.imageList = res.data.result;
      })
    },
    backHome() {
      this.flag++
      if (this.flag === 1) {
        this.$refs.back.style.width = "100px";
        setTimeout(() => {
          this.$refs.back.style.width = "20px";
          this.flag = 0;
        }, 3000)
      }
      if (this.flag == 2) {
        this.value = ''
        this.$store.commit("home_search", "")
        this.change()
        this.isShow = true;
        this.flag = 0;
        this.$refs.back.style.width = "20px";
      }


    },
    contentText(position) {
      //判断TabBack是否显示
      this.isTop = (-position.y) > 200
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },


    jump(pid) {
      let path = `/detail/${pid}`
      this.$router.push(path)
    },

    imgLoad() {
      this.$refs.scroll.refresh()

    },
    change() {
      clearTimeout(this.timer)
      this.timer = null
      this.timer = setTimeout(() => {
        this.imgLoad()
      }, 100)
    },
    start() {
      if (sessionStorage.getItem("token") === null) {
        this.backstage = false
        this.$store.commit("isbackstage", false)
      } else {
        this.backstage = true;
        this.$store.commit("isbackstage", true)

      }
    },
  },
  mounted() {
    this.getBanner()
    this.getType()
  },
  activated() {
    this.start()

  },
  components: {
    NarBar,
    Scroller,
    BackTop,
    HomeCollection,
  }
}
</script>

<style lang="scss" scoped>
.home-box {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .nav-box {
    display: flex;
    justify-content: space-between;
    .text-box {
      position: relative;
      display: flex;
      width: 150px;
      height: 46px;
      background: #fff;
      align-items: center;
      justify-content: space-around;
      padding-left: 10px;
      padding-right: 20px;
      z-index: 999999;
      .time-text {
        font-weight: bold;
        font-size: 15px;
      }
      .name-text {
        font-weight: bold;
        font-size: 14px;
        color: var(--color-tint);
      }
    }
    ::v-deep.van-search {
      position: relative;
      z-index: 99999;
      width: 240px;
      padding: 6px 0;
      padding-right: 11px;
      padding-left: 10px;
    }
    ::v-deep.van-search__content {
      padding-right: 20px;
      border-radius: 20px;
    }
    ::v-deep.van-icon-search {
      color: var(--color-tint);
    }
    .search-box {
      box-sizing: content-box;
    }
  }
  .home-collection-search-bg {
    width: 100%;
    height: 100px;
    background-color: var(--color-tint);
  }
  .item-box {
    position: relative;
    top: 10px;
    width: 96%;
    margin: auto;
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      vertical-align: bottom;
    }
    ::v-deep.van-swipe__indicators {
      transform: translateX(100%);
    }
    ::v-deep.van-swipe__indicator {
      width: 15px;
      height: 2px;
    }
    ::v-deep.van-swipe__indicator--active {
      background-color: var(--color-tint);
    }
    ::v-deep.van-swipe__track {
      width: 100%;
      height: 260px;
    }
  }
  .recommend {
    position: relative;
    top: 20px;
    width: 96%;
    min-height: 50px;
    margin: auto;
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    .recommend-text {
      width: 90px;
      height: 35px;
      color: #fff;
      border: 1px solid;
      border-radius: 0 20px 0 0;
      line-height: 35px;
      text-align: center;
      font-size: 15px;
      background-color: var(--color-tint);
    }
  }
  .box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .goods-box {
      position: relative;
      top: 20px;
      width: 46%;
      min-height: 50px;
      margin: 10px;
      margin-right: 0;
      margin-bottom: 0;
      padding: 10px 0;
      border-radius: 10px;
      background: #fff;
      .icon {
        position: absolute;
        left: 20px;
        width: 25px;
        height: 25px;
        color: #fff;
        border: 1px solid;
        border-radius: 0 0 5px 5px;
        background-color: var(--color-tint);
        text-align: center;
        line-height: 25px;

        z-index: 9999;
      }
      .img-box {
        width: 90%;
        height: 160px;
        border-radius: 10px;
        margin: auto;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods-name {
        font-size: 18px;
        padding: 10px;
        padding-bottom: 0;
      }
      .goods-enname {
        width: 150px;
        padding: 10px;
        padding-top: 5px;
        font-size: 14px;
        color: #999;
        text-align: start;
        white-space: nowrap;
        word-wrap: break-word;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*显示行数*/
        overflow: hidden;
      }
      .goods-price {
        font-size: 18px;
        padding-left: 10px;
        color: var(--color-tint);
        font-weight: bold;
      }
    }
  }
  .back {
    position: fixed;
    bottom: 70px;
    right: 0px;
    width: 20px;
    transition: all 0.5s ease-in-out;
    ::v-deep.van-button {
      height: 35px;
      width: 100%;
      border-radius: 20px 0 0 20px;
      background-image: url("~assets/img/other/返回首页.png");
      background-repeat: no-repeat;
      background-size: 160% 100%;
      background-position-x: center;
    }
  }

  .content {
    height: calc(100% - 136px);
  }
}
</style>