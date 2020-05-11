<template>
  <view class="index">
    <NumberDisplay/>
    <NumberSubmit/>
    <text @tap="goOther">11111</text>
  </view>
</template>

<script>
  import Taro from "@tarojs/taro";
  import NumberDisplay from '../../components/NumberDisplay.vue'
  import NumberSubmit from '../../components/NumberSubmit.vue'
  export default {
    name: 'Index',
    onLoad() {
      console.log(process.env.TARO_ENV)
    },
    methods: {
      goOther() {
        Taro.navigateTo({
          url: '/pagesOther/other/index'
        })
      }
    },
    components: {
      NumberDisplay,
      NumberSubmit
    }
  }
</script>

<style lang="less">

</style>
