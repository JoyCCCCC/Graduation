<template>
  <el-steps :active="active" align-center>
    <el-step
      v-for="(item, index) in stepList"
      :key="index"
      :title="getTitle(item.value)"
      :status="getStepStatus(index)"
    >
      <div
        slot="icon"
        class="customer-status"
        :class="{ 'current-status': index == active }"
        style="cursor: pointer"
        @click="onSelectStep(index)"
      >
        <span>{{ index + 1 }}</span>
      </div>
    </el-step>
  </el-steps>
</template>

<script>
export default {
  name: 'Step',
  props: {
    stepList: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      default: 0
    },
    originActive: {
      type: Number,
      default: 0
    },
    isOriginStatus: { // 是否处于原始状态
      type: Boolean,
      default: false
    },
    // isOriginMainStatus: { // 主状态是否处于原始状态，用于子状态相关判断
    //   type: Boolean,
    //   default: false
    // }
    // isCurrentFather: {
    //   type: Boolean,
    //   default: false
    // },
    isMain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },

  // watch: {
  //   active(newActive, oldActive) {
  //     if (oldActive && oldActive !== 0 && oldActive < newActive) {
  //       this.active = oldActive
  //     }
  //   }
  // },

  emits: ['onSelectStep'],
  methods: {
    getTitle(str) {
      if (str.includes('-')) {
        const strArr = str.split('-')
        return strArr[strArr.length - 1]
      }
      return str
    },
    getStepStatus(index) {
      // console.log(this.isOriginStatus)
      // console.log(this.originActive)
      // console.log(index)
      if (this.isOriginStatus) {
        if (index <= this.originActive) {
          return 'finish'
        }
        return 'wait'
      } else {
        if (this.isMain && this.originActive < index) {
          return 'wait'
        }
        return 'finish'
      }
    },

    onSelectStep(index) {
      if (this.isOriginStatus) {
        if ((this.isOriginStatus && index === this.originActive) || this.originActive < index) return
      }
      this.$emit('onSelectStep', index)
    }
  }
}
</script>

<style lang='scss' scoped>
.customer-status {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: none;
}

.current-status {
  background: #409eff;
  color: #fff;
}
</style>
