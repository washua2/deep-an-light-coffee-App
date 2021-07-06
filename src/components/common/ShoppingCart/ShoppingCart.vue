<template>
  <div class="shopping-cart">
    <div class="shopping-cart" >
      <van-swipe-cell>
        <div class="left">
          <van-checkbox
            v-model="pro.checked"
            @change="simpleSelect(pro.checked)"
          >
          </van-checkbox>
        </div>
        <van-card
          :price="pro.price"
          :desc="pro.enname"
          :title="pro.name + ' ' + pro.rule"
          class="goods-card"
          :thumb="pro.small_img"
        />
        <div class="right">
          <van-stepper
            v-model="pro.count"
            @change="changeNumber(pro)"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="removeSingle"
          />
        </template>
      </van-swipe-cell>
    </div >
  </div>
</template>

<script>
import { getShopcartRows, getFindAllShopcart } from "network/menu"
import { mapState } from "vuex"
export default {
  name: 'ShoppingCart',
  props: {
    pro: {
      type: Object,
      default() {
        return [];
      }
    },
    index: {
      type: Number,
      default() {
        return 0;
      }
    }

  },
  data() {
    return {
      timer: null,
      //修改商品数量
      info: {
        sid: '',
        count: '',
      },


      checked: true,





    }
  },

  methods: {
    //数量change事件
    changeNumber(pro) {
      //修改商品数量
      this.info.sid = pro.sid
      this.pro.count = pro.count
      this.info.count = pro.count
      //传递value值
      this.addMoney()
    },
    //单选change事件
    simpleSelect(checked) {
      this.$emit("simpleSelect");
    },
    //添加增额事件
    addMoney() {
      this.$emit('addMoney', this.pro.count, this.info)
    },

    //查询商品条数
    getShopcartRows() {
      getShopcartRows().then(res => {

      })
    },
    //删除相应的商品
    removeSingle() {
      this.$emit("removeSingle", this.index, this.pro.sid)
    },

    // 查询用户所有购物车数据接口
    getFindAllShopcart() {
      getFindAllShopcart().then(res => {
        if (res.data.code === 5000) {
        }
      })
    },
  },
  computed: {
    ...mapState({
    })
  },
  mounted() {
    this.getShopcartRows()
  },
  activated() {
    this.getFindAllShopcart()

  }
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  width: 96%;
  height: 100px;
  background-color: #fff;
  margin: auto;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  position: relative;

  .left {
    width: 10%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
}

::v-deep.van-card__title {
  display: flex;
  width: 150px;
  font-size: 14px;
  color: #999;
}
::v-deep.van-card__desc {
  color: #999;
  margin-top: 10px;
}
::v-deep.van-card__price {
  font-size: 16px;
  color: var(--color-tint);
  font-weight: bold;
}
.right {
  ::v-deep.van-stepper--round .van-stepper__plus {
    background-color: var(--color-tint);
  }
  ::v-deep.van-stepper--round .van-stepper__minus {
    color: var(--color-tint);
    border: 0.02667rem solid var(--color-tint);
  }
  ::v-deep.van-stepper.van-stepper--round {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
}

.goods-card {
  position: relative;
  width: 380px;
  background-color: #fff;
  padding-left: 0;
  margin: 0;
}

.delete-button {
  height: 100%;
}
</style>