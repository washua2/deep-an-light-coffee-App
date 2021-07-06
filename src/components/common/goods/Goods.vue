<template>
  <div class="goods">
    <div class="center">
      <div class="img-box">
        <img :src="pro.small_img" @load="imgLoad" alt="" />
      </div>
      <div class="text-box">
        <div class="tetx">
          <div class="text-top">
            <span>{{pro.name}}</span>
            <h4>{{pro.rule}}</h4>
          </div>

          <h5>{{pro.enname}}</h5>
          <div class="text-pice">
            <div class="price">${{pro.price}}</div>
            <div>×{{pro.count}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Goods",
  props:{
      pro:{
          type:Object,
          default:{}
      }
  },
  methods:{
      imgLoad(){

      }
  }
}
</script>

<style lang="scss" scoped>
.center {
  width: 88%;
  display: flex;
  padding-left: 10px;
  .img-box {
    width: 30%;
    height: 80px;
    margin: 10px 0px;
    img {
      width: 90%;
      height: 80px;
    }
  }
  .text-box {
    width: 70%;
    height: 100px;
    padding-left: 10px;
    h5 {
      font-weight: lighter;
      font-size: 10px;
      padding-top: 15px;
    }
    .text-top {
      display: flex;
      align-items: center;
      padding-top: 10px;
      span {
        padding-right: 10px;
        font-size: 14px;
      }
      h4 {
          padding-top: px;
        font-weight: lighter;
        font-size: 10px;
      }
    }
    .text-pice {
      position: relative;
      bottom: -20px;
      width: 220px;
      font-size: 14px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      .price {
        color: var(--color-tint);
      }
    }
  }
}
</style>