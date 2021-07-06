<template>
  <div class="detail">
    <div class="back-nav-box">
      <nar-bar left-arrow left-text="返回" title="商品详情" />
    </div>
    <scroller class="content" :pull-up-load="true" :probe-type="3" ref="scroll">
      <div class="detail-img">
            
        <img :src="list.large_img" alt=""   @load="imgLoad"/>
      </div>
      <div class="specific">
        <div class="pro-info">
          <div>
            <div class="zh-name">{{ list.name }}</div>
            <div class="en-name">{{ list.enname }}</div>
          </div>
          <div class="pro-price">&yen;{{ list.price }}</div>
        </div>

        <!-- 规格 -->
        <div class="pro-rule">
          <div
            class="pro-rule-item"
            v-for="(item, index) in list.arr"
            :key="index"
          >
            <div class="pro-rule-title">{{ item.title }}</div>
            <div class="pro-sub-rule">
              <div
                class="pro-sub-rule-item"
                :class="{ active: item.activeIndex === i }"
                v-for="(v, i) in item.arr"
                :key="i"
                @click="toggleRule(item, i)"
              >
                {{ v.title }}
              </div>
            </div>
          </div>
        </div>

        <!-- 选择数量 -->
        <div class="select-count">
          <div class="select-text">选择数量</div>
          <div class="select-box">
            <van-stepper
              v-model="count"
              theme="round"
              button-size="22"
              disable-input
            />
          </div>
        </div>

        <!-- 描述 -->
        <div class="describe">
          <div class="describe-title">商品描述</div>
          <div class="describe-text">
            <div
              class="describe-text-item"
              v-for="(item, index) in list.desc"
              :key="index"
            >
              {{ index + 1 }}、{{ item }}
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="bag"
        text="购物袋"
        :color="shop ? '#0c34ba' : '#646566'"
        :badge="backstage ? sum : '0'"
        @click="jump"
      />
      <van-goods-action-icon
        icon="like"
        :text="collect ? '已收藏' : '未收藏'"
        :color="collect ? '#0c34ba' : '#646566'"
        :badge="backstage ? this.goodList.length : '0'"
        @click="like"
      />
      <van-goods-action-button
        color="#2450F2"
        type="warning"
        text="加入购物袋"
        @click="addShopGoods"
      />
      <van-goods-action-button
        color="#0C34BA"
        type="danger"
        text="立即购买"
        @click="purchase"
      />
    </van-goods-action>
  </div>
</template>

