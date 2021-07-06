<template>
  <div class="my-order">
    <div class="nav-menu-box">
      <nav-menu leftArrow leftText="返回" title="我的订单" />
    </div>
    <div class="collection-all-bg"></div>
    <div
      v-show="isTabFixed"
      class="item-box"
      :class="{ 'tab-control': isTabFixed }"
    >
      <div
        class="item"
        v-for="(item, index) in list"
        :key="item.id"
        @click="addActive(index)"
        :class="{
          active: activeIndex == index,
        }"
      >
        {{ item.title }}
      </div>
    </div>
    <scroller
      class="content"
      :pull-up-load="true"
      :probe-type="3"
      ref="scroll"
      @scroll="contentText"
    >
      <div class="item-box" v-show="!isTabFixed">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="item.id"
          @click="addActive(index)"
          :class="{
            active: activeIndex == index,
          }"
        >
          {{ item.title }}
        </div>
      </div>

      <div
        class="all-order"
        v-show="activeIndex == 0 || activeIndex == 2 ? true : false"
        v-for="(item, index) in finshList"
        :key="index * 0.111"
      >
        <div class="title">
          <div class="text-head">
            <div class="text-left">{{ item.oid }}</div>
            <div class="text-right-box">
              <div class="finsh">已完成</div>
              <img
                src="~assets/img/other/删除.png"
                alt=""
                @click="del(index)"
              />
            </div>
          </div>
          <div class="goods">
            <complete-goods :pro="item" @imgLoad="imgLoad" />
          </div>
        </div>
        <div class="my-settlement-box-js">
          <hr />
          <div class="time">{{ rTime(item.updatedAt)}}</div>
          <div class="result">
            <div class="sum">共计 {{ item.count }} 件</div>
            <div class="price-sum">
              合计：￥{{ item.price.substr(0, 2) * item.count }}.00
            </div>
          </div>
        </div>
      </div>

      <div
        class="all-order-conduct"
        v-show="activeIndex == 0 || activeIndex == 1 ? true : false"
        v-for="(item, index) in orderList"
        :key="item.id + index"
      >
        <div class="title">
          <div class="text-head">
            <div class="text-left">{{ item.oid }}</div>
            <div class="text-right-box">
              <div class="finsh" @click="receiv(index)">确认收货</div>
            </div>
          </div>
          <div class="goods">
            <complete-goods :pro="item" @imgLoad="imgLoad" />
          </div>
        </div>
        <div class="my-settlement-box-js">
          <hr />
          <div class="time">{{  rTime(item.updatedAt) }}</div>
          <div class="result">
            <div class="sum">共计 {{ item.count }} 件</div>
            <div class="price-sum">
              合计：￥{{ item.price.substr(0, 2) * item.count }}.00
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <transition
      enter-active-class="animate__animated animate__heartBeat "
      leave-active-class="animate__animated animate__rubberBand animate__faster	300ms"
    >
      <back-top v-show="isTop" @click.native="backClick" />
    </transition>
  </div>
</template>

<script>
import { getFindOrder, getReceive, getRemoveOrder } from "network/menu"
import CompleteGoods from '../../../components/common/completeGoods/CompleteGoods.vue'
import { formatDate, padLeftZero } from "../../../components/common/idea/data"
import BackTop from 'components/common/backTop/BackTop.vue'

