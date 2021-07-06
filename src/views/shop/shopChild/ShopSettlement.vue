<template>
  <div class="shop-settlement">
    <div class="nav">
      <nar-bar left-arrow left-text="返回" title="订单结算" />
    </div>
    <scroller
      class="contents"
      :pull-up-load="true"
      :probe-type="3"
      ref="scroll"
    >
      <div class="shop-settlement-box">
        <div class="box">
          <div class="text-head" @click="isShow">
            <div class="text">选择地址</div>
            <img src="~assets/img/other/箭头.png" alt="" />
          </div>
          <div class="text-body">
            <div class="text-body-name">
              {{ addressList == null ? "" : addressList.name }}
            </div>
            <div class="text-body-phone">
              {{ addressList == null ? "" : addressList.tel }}
            </div>
            <div class="text-body-mo">
              {{
                addressList == null
                  ? ""
                  : addressList.isDefault == 1
                  ? "默认"
                  : ""
              }}
            </div>
          </div>
          <div class="text-address">
            {{
              `${addressList == null ? "" : addressList.province}${
                addressList == null ? "" : addressList.city
              }${addressList == null ? "" : addressList.county}${
                addressList == null ? "" : addressList.addressDetail
              }`
            }}
          </div>
        </div>
      </div>

      <div class="shop-settlement-box-goods">
        <div class="title">订单信息</div>
        <div class="goods" v-for="(item, index) in initialList" :key="index">
          <goods :pro="item" @imgLoad="imgLoad" />
        </div>
      </div>
      <div class="shop-settlement-box-js">
        <hr />
        <div class="time">{{ that | showData() }}</div>
        <div class="result">
          <div class="sum">共计 {{ count }} 件</div>
          <div class="price-sum">合计：￥{{ price }}</div>
        </div>
      </div>
    </scroller>

    <div class="btn">
      <van-button type="info" @click="settlement">立即结算</van-button>
    </div>
    <van-action-sheet v-model="show" title="选择地址">
      <div class="content">
        <van-address-list
          v-model="chosenAddressId"
          :list="replaceList"
          default-tag-text="默认"
          @add="onAdd"
          @click-item="onCheckItem"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>

import { getFindAddressByAid, getPay, getFindAddress, getAddShopcart, getAid } from "network/menu"
import { formatDate, padLeftZero } from "../../../components/common/idea/data"

