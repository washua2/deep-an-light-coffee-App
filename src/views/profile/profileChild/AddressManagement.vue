<template>
  <div class="address-management-search">
    <div class="nav-box">
      <nar-bar leftArrow leftText="返回" title="地址列表" />
    </div>
    <div class="address-management-search-bg"></div>

    <scroller class="content" :pull-up-load="true" :probe-type="3" ref="scroll">
      <div class="address-management-search-goods-box">
      <div class="text-err" v-show="isShow">
          <van-empty
            class="custom-image"
            image="error"
            description="很抱歉，暂无数据更新"
          />
        </div>
        <div class="box" v-for="(item, index) in addressList" :key="index">
          <div class="text-box">
            <div class="text-head">
              <div class="head-name">{{ item.name }}</div>
              <div class="head-pho">{{ item.tel }}</div>
              <div class="head-default">
                {{ item.isDefault == 1 ? "默认" : "" }}
              </div>
            </div>
            <div class="text-address">{{ item.addressDetail }}</div>
          </div>
          <div class="bj" @click="changeAddress(index)">
            <img src="~assets/img/other/编辑.png" alt="" @load="imgLoad" />
          </div>
        </div>
      </div>
    </scroller>
    <div class="btn">
      <van-button type="info" @click="address">新增地址</van-button>
    </div>
     
  </div>
</template>

<script>
import { getFindAddress } from "network/menu"
import NarBar from 'components/common/NavBar/NarBar.vue'
import Scroller from 'components/common/scroller/Scroller.vue'
export default {
  name: 'AddressManagement',
  data() {
    return {
      value: '',
      addressList: {},
      aid: '',
      isShow:false,
    }
  },
  methods: {
    getFindAddress() {
      getFindAddress().then(res => {
        if (res.data.code === 20000) {
          // this.$toast(res.data.msg)
          this.addressList = res.data.result
          if(this.addressList.length==0){
            this.isShow=true
          }
          this.getAid(res.data.result)
          let arr = this.addressList
          arr.forEach((v, i) => {
            if (v.isDefault === 1) {
              let newArr = arr.splice(i, 1);
              arr.unshift(newArr[0])
              return
            } else {
              v.isDefault = 0
            }
          
          })


        }
      })
    },

    submit() {

    },
    address() {
      this.$router.push("/Address")
    },
    changeAddress(index) {
      this.aid = this.addressList[index].aid;
      this.$store.commit("change_address", this.addressList[index])
      this.$router.push(`/AddressChange/${this.aid}`)
    },
    getAid(arr) {
      for (let i in arr) {
        if (arr[i].isDefault == 1) {
          
          this.$store.commit("get_aid", arr[i].aid);
        }
      }
    },
    imgLoad() {
      setTimeout(() => {
        this.$refs.scroll.refresh()

      }, 100)
    },

  },
  mounted() {

  },
  activated() {
    this.getFindAddress()

  },

  components: {
    NarBar,
    Scroller,
  }

}
</script>

<style lang="scss" scoped>
@mixin text() {
  text-align: start;
  white-space: nowrap;
  word-wrap: break-word;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /*显示行数*/
  overflow: hidden;
}
.address-management-search {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;

  .address-management-search-bg {
    width: 100%;
    height: 100px;
    background-color: var(--color-tint);
  }
  .address-management-search-goods-box {
    position: relative;
    top: -20px;
    width: 96%;
    min-height: 200px;
    margin: auto;
    border-radius: 10px 10px 0 0;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    .box {
      width: 100%;
      height: 100px;
      border-bottom: 1px solid #e8e8e8;
      margin: 0px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text-box {
        width: 100%;
        padding-left: 10px;
        .text-head {
          width: 70%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 16px;
          color: #000;
          .head-default {
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
          width: 260px;
          color: #000;
          font-size: 14px;
          padding-left: 2px;
          padding-top: 10px;
          @include text();
        }
      }
      .bj {
        width: 20px;
        height: 20px;
        margin-right: 30px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .btn {
    width: 100%;
    height: 50px;
    background: #fff;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep .van-button {
    width: 90%;
    height: 40px;
    color: #fff;
    background: var(--color-tint);
    border: 0 solid;
    border-radius: 50px;
  }
   .text-err {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    font-size: 15px;
    color: #999;
  }

  .content {
    height: calc(100% - 186px);
  }
}
</style>