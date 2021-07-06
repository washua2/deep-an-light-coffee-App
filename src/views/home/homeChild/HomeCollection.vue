<template>
  <div class="home-collection-search">
    <div class="home-collection-search-home-goods-box">
      <div
        class="home-collection-search-goods"
        v-for="(item, index) in homeList"
        :key="index"
        @click="jump(item.pid)"
      >
        <div class="home-goods-box">
          <div class="goods">
            <div class="goods-img">
              <img :src="item.smallImg" alt="" />
            </div>
            <div class="title">{{ item.name }}</div>
            <div class="title-eg">{{ item.enname }}</div>
            <div class="price-box">
              <div class="price">${{ item.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: 'HomeCollection',
  data() {
    return {
      value: '',
    }
  },
  computed: {
    ...mapState({
      homeList: state => state.homeList,
    })
  },
  methods: {
    jump(pid) {
      let path = `/detail/${pid}`
      this.$router.push(path)
    },
  },
  mounted() {
  },
  components: {
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
.home-collection-search {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;

  .home-collection-search-home-goods-box {
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
  .home-collection-search-goods {
    .home-goods-box {
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
  .content {
    height: calc(100% - 46px);
  }
}
</style>