<template v-show="isShow" >
  <div class="collection">
    <router-view />
    <nar-bar left-arrow left-text="返回" title="收 藏" />
    <canvas ref="canvasTest" id="q" />

    <div class="collection-box">
      <div class="collection-all item" @click="all">
        <transition
          enter-active-class="animate__animated animate__rubberBand "
          leave-active-class="animate__animated animate__heartBeat animate__faster	800ms"
        >
          <div class="text" v-show="show">查询全部</div>
        </transition>
      </div>
      <div class="collection-search item" @click="search">
        <transition
          enter-active-class="animate__animated animate__rubberBand "
          leave-active-class="animate__animated animate__heartBeat animate__faster	800ms"
        >
          <div class="text" v-show="show">查询指定</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NarBar from '../../../components/common/NavBar/NarBar.vue'
import { getFindAllLike } from "network/menu"

export default {
  name: 'Collection',

  data() {
    return {
      timer: null,
      isShow: true,
      show: false,
    }
  },

  methods: {
    all() {
      this.getFindAllLike()
    },
    search() {
      this.$router.push("/collectionSearch")
    },
    getFindAllLike() {
      getFindAllLike().then(res => {
        if (res.data.code === 700) {
          this.$toast(res.data.msg);
          //跳转登录界面
          clearTimeout(this.timers)
          this.timers = null
          this.timers = setTimeout(() => {
            this.$router.push('/Sign')
          }, 2000)
        }
        if (res.data.code === 2000) {
          this.$router.push("/CollectionAll")

        }
      })
    },


    autoPlay() {
      let myCanvas = this.$refs.canvasTest;
      myCanvas.width = 375;
      myCanvas.height = 667;
      let width = 375;
      let height = 667;
      let yPositions = Array(100).join(0).split('');
      let ctx = q.getContext('2d');
      let draw = () => {
        ctx.fillStyle = 'rgba(255,255,255,.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#0C34BA';
        yPositions.map((y, index) => {
          let x = (index * 10);
          q.getContext('2d').fillText(" * ", x, y);
          if (y > Math.random() * 1e4) {
            yPositions[index] = 0;
          } else {
            yPositions[index] = y + 1;
          }
        });
      }
      clearInterval(this.timer);
      this.timer = null
      this.timer = setInterval(draw, 10);
    }

  },
  mounted() {
    this.isShow = true;
    this.autoPlay();
    this.show = true
  },
  destroyed() {
    this.isShow = false
    clearInterval(this.timer);
    this.timer = null
  },
  components: {
    NarBar,
  }


}
</script>

<style lang="scss" scoped>
.collection {
  #q {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  .item {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 120px;
    border-radius: 15px;
    background-color: skyblue;
    opacity: 0.8;
  }
  .text {
    width: 100px;
    height: 100px;
    color: #fff;
    border-radius: 15px;
    margin: 10px;
    font-size: 22px;
    line-height: 100px;
    text-align: center;
    background-color: rgb(90, 98, 205);
  }
  .collection-all {
    transform: translate(-120%, -50%);
  }
  .collection-search {
    transform: translate(20%, -50%);
  }
}
</style>