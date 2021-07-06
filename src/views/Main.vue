<template>
  <div>
    <div>
      <keep-alive exclude="Shop,Detail">
      <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="activeTabIndex" inactive-color="#646566" active-color="#0C34BA" route>
      <van-tabbar-item v-for="(item,index) in tarbbarData" :key="index" :to="item.to">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ?item.inactiveIcon: item.activeIcon  " />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data(){
      return{
            activeTabIndex: 0,
             tarbbarData: [
          {
            title: '首页',
            activeIcon: require('../assets/img/tabbar1/标题1.png'),
            inactiveIcon: require('../assets/img/tabbar1/标题.png'),
            //跳转的路由
            to: {name: 'Home'} 
          },
          {
            title: '菜单',
            activeIcon: require('../assets/img/tabbar/menu.png'),
            inactiveIcon: require('../assets/img/tabbar/menu_active.png'),
            to: {name: 'Menu'}
          },
          {
            title: '购物袋',
            activeIcon: require('../assets/img/tabbar/shopbag.png'),
            inactiveIcon: require('../assets/img/tabbar/shopbag_active.png'),
            to: {name: 'Shop'}
          },
          {
            title: '我的',
            activeIcon: require('../assets/img/tabbar/my.png'),
            inactiveIcon: require('../assets/img/tabbar/my_active.png'),
            to: {name: 'Profile'}
          }
        ]

      }
  },
  
}
</script>

<style lang="scss" scoped>
</style>