import Goods from '../../../components/common/goods/Goods.vue'
import NarBar from '../../../components/common/NavBar/NarBar.vue'
import Scroller from '../../../components/common/scroller/Scroller.vue'
import { mapState } from "vuex"
export default {
  name: "ShopSettlement",
  data() {
    return {
      count: 0,
      price: 0,
      that: this,
      addressList: {},
      info: {
        sids: '',
        phone: '',
        address: '',
        receiver: '',
      },
      timer: null,
      show: false,
      chosenAddressId: '1',
      arr: [],
      infe: {
        pid: '',
        count: '',
        rule: '',
      },

    }

  },
  filters: {
    showData(that) {
      //1.将时间戳转成Data对象
      const value = new Date().getTime() / 1000
      const date = new Date(value * 1000)
      //2.将时间格式化
      return formatDate(date, 'yyyy-MM-dd:hh:mm:ss')
    }
  },
  computed: {
    ...mapState({
      initialList: state => state.initialList,
      aid: state => state.aid,
      replaceList: state => state.replaceList,
      isSubmit: state => state.isSubmit,
      sids: state => state.sids,
    })
  },

  methods: {

    getFindAddress() {
      getFindAddress().then(res => {
        if (res.data.code === 20000) {
          this.$store.commit('replace_address', res.data.result)
          //
          this.getAid(res.data.result)
          this.replaceList.forEach((v, i) => {
            v.address = `${v.province}${v.city}${v.county}${v.addressDetail}`
            if (v.isDefault === 1) {
              this.arr = this.replaceList.splice(i, 1)
              this.replaceList.unshift(this.arr[0])
            }
          })


        }
      })
    },
    getAid(arr) {
      for (let i in arr) {
        if (arr[i].isDefault == 1) {

          this.$store.commit("get_aid", arr[i].aid);
        }
      }
    },

    getPay(info) {
      getPay(info).then(res => {
        if (res.data.code === 60000) {
          this.$toast(res.data.msg + "正在跳转订单界面")
          clearTimeout(this.timer)
          this.timer = null
          this.timer = setTimeout(() => {
            this.$router.push("/MyOrder");
          }, 2000)

        }

      })
    },

    getFindAddressByAid(aids) {
      getFindAddressByAid(aids).then(res => {
        if (res.data.code === 40000) {
          this.addressList = res.data.result[0];
          //

          //防止空地址报错
          if (this.addressList == null) {
            this.$toast("地址为空，请选择新增地址")
          }
          setTimeout(() => {
            this.result();
            this.imgLoad()
          }, 100)

        }
      })
    },
    //提交订单
    getAddShopcart(info) {
      getAddShopcart(info).then(res => {
        if (res.data.code === 3000) {
          this.info.sids = JSON.stringify([res.data.sid]);
          this.info.phone = this.addressList.tel;
          this.info.address = `${this.addressList.province}${this.addressList.city}${this.addressList.county}${this.addressList.addressDetail}`;
          this.info.receiver = this.addressList.name;
          this.getPay(this.info)
        }
      })
    },
    shopCart() {
      this.infe.pid = this.initialList[0].pid;
      this.infe.count = this.initialList[0].count;
      this.infe.rule = this.initialList[0].rule;
      this.getAddShopcart(this.infe)
    },
    onAdd() {
      this.$router.push("/Address")
    },
    imgLoad() {
    },
    //结算
    settlement() {
      if (this.isSubmit) {
        this.shopCart()
      } else {
        this.info.sids = this.sids;
        this.info.phone = this.addressList.tel;
        this.info.address = `${this.addressList.province}${this.addressList.city}${this.addressList.county}${this.addressList.addressDetail}`;
        this.info.receiver = this.addressList.name;
        this.getPay(this.info)
      }

    },

    result() {
      this.initialList.forEach(v => {
        this.count += v.count
        this.price += parseInt(v.price.substr(0, 2)) * v.count
      })


    },
    isShow() {
      this.show = true
    },
    onCheckItem(item, index) {
      this.$dialog.alert({
        message: "是否修改此地址", //改变弹出框的内容
        showCancelButton: true //展示取水按钮
      })
        .then(() => { //点击确认按钮后的调用
          this.addressList = item
          this.$toast("修改成功")
          this.show = false

        })
        .catch(() => { //点击取消按钮后的调用

        })
    }
  },
  mounted() {
    this.getFindAddressByAid(this.aid)
    this.getFindAddress()
  },
  activated() {
  },
  components: {
    NarBar,
    Goods,
    Scroller
  },
}
</script>

<style lang="scss" scoped>
.shop-settlement {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .shop-settlement-box {
    position: relative;
    top: 10px;
    width: 96%;
    margin: auto;
    border-radius: 10px 10px 0 0;
    box-sizing: content-box;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    .box {
      width: 100%;
      .text-head {
        width: 23%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0px;
        margin-left: 13px;

        .text {
          font-size: 15px;
        }
        img {
          width: 15px;
          height: 15px;
        }
      }
      .text-body {
        width: 70%;
        font-size: 15px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .text-body-name {
          font-weight: bold;
          color: var(--color-tint);
        }
        .text-body-mo {
          width: 30px;
          color: #fff;
          border: 1px solid;
          border-radius: 30px;
          text-align: center;
          font-size: 12px;
          line-height: 18px;
          background: var(--color-tint);
        }
      }
      .text-address {
        width: 90%;
        font-size: 14px;
        padding: 10px 0px;
        padding-left: 12px;
        text-align: start;
        white-space: nowrap;
        word-wrap: break-word;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*显示行数*/
        overflow: hidden;
      }
    }
  }
  .shop-settlement-box-goods {
    position: relative;
    top: 25px;
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
  }
  .shop-settlement-box-js {
    position: relative;
    top: 25px;
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
  .btn {
    width: 100%;
    height: 70px;
    background: #fff;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .van-button {
    width: 96%;
    height: 40px;
    color: #fff;
    background: var(--color-tint);
    border: 0 solid;
    border-radius: 50px;
  }
  .content {
    width: 100%;
    text-align: end;

    ::v-deep.van-button {
      width: 100%;
    }
    ::v-deep.van-tag--danger {
      background-color: var(--color-tint);
    }
    ::v-deep.van-address-item .van-radio__icon--checked .van-icon {
      background-color: var(--color-tint);
      border: 1px solid var(--color-tint);
    }
  }
  ::v-deep.van-action-sheet__header {
    display: flex;
    padding-left: 30px;
    font-size: 20px;
  }
  ::v-deep.van-icon-edit {
    display: none;
  }
  .contents {
    height: calc(100% - 166px);
  }
}
</style>