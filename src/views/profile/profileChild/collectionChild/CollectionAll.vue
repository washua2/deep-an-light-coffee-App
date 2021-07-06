<template>
  <div class="collection-all">
    <nar-bar leftArrow leftText="返回" title="我的收藏" />
    <div class="collection-all-bg"></div>
    <scroller class="content" :pull-up-load="true" :probe-type="3" ref="scroll">
      <div class="collection-all-goods-box">
         <div class="text-err" v-show="goodList.length == 0">
          <van-empty
            class="custom-image"
            image="error"
            description="很抱歉，暂无数据更新"
          />
        </div>
        <div
          class="collection-all-goods"
          v-for="(item, index) in goodList"
          :key="index"
           
        >
          <div class="goods-box" >
            <div class="goods">
              <div class="goods-img"  @click="jump(item.pid)">
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
import NarBar from '../../../../components/common/NavBar/NarBar.vue'
import { mapState } from "vuex"
import Scroller from '../../../../components/common/scroller/Scroller.vue'
export default {
  name: 'CollectionAll',
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      goodList: state => state.goodList
    })
  },
  methods: {
    del(index) {
      this.$store.commit("del_goods", index)
    },
    imgLoad() {
      this.$refs.scroll.refresh()
    },
       jump(pid) {
      let path = `/detail/${pid}`
      this.$router.push(path)
    },
  },
  mounted() {
    this.imgLoad()
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
.collection-all {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .collection-all-bg {
    width: 100%;
    height: 120px;
    background-color:  var(--color-tint);
 

  }
  .collection-all-goods-box {
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
  .collection-all-goods {
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
            color:  var(--color-tint);
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