<template>
  <div class="shop-order">
    <div class="nav">
      <nar-bar leftArrow leftText="返回" title="我的订单" />
    </div>
    <div class="collection-all-bg"></div>
    <scroller class="content" :pull-up-load="true" :probe-type="3" ref="scroll">
      <div class="item-box">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="item.id"
          @click="addActive(index)"
          :class="{ active: activeIndex == index }"
        >
          {{ item.title }}
        </div>
      </div>

      <div class="all-order">
        <div class="title">
          <div class="text-head">
            <div class="text-left">NO{{ new Date().getTime() }}</div>
            <div class="text-right-box">
              <div>已完成</div>
              <img src="" alt="" />
            </div>
          </div>
          <div class="goods" v-for="(item, index) in 1" :key="index">
            <complete-goods />
          </div>
        </div>
      </div>
      <div class="shop-settlement-box-js">
        <hr />
        <div class="time">{{ "" | showData() }}</div>
        <div class="result">
          <div class="sum">共计 {{ count }} 件</div>
          <div class="price-sum">合计：￥{{ price }}</div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import CompleteGoods from 'components/common/completeGoods/CompleteGoods.vue'
import { formatDate } from "components/common/idea/data"

import NarBar from 'components/common/NavBar/NarBar.vue'
import Scroller from 'components/common/scroller/Scroller.vue'
export default {

  name: "ShopOrder",
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
    }
  },
  filters: {
    showData() {
      //1.将时间戳转成Data对象
      const value = new Date().getTime() / 1000
      const date = new Date(value * 1000)
      //2.将时间格式化
      return formatDate(date, 'yyyy-MM-dd:hh:mm:ss')
    }
  },
  methods: {
    addActive(index) {
      if (this.activeIndex == index) {
        return;
      }
      this.activeIndex = index;
    }
  },
  mounted() {

  },
  components: {
    NarBar,
    Scroller,
    CompleteGoods
  },
}
</script>

<style lang="scss" scoped>
.shop-order {
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
    .item {
      height: 50px;
      font-size: 16px;

      line-height: 50px;
    }
  }

  .all-order {
    position: relative;
    top: -10px;
    width: 96%;
    min-height: 150px;
    margin: auto;
    border-radius: 10px 10px 20px 20px;
    background: #fff;
    padding-bottom: 20px;
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
    }
  }
  .shop-settlement-box-js {
    position: relative;
    top: -10px;
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
      padding: 0 10px;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }

  .active {
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
  .content {
    height: calc(100% - 46px);
  }
}
</style>