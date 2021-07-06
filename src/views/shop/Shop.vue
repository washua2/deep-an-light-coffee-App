<template>
  <div class="shop-box">
    <nar-bar
      left-arrow
      left-text="返回"
      title="商品详情"
      :right-text="flag ? '完成' : '编辑'"
      @toggle="toggle"
    />
    <scroller class="content" :pull-up-load="true" :probe-type="3" ref="scroll">
      <div class="bg">
        <img src="~assets/img/tabbar/shopbg.jpg" alt=""  @load="imgLoad"/>
      </div>

      <div v-for="(item, index) in searchList" :key="index">
        <shopping-cart
          :pro="item"
          :index="index"
          @simpleSelect="getSimpleSelectStatus"
          @addMoney="addMoney"
          @removeSingle="removeSingle"
        />
      </div>
      <div class="text-err" v-show="searchList.length == ''">
        <van-empty
          class="custom-image"
          image="error"
          description="很抱歉，暂无数据更新"
        />
      </div>
    </scroller>
    <div class="select-box">
      <div class="check-all">
        <van-checkbox v-model="allCheck" @click="allSelect">{{
          allCheck ? "不全选" : "全选"
        }}</van-checkbox>
      </div>

      <div class="select">
        <div class="select-text">
          <div class="heji">合计：</div>
          <span
            >￥<span>{{ this.sumMoney }}</span
            >.00
          </span>
        </div>
        <van-button type="danger" :class="flag ? '' : 'active'" @click="del">{{
          flag ? "删除选择" : "提交订单"
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFindAllShopcart, getCommitShopcart, getModifyShopcartCount, getDeleteShopcart, } from "network/menu"


import NarBar from '../../components/common/NavBar/NarBar.vue'
import ShoppingCart from '../../components/common/ShoppingCart/ShoppingCart.vue'
import Scroller from '../../components/common/scroller/Scroller.vue';

import { mapState } from "vuex"
export default {

  name: 'Shop',
  data() {
    return {
      searchList: [],
      flag: false,
      info: {
        sids: '',
      },
      shoppingSids: '',
      allCheck: false,
      sumMoney: 0,
      //提交订单的sid
      sid: [],
      isShow: false,
    }
  },
  methods: {
    //提交订单页面查询需要购买商品接口

    //添加/减少商品金额
    addMoney(value, infe) {
      this.getModifyShopcartCount(infe)

    },
    //计算金额
    money() {
      let sumMoney = 0
      this.searchList.forEach(v => {
        if (v.checked) {
          sumMoney += parseInt(v.price.substr(0, 2)) * v.count
        }
      })
      this.sumMoney = sumMoney
    },
    //删除相应商品
    removeSingle(index, sid) {
      this.searchList.splice(index, 1)
      this.info.sids = JSON.stringify([sid])
      this.getDeleteShopcart(this.info)
    },
    //修改购物车商品数量接口
    getModifyShopcartCount(info) {
      getModifyShopcartCount(info).then(res => {
        if (res.data.code === 6000) {
          this.money()
        }
      })
    },
    //删除 一个或者多个 购物车商品接口
    getDeleteShopcart(info) {
      getDeleteShopcart(info).then(res => {
        if (res.data.code === 7000) {
          this.$toast(res.data.msg);
          //重新渲染页面
          this.getFindAllShopcart()
          //重新定义全选
          this.getSimpleSelectStatus()
          //当没有商品使让全选为未选中状态


        }
      })
    },
    //提交订单页面查询需要购买商品接口
    getCommitShopcart(sid) {
      getCommitShopcart(sid).then(res => {
        if (res.data.code === 50000) {
          let result = res.data.result
          this.$store.commit('submit', false)

          let sids = sid
          //订单详情页面信息
          this.$store.commit("initial", { result, sids })
        }
      })
    },


    //查询商品 并重新赋值
    getFindAllShopcart() {
      getFindAllShopcart().then(res => {
        if (res.data.code === 700) {
          //   跳转登录界面

        }
        if (res.data.code === 5000) {
          //token未查询成功 不能查询商品
          this.isShow = true
          res.data.result.forEach(v => {
            v.checked = false;
          })
        }
        this.searchList = res.data.result
        //重新计算金额
        this.money()
        //取消全选状态
        if (this.searchList.length === 0) {
          this.allCheck = false
        }


      })
    },
    //全选状态 判断是否为true 清空金额
    allSelect() {
      //调用计算金额的方法
      this.money()
      this.searchList.forEach(v => {
        v.checked = this.allCheck
      })
    },

    //全选状态跟单选状态关联
    getSimpleSelectStatus() {
      //调用计算金额的方法
      this.money()
      for (let i = 0; i < this.searchList.length; i++) {
        if (!this.searchList[i].checked) {
          this.allCheck = false;
          return;
        }
      }
      this.allCheck = true;

    },
    //判断数据
    idealStyle() {
      if (this.backstage) {
        this.getFindAllShopcart()
      } else {
        this.$toast("token为查询成功，请先登录");
        clearTimeout(this.timers)
        this.timers = null
        this.timers = setTimeout(() => {
          this.$router.push('/Sign')
        }, 2000)
      }
    },



    //加载下拉
    imgLoad() {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 100)
    },
    //切换提交和删除按钮
    toggle(flag) {
      this.flag = flag;
    },
    //删除或提交商品
    del() {
      if (this.flag) {
        this.searchList.forEach(v => {
          if (v.checked) {
            let sidArr1 = [];
            sidArr1.push(v.sid)
            this.info.sids = JSON.stringify(sidArr1)
            this.getDeleteShopcart(this.info)
          }
        })


      } else {
        if (this.sumMoney !== 0) {
          this.$router.push("/ShopSettlement")
          this.searchList.forEach(v => {
            if (v.checked) {
              //转成数组
              this.sid.push(v.sid)

            }
          })
          this.sid = (JSON.stringify(this.sid))
          this.getCommitShopcart(this.sid)
        } else {
          this.$toast("请选择需要购买的商品")
        }


      }
    }
  },

  computed: {
    ...mapState({
      backstage: state => state.backstage,
    }),
  },
  updated() {
    //加载图片 

  },
  mounted() {
    this.getFindAllShopcart()
  },
  activated() {
    this.idealStyle()

  },
  components: {
    NarBar,
    ShoppingCart,
    Scroller
  },
}
</script>

<style lang="scss" scoped>
.shop-box {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .bg {
    width: 100%;
    height: 130px;
    overflow: hidden;
    img {
      width: 100%;
      position: relative;
      top: -60px;
    }
  }
  .text-err {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    font-size: 15px;
    color: #999;
  }
  .select-box {
    position: fixed;
    bottom: 50px;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .check-all {
      position: relative;
      width: 15%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      font-size: 15px;
      ::v-deep.van-checkbox__label {
        position: absolute;
        right: -27px;
      }
    }
    .select {
      display: flex;
      .select-text {
        height: 50px;
        font-family: inherit;
        color: #000;
        margin-right: 10px;
        line-height: 50px;
        .heji {
          position: absolute;
          left: 127px;
          top: 2px;
          font-size: 15px;
        }
        span {
          color: var(--color-tint);
          font-size: 14px;
          span {
            font-size: 20px;
          }
        }
      }
      ::v-deep.van-button.van-button--danger.van-button--normal {
        margin: 5px 0;
        margin-right: 10px;
        border: 0 solid;
        border-radius: 20px;
      }
    }
    ::v-deep .van-button {
      width: 125px;
      height: 40px;
    }
  }
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
  .active {
    background: var(--color-tint);
  }
  .content {
    height: calc(100% - 200px);
  }
}
</style>