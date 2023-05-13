<template>
  <div id="container" />
</template>

<script>

import { getFlowXml } from '@/api/flowable'
import BpmnViewer from 'bpmn-js/lib/Viewer'
export default {
  name: 'FlowChart',
  components: {},
  props: {
    deploymentId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      containerEl: null,
      bpmnModeler: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.deploymentId) {
        getFlowXml(this.deploymentId).then(res => {
          if (res) {
            console.log(res, 'xml')
            this.previewTemp(res)
          }
        })
      }
    },

    previewTemp(xml) {
      this.containerEl = document.getElementById('container')
      // 避免缓存，每次清一下
      this.bpmnModeler && this.bpmnModeler.destroy()
      // this.scale = 1
      this.bpmnModeler = new BpmnViewer({ container: this.containerEl, height: '65vh' })
      const viewer = this.bpmnModeler
      this.bpmnModeler.importXML(xml, (err) => {
        if (err) {
          console.error(err)
        } else {
          const canvas = viewer.get('canvas')
          canvas.zoom('fit-viewport', 'auto')
          // const eventBus = this.bpmnModeler.get('eventBus')
          // const overlays = this.bpmnModeler.get('overlays')
          // eventBus.on('element.hover', (e) => {
          //   const $overlayHtml = jquery(` <div class="tipBox">
          //           你好，我是悬浮框里的内容
          //           </div>`)
          //   overlays.add(e.element.id, {
          //     position: { top: e.element.height, left: 0 },
          //     html: $overlayHtml
          //   })
          // })
          // eventBus.on('element.out', () => {
          //   overlays.clear()
          // })
          //  注册悬浮事件结束
        }
      })
    }

  }
}
</script>

<style lang='scss' scoped>

</style>

