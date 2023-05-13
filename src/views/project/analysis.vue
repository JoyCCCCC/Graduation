<template>
  <div>
    <el-card class="mb-18  pb-0">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>废止分析</span>
      </div>
      <el-form :model="analysis" label-width="120px">
        <el-form-item label="备注：">
          <el-input v-model="analysis.mark" type="textarea" />
        </el-form-item>
        <el-form-item label="附件：">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/">
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
          <div class="text-center pt-18 ">
            <el-button type="primary" size="small">保存</el-button>
            <el-button size="small">取消</el-button>
          </div>
        </el-form-item>

      </el-form></el-card>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      analysis: {

      }
    }
  }

}
</script>
