<template>
  <div>
  <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      @click-left="back"
      @click-right="toggle"
    />
  </div>
</template>

<script>
export default {
  name: "NavMenu",
 props: {
      title: {
        type: String,
        default: ''
      },

      leftArrow: {
        type: Boolean,
        default: false
      },

      leftText: {
        type: String,
        default: ''
      },

      rightText: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        flag:false,
      }
    },
  methods:{
      back(){
          this.$router.push("/Menu");
      },
      toggle(){
        this.flag=!this.flag
        this.$emit("toggle",this.flag)
      }
  }
}
</script>

<style lang="scss" scoped>
</style>