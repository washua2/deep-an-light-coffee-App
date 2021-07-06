<template>
  <div class="menu-collection-search">
    <div class="menu-collection-search-menu-goods-box">
      <div
        class="menu-collection-search-goods"
        v-for="(item, index) in menuList"
        :key="index"
        
      >
        <div class="menu-goods-box" @click="jump(item.pid)">
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
  name: 'MenuCollection',
  data() {
    return {
      value: '',
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.menuList,
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
.menu-collection-search {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;

  .menu-collection-search-menu-goods-box {
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
  .menu-collection-search-goods {
    .menu-goods-box {
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