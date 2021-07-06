<template>
  <div class="menu">
    <van-search
      v-model="value"
      shape="round"
      background="#fff"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <div class="menu-box">
      <div v-show="isShow">
        <ul class="menu-select">
          <li
            :class="{ active: index == count }"
            v-for="(item, index) in list"
            :key="index"
            @click="addActive(index, item.type, item.id)"
          >
            {{ item.typeDesc }}
          </li>
        </ul>
      </div>
      <scroller
        class="content"
        :class="isShow ? 'cont' : ''"
        :pull-up-load="true"
        :probe-type="3"
        ref="scroll"
      >
        <div class="menu-collection-search-bg" v-show="!isShow" />

        <div v-show="isShow">
          <div class="menu-goods-box">
            <div class="menu-goods" v-for="(item, index) in arr" :key="index">
              <product
                :pro="item"
                @imgLoad="imgLoad"
                @click.native="jumpDatail(item.pid)"
              />
            </div>
          </div>
        </div>
        <menu-collection v-show="!isShow" />
      </scroller>
    </div>

    <div class="back" @click="backMenu" v-show="!isShow" ref="back">
      <van-button plain type="info"></van-button>
    </div>
  </div>
</template>

<script>
import { getMenu, getMenuType, getSearch } from "network/menu"
import Product from '../../components/common/Product/Product.vue';
import Scroller from '../../components/common/scroller/Scroller.vue'
import MenuCollection from './menuChild/MenuCollection.vue';
export default {
  name: 'Menu',
  data() {
    return {
      value: '',
      list: [],
      count: 0,
      type: '',
      arr: [],
      isShow: true,
      timer: null,
      flag: 0,
    }
  },
  watch: {
    count() {
    }
  },
  methods: {
    change() {
      clearTimeout(this.timer)
      this.timer = null
      this.timer = setTimeout(() => {
        this.imgLoad()
      }, 100)
    },
    jumpDatail(pid) {
      let path = `/detail/${pid}`
      this.$router.push(path)
    },
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    backMenu() {
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

    addActive(index, type, id) {
      if (this.count === index) {
        return
      }
      this.count = index;
      this.type = type;
      this.getMenuType();

    },
    onSearch(val) {
      this.isShow = false;
      this.change();
      this.$store.commit("menu_search", "")
      this.arr.forEach(v => {
        if (v.name.indexOf(val) > -1 && val !== "") {
          this.getSearch(val)
          this.$store.commit("menu_search", v)
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


    getMenu() {
      getMenu().then(res => {
        if (res.data.code == 400) {
          res.data.result.unshift({ type: 'isHot', typeDesc: '热卖推荐', id: 0 })
          this.list = res.data.result
        }
      }).catch(err => {
      })
    },
    getMenuType() {
      let keys = '';
      let values = '';
      if (this.count === 0) {
        keys = 'isHot';
        values = "1"
      } else {
        keys = 'type';
        values = this.type;
      }
      getMenuType(keys, values).then(res => {
        if (res.data.code == 500) {
          this.arr = res.data.result;

        }
      }).catch(err => {
      })
    }
  },
  created() {
    this.getMenu();
    this.getMenuType();

  },
  mounted() {

  },
  components: {
    Product,
    Scroller,
    MenuCollection
  },


}
</script>

<style lang="scss" scoped>
.menu {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  ::v-deep .van-cell {
    color: var(--color-tint);
  }
  ::v-deep .van-search {
    position: sticky;
    top: 0;
    z-index: 99999;
  }
  .menu-collection-search-bg {
    width: 100%;
    height: 100px;
    background-color: var(--color-tint);
  }
  .menu-box {
    width: 100%;
    height: 100vh;
    // display: flex;

    .menu-select {
      width: 20%;
      height: calc(100% - 10px);
      background: #f7f7f7;
      position: fixed;
      top: 54px;
      z-index: 99999;

      li {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
      }
    }
    // .menu-content {

    // overflow-y: auto;
    .menu-goods-box {
      display: flex;
      flex-wrap: wrap;
      margin-left: 75px;
      .menu-goods {
        width: calc(50% - 5px);
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
    // }
  }
  .content {
    height: calc(100% - 103px);
    // padding: 10px;
  }
  .cont {
    padding: 0 10px;
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
      background-image: url("~assets/img/other/返回菜单.png");
      background-repeat: no-repeat;
      background-size: 150% 100%;
      background-position: center;
    }
  }

  .active {
    color: var(--color-tint);
    background: #fff;
  }
}
</style>