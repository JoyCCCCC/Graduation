<template>
  <el-card class="flowable-container">
    <FlowableDesign
      ref="canvas"
      :xml="xml"
      :users="users"
      :groups="groups"
      :categorys="categorys"
      :is-view="false"
      @save="save"
    />
  </el-card>
</template>

<script>
import FlowableDesign from '@/components/FlowableDesign'
import { createFlowChart } from '@/api/flowable'

export default {
  name: 'Flowable',
  components: {
    FlowableDesign
  },
  data() {
    return {
      xml: '', // 后端查询到的xml
      users: [
        { name: '${INITIATOR}', id: '${INITIATOR}' },
        { name: '张三', id: 'zhangsan' },
        { name: '李四', id: 'lisi' },
        { name: '王五', id: 'wangwu' }
      ],
      groups: [
        { name: 'web组', id: 'web' },
        { name: 'java组', id: 'java' },
        { name: 'python组', id: 'python' }
      ],
      categorys: [
        { name: '项目', id: 'project' }
        // { name: 'OA', id: 'oa' },
        // { name: '财务', id: 'finance' }
      ]
    }
  },
  methods: {
    getModelDetail() {
      // 发送请求，获取xml
      // this.xml = response.xml
    },
    save(data) {
      if (data && data.process) {
        if (!data.process.category) {
          this.$message.error('请选择流程分类')
          return
        }
        if (!data.process.id) {
          this.$message.error('请输入流程标识')
          return
        }
        if (!data.process.name) {
          this.$message.error('请输入流程名称')
          return
        }
        const body = {
          key: data.process.id,
          name: data.process.name,
          category: data.process.category,
          xml: data.xml
        }
        createFlowChart(body).then(res => {
          console.log(res, 'dsdsd')
          this.$router.go(-1)
        })

        console.log(data)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.flowable-container {
}
</style>
