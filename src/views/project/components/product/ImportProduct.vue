<template>
  <div>
    <el-upload
      class="upload-demo text-center"
      drag
      :accept="FILE_TYPE.excel"
      :http-request="uploadFile"
      :on-error="onError"
      :show-file-list="false"
      action="customize"
      :limit="1"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip text-red">提示：仅允许导入“{{ FILE_TYPE.excel }}”格式文件</div>
    </el-upload>
    <div class="footer-container">
      <!-- <div class="foot-button text-center"> -->
      <!-- <span class="fz-12">
        <i class="el-icon-download" />格式模板下载：data.xlsx
      </span> -->
      <!-- <div>
        <el-button type="primary" @click="onSave">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { FILE_TYPE } from '@/constants'
export default {
  name: 'ImportProduct',
  components: {},
  data: function() {
    return {
      FILE_TYPE: FILE_TYPE
    }
  },
  created() {},
  methods: {

    onSave() {
      this.$listeners.importFile && this.$listeners.importFile()
    },

    onCancel() {
      this.$listeners.onCancel && this.$listeners.onCancel()
    },

    onError() {
      this.$message.error('导入失败！')
    },

    uploadFile(param) {
      this.$listeners.uploadFile && this.$listeners.uploadFile(param)
    }
  }
}
</script>

<style lang='scss' scoped>

  .footer-container{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
