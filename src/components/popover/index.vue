<template>
  <div>
    <el-popover
          ref="popover"
          placement="right"
          width="400"
          trigger="click">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="userData.IMG" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ userData.CREATED }}</time>
              </div>
            </div>
          </el-card>
    </el-popover>
    <el-button v-popover:popover @click="handleHover(scope.row.BELONG_ID)">{{scope.row.BELONG_ID}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