<script>
import {
  getGoods, getLike, getNotlike, getAddShopcart, getFindAllShopcart,
  getShopcartCount, getModifyShopcartCount, getCommitShopcart
} from "network/menu"
import NarBar from 'components/common/NavBar/NarBar.vue'
import Scroller from 'components/common/scroller/Scroller.vue'
import { mapState } from "vuex"
export default {
  name: "Detail",
  data() {
    return {
      pid: '',
      list: {},
      count: 1,
      counts:0,
      timer: null,
      timers: null,
      collect: false,
      product: {},
      typeList: [],
      shopGoods: {},
      info: {
        pid: "",
        count: "",
        rule: "",
      },
      sum: '',
      shop: false,
      infe: {
        sids: '',
        count:0,
      },
      nowList: {},
      infn: {
        pid: '',
      }


    }
  },
  computed: {
    ...mapState({
      goodList: state => state.goodList,
      shopSids: state => state.shopSids,
      goodList: state => state.goodList,
      backstage: state => state.backstage,

    })
  },
  methods: {
    imgLoad() {
      setTimeout(()=>{
      this.$refs.scroll.refresh()
      },100)
    },
    getCommitShopcart(sid) {
      getCommitShopcart(sid).then(res => {
      })
    },
    getGoods(pid) {
      getGoods(pid).then(res => {
        if (res.data.code === 600) {
          let data = res.data.result[0]
          data.desc = data.desc.split(/\n/);
          //处理常规数据
          let dataArray = ['cream', 'sugar', 'milk', 'tem']
          let arr = [];
          dataArray.forEach(v => {
            if (!data[v]) {
              return;
            }
            let r = {
              title: data[`${v}_desc`],
              //默认激活规格
              activeIndex: 0,
              arr: []
            };
            let rs = data[v].split(/\//);
            rs.forEach(item => {
              let sweet = {
                title: item
              };
              r.arr.push(sweet);
            })
            arr.push(r)
          })
          data.arr = arr;
          this.list = data;


        }
      }).catch(err => {
      })
    },
    toggleRule(item, i) {
      if (item.activeIndex === i) {
        return;
      }
      item.activeIndex = i;
    },

    getLike(pid) {
      getLike(pid).then(res => {
        if (res.data.code === 700) {
          //   跳转登录界面
          this.$toast(res.data.msg);
          clearTimeout(this.timers)
          this.timers = null
          this.timers = setTimeout(() => {
            this.$router.push('/Sign')
          }, 2000)
        }
        if (res.data.code === 800) {
          this.$toast(res.data.msg);
          this.addGoods()
        }
      }).catch(err => {

      })
    },
    //取消收藏 并删除对应的数组
    getNotlike(infn) {
      getNotlike(infn).then(res => {
        if (res.data.code == 900) {
          this.$toast(res.data.msg)
          this.goodList.forEach((v, i) => {
            if (v.pid.indexOf(infn.pid) > -1) {
              this.$store.commit('del_goods', i)
            }
          })
        }
      })
    },
    //收藏或取消收藏
    like() {
      this.collect = !this.collect
      if (this.collect) {
        this.getLike(this.pid)

      } else {
        this.infn.pid = this.pid
        this.getNotlike(this.infn)
      }
    },
    //判断收藏的高亮
    isCollection(pid) {
      this.goodList.forEach(dom => {
        if (dom.pid.indexOf(pid) > -1) {
          this.collect = true;
        }
      })
    },
    //判断购物车的高亮
    getFindAllShopcart() {
      getFindAllShopcart().then(res => {
        if (res.data.code === 5000) {
          if (res.data.result == "") {
            this.shop = false
          } else {
            let arr = res.data.result
            this.isShop(arr);
          }
        }



      })
    },
    isShop(arr) {
      arr.forEach(dom => {
        if (dom.pid.indexOf(this.pid) > -1) {
          this.shop = true;
          this.sum = this.sum
        }
      })
    },
    //加入购物车 并对购物袋的数据进行处理
    getAddShopcart(info) {
      getAddShopcart(info).then(res => {

        if (res.data.code === 700) {
          this.sign()
        }
        if (res.data.code === 3000) {
          this.$toast(res.data.msg);
          this.infe.sid = res.data.sid;
          this.infe.count = this.counts;
          this.getModifyShopcartCount(this.infe)
          this.shop = true
          this.sum += this.count

        }
      })
    },
    getModifyShopcartCount(info) {
      getModifyShopcartCount(info).then(res => {
        if (res.data.code === 6000) {
        }
      })
    },
    getShopcartCount() {
      getShopcartCount().then(res => {
        if (res.data.code == 4000) {
          this.sum = res.data.result
        }
      })
    },



    addShopGoods() {
      this.counts++
      this.typeList = [];
      this.list.arr.forEach(v => {
        this.typeList.push(v.arr[v.activeIndex].title)
      })
      this.info.pid = this.list.pid;
      this.info.count = this.count;
      this.info.rule = this.typeList.join("/");
      this.getAddShopcart(this.info)
      //
      this.getShopcartCount()
    },


    addGoods() {
      //处理格式数据
      this.product.name = this.list.name;
      this.product.enname = this.list.enname;
      this.product.imgUrl = this.list.small_img;
      this.product.count = this.count;
      this.product.price = this.list.price;
      this.product.pid = this.list.pid;
      this.$store.dispatch("addGoods", this.product);

    },
    buyNow() {
      this.typeList = [];
      this.list.arr.forEach(v => {
        this.typeList.push(v.arr[v.activeIndex].title)
      })
      this.nowList.name = this.list.name;
      this.nowList.enname = this.list.enname;
      this.nowList.small_img = this.list.small_img;
      this.nowList.count = this.count;
      this.nowList.price = this.list.price;
      this.nowList.pid = this.list.pid;
      this.nowList.rule = this.typeList.join("/");
      this.$store.commit("buy_now", [this.nowList]);


    },
    sign() {
      this.$toast("token无效请先登录");
      clearTimeout(this.timers)
      this.timers = null
      this.timers = setTimeout(() => {
        this.$router.push('/Sign')
      }, 2000)
    },
    purchase() {
      if (this.backstage) {
        this.buyNow()
        this.$router.push("/ShopSettlement")
        this.$store.commit('submit', true)
      } else {
        this.sign()
      }

    },
    //跳转到购物车
    jump() {
      if (this.backstage) {
        this.$router.push("/Shop")
      } else {
        this.sign()
      }

    }

  },
  mounted() {
    this.pid = this.$router.history.current.params.pid;
    this.getGoods(this.pid)
    this.isCollection(this.pid)
    this.getShopcartCount()
    this.getFindAllShopcart()
    this.counts=0

  },
  activated() {

  },
  components: { NarBar, Scroller },
}
</script>

<style lang="scss" scoped>
.detail {
  height: 100vh;
  //   margin-bottom: 50px;
  background-color: #f7f7f7;
  .back-nav-box {
    position: sticky;
    top: 0;
    z-index: 9999;
  }
  ::v-deep.van-nav-bar .van-icon {
    color: var(--color-tint);
  }
  ::v-deep.van-nav-bar__text {
    color: var(--color-tint);
  }
  .detail-img {
    img {
      width: 100%;
      vertical-align: bottom;
    }
  }
  .specific {
    margin: 0 10px;
    padding: 10px;
    background-color: #fff;
    position: relative;
    top: -20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .pro-info {
      display: flex;
      align-items: center;
      .zh-name {
        font-size: 14px;
      }
      .en-name {
        color: #999;
      }
      .pro-price {
        margin-left: auto;
        font-size: 14px;
        color: #e4393c;
        font-weight: bold;
      }
    }
    .pro-rule {
      margin-top: 30px;
      .pro-rule-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        .pro-sub-rule {
          display: flex;
        }
        .pro-rule-title {
          width: 50px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
        }
        .pro-sub-rule-item {
          width: 60px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          background-color: #e8e8e8;
          margin-right: 10px;
          border-radius: 12px;
          &:last-child {
            margin-right: 0;
          }
          &.active {
            background-color: #0c34ba;
            color: #fff;
          }
        }
      }
    }
    ::v-deep.van-stepper--round .van-stepper__plus {
      background-color: var(--color-tint);
    }
    ::v-deep.van-stepper--round .van-stepper__minus {
      color: var(--color-tint);
      border: 0.02667rem solid var(--color-tint);
    }

    .select-count {
      margin-top: 20px;
      padding: 20px 0;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .select-text {
        font-size: 14px;
        .select-box {
          margin-left: auto;
        }
      }
    }
    .describe {
      margin-top: 20px;
      .describe-title {
        font-size: 14px;
      }

      .describe-text {
        color: #666;
        margin-top: 10px;
        .describe-text-item {
          margin-bottom: 5px;
        }
      }
    }
  }
  .content {
    height: calc(100% - 96px);
  }
}
</style>