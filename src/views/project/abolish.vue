<template>
  <div>
    <el-card class="mb-18  pb-0">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>项目废止</span>
      </div>
      <el-form :model="abolishtype" label-width="120px">
        <el-form-item label="废止类型：">
          <el-select v-model="abolishtype.TypeId" placeholder="请选择废止类型">
            <el-option label="对手太强" :value="1" />
            <el-option label="报价错误" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="abolishtype.mark" type="textarea" />
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
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {

  data: function() {
    return {
      abolishtype: {

      }

    }
  }
}
</script>
