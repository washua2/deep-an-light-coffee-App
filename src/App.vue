<template>
  <div id="app">
    <keep-alive exclude="Detail,Collection,
    AddressManagement,AddressChange,Address,MyOrder,ShopSettlement,Detail,Goods,Profile">
        <router-view/>
    </keep-alive> 
    
  </div>
</template>
<script >

export default {
  name: "app",
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import "assets/css/base.css";

</style>
