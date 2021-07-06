<template>
  <div class="collection-search">
    <div class="nav-box">
      <nar-bar leftArrow leftText="返回" />
      <div class="search-box">
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
      </div>
    </div>
    <div class="collection-search-bg"></div>
    <scroller class="content" :pull-up-load="true" :probe-type="3" ref="scroll">
      <div class="collection-search-goods-box">
        <div class="text-err" v-show="searchList.length == 0">
          <van-empty
            class="custom-image"
            image="error"
            description="很抱歉，暂无数据更新"
          />
        </div>
        <div
          class="collection-search-goods"
          v-for="(item, index) in searchList"
          :key="index"
        >
          <div class="goods-box">
            <div class="goods">
              <div class="goods-img" @click="jump(item.pid)">
                <img :src="item.imgUrl" alt="" @load="imgLoad" />
              </div>
              <div class="title">{{ item.name }}</div>
              <div class="title-eg">{{ item.enname }}</div>
              <div class="price-box">
                <div class="price">${{ item.price }}</div>
                <div class="del">
                  <img
                    src="~assets/img/other/删除.png"
                    alt=""
                    @click="del(index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import NarBar from 'components/common/NavBar/NarBar.vue'
import { mapState } from "vuex"
import Scroller from 'components/common/scroller/Scroller.vue'
import { getFindLike } from "network/menu"
export default {
  name: 'CollectionSearch',
  data() {
    return {
      value: '',
    }
  },
  computed: {
    ...mapState({
      goodList: state => state.goodList,
      searchList: state => state.searchList,
    })
  },
  methods: {

    del(index) {
      this.$store.commit("del_goods", index)
      this.searchList.splice(index, 1)
    },
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    onSearch(val) {
      this.$store.commit("search_goods", "")
      this.goodList.forEach(v => {
        if (v.name.indexOf(val) !== -1 && val !== "") {
          this.getFindLike(v.pid)

          this.$store.commit("search_goods", v)
        } else {
          this.$toast("未查询到正确的商品")
        }
      })

    },
    onCancel() {
    },
    getFindLike(pid) {
      getFindLike(pid).then(res => {

        if (res.data.code === 1001) {
          this.$toast(res.data.msg);
        }
        if (res.data.code === 1000) {
          this.$toast(res.data.msg)

        }
      })
    },
    jump(pid) {
      let path = `/detail/${pid}`
      this.$router.push(path)
    },
  },
  mounted() {
    this.$store.commit("search_goods", "")
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
.collection-search {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .nav-box {
    display: flex;
    justify-content: space-between;
    ::v-deep.van-nav-bar__left {
      position: absolute;
      width: 90px;
      padding: 0;
      padding-left: 7px;
      background-color: #fff;
    }
    ::v-deep.van-search {
      position: relative;
      z-index: 99999;
      width: 285px;
      padding: 6px 0;
      padding-right: 11px;
      padding-left: 10px;
    }
    ::v-deep.van-search__content {
      padding-right: 20px;
      border-radius: 20px 0 0 20px;
    }
    .search-box {
      box-sizing: content-box;
    }
  }
  .collection-search-bg {
    width: 100%;
    height: 100px;
    background-color: var(--color-tint);
  }
  .collection-search-goods-box {
    position: relative;
    top: -20px;
    width: 96%;
    min-height: 200px;
    margin: auto;
    border-radius: 10px 10px 0 0;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
  }
  .collection-search-goods {
    .goods-box {
      padding: 10px;
      .goods {
        width: 100px;
        height: 180px;
        .goods-img {
          width: 100%;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          font-size: 15px;
          margin-top: 10px;
          @include text();
        }
        .title-eg {
          font-size: 12px;
          margin: 10px 0px;
          @include text();
        }
        .price-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price {
            font-size: 13px;
            font-weight: bold;
            color: var(--color-tint);
          }
          .del {
            width: 15px;
            height: 15px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .text-err {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    font-size: 15px;
    color: #999;
  }
  .content {
    height: calc(100% - 46px);
  }
}
</style>