import Scroller from '../../../components/common/scroller/Scroller.vue'
import { mapState } from "vuex"
import NavMenu from '../../../components/common/Nav/NavMenu.vue'
export default {

  name: "MyOrder",
  data() {
    return {
      list: [
        {
          title: "全部",
          id: '1',
        },
        {
          title: "进行中",
          id: '2',
        },
        {
          title: "已完成",
          id: '3',
        },
      ],
      activeIndex: 0,
      //确认收货
      orderList: {},
      //已完成
      finshArray: [],
      isShow: false,
      tiemr: null,
      tabOffsetTop: 80,
      isTabFixed: false,
      count: [],
      price: 0,
      info: {
        oid: [],
      },
      select: '',
      delete: '',
      infe: {
        oid: '',
      },
      isTop: false,
    }
  },
  computed: {
    ...mapState({
      order: state => state.order,
      finshList: state => state.finshList
    })
  },
  methods: {
    //时间格式的转换
    rTime(date) {
      let json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    getRemoveOrder(info) {
      getRemoveOrder(info).then(res => {
        if (res.data.code === 90000) {
          this.$toast(res.data.msg)
          this.$store.commit("modify", this.delete)
        }
      })
    },

    getReceive(info) {
      getReceive(info).then(res => {
        if (res.data.code === 80000) {
          this.$toast(res.data.msg)
          this.finshArray.push(this.orderList[this.select]);
          this.orderList.splice(this.select, 1);
          this.$store.commit("finsh_list", this.finshArray)


        }
      })
    },
    getFindOrder(state) {
      getFindOrder(state).then(res => {
        if (res.data.code === 70000) {
          this.orderList = res.data.result
          this.count = 0;
          this.price = 0;
          this.imgLoad()

        }
      })
    },
    del(index) {

      this.$dialog.alert({
        message: "确认删除该订单吗,删除后无法恢复", //改变弹出框的内容
        showCancelButton: true //展示取水按钮
      })
        .then(() => { //点击确认按钮后的调用
          this.delete = index;
          this.infe.oid = this.finshList[this.delete].oid
          this.getRemoveOrder(this.infe)
        })
        .catch(() => { //点击取消按钮后的调用

        })
    },

    receiv(index) {
      this.select = index;
      this.info.oid = this.orderList[index].oid
      this.getReceive(this.info, index);
    },

    addActive(index) {
      if (this.activeIndex == index) {
        return;
      }
      this.activeIndex = index;
      this.getFindOrder(index)
    },

    imgLoad() {
      clearTimeout(this.tiemr)
      this.tiemr = null
      this.tiemr = setTimeout(() => {
        this.$refs.scroll.refresh()

      }, 100)
    },
    contentText(position) {
      //1.判断BackTop是否显示
      this.isTop = (-position.y) > 200
      //2.决定是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },


  },
  mounted() {
    this.getFindOrder(0)
  },
  components: {
    Scroller,
    CompleteGoods,
    NavMenu,
    BackTop,

  },
}
</script>

<style lang="scss" scoped>
@mixin box() {
  position: relative;
  width: 96%;
  min-height: 150px;
  margin: auto;
  border-radius: 10px 10px 20px 20px;
  background: #fff;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.my-order {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .collection-all-bg {
    width: 100%;
    height: 100px;
    background-color: var(--color-tint);
  }
  .item-box {
    position: relative;
    top: -20px;
    width: 96%;
    min-height: 50px;
    margin: auto;
    border-radius: 10px 10px 0 0;
    background: #fff;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    z-index: 99999;
    .item {
      height: 50px;
      font-size: 16px;

      line-height: 50px;
    }
  }
  .title {
    font-size: 15px;
    padding: 10px 0px;
    margin-left: 13px;
  }
  .text-head {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 26px;
    line-height: 26px;
    padding: 0px 10px;
    .text-right-box {
      display: flex;
      padding-right: 10px;
      .finsh {
        padding-right: 10px;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .all-order {
    @include box();
  }
  .all-order-conduct {
    @include box();
  }

  .my-settlement-box-js {
    position: relative;
    top: 10px;
    width: 96%;
    margin: auto;
    border-radius: 20px 20px 0 0;
    background: #fff;
    hr {
      width: 92%;
      border-top: 1px solid #fffefe;
      border-style: dotted;
      margin: auto;
      opacity: 0.5;
    }
    .time {
      padding: 20px 0px;
      margin-left: 13px;
    }
    .result {
      width: 100%;
      height: 30px;
      padding: 0 10px;
      // padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
  .tab-control {
    position: relative;
    top: -100px;
    width: 100%;
    min-height: 50px;
    border-radius: 0;
    background: #f3f3f3;
  }

  .active {
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
  .content {
    height: calc(100% - 156px);
  }
}
</style>