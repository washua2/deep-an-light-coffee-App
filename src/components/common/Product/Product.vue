<template>
  <div class="product">
    <div class="product-img">
      <img class="auto-img" :src="pro.smallImg" alt="" @load="imgLoad" />
    </div>
    <div class="product-zhname one-text">{{ pro.name }}</div>
    <div class="product-enname one-text">{{ pro.enname }}</div>
    <div class="product-price">&yen;{{ pro.price }}</div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      count: 0,
      imgLength: 0,
    }
  },
  props: {
    pro: {
      type: Object,
      default() {
        return {};
      }
    },
    path: String,
    default() {
      return '';
    }
  },
  methods: {
    imgLoad() {
      //加载完成 才能滑动
      setTimeout(() => {
        this.$emit("imgLoad")
      }, 100)
    }
  },
  created() {
    // console.log(this.pro);
  }

}
</script>

<style lang="scss" scoped>
.product {
  .product-img {
    background-color: #e8e8e8;
    img {
      width: 135px;
      height: 135px;
      vertical-align: bottom;
    }
  }

  .product-zhname {
    font-size: 14px;
    margin-top: 10px;
  }

  .product-enname {
    color: #999;
    width: 130px;
    text-align: start;
    white-space: nowrap;
    word-wrap: break-word;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /*显示行数*/
    overflow: hidden;
  }

  .product-price {
    color: #e4393c;
    font-size: 14px;
    margin-top: 5px;
    font-weight: bold;
  }
}
</style>