<template>
  <div>
    <el-tabs v-model="activeKey" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="待处理" lazy name="pending">
        <Pending />
      </el-tab-pane>
      <el-tab-pane label="已处理" lazy name="processed">
        <Processed />
      </el-tab-pane>
      <el-tab-pane label="已发起" lazy name="initiated">
        <Initiated />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import Initiated from './components/Initiated.vue'
import Pending from './components/Pending.vue'
import Processed from './components/Processed.vue'
export default {
  components: {
    Pending, Initiated, Processed
  },
  data: function() {
    return {
      activeKey: 'pending'
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.name, event)
      this.activeKey = tab.name
    }
  }
}
</script>
