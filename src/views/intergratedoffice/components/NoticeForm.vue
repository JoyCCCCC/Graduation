<template>
  <div>
    <el-form :model="addNoticelForm" size="small" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="addNoticelForm.title" />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="addNoticelForm.publishTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="addNoticelForm.content" type="textarea" rows="5" />
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="addNoticelForm.status">
          <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="附件">
        <Upload
          v-model="addNoticelForm.accessory"
          :file-list="fileList"
          @handleRemove="handleRemove"
          @handleSuccess="handleUploadSuccess"
          @handleError="handleUploadError"
        />
      </el-form-item>
    </el-form>
    <div class="foot-button text-center mt-18">
      <el-button type="primary" @click="addForm">保存</el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>
<script>
import Upload from '@/components/Upload'
export default {
  name: 'NoticeForm',
  components: {
    Upload
  },
  props: {
    noticeFormData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      addNoticelForm: {

      },
      fileList: [],
      statusOptions: [
        { value: 1, label: '未发布' },
        { value: 2, label: '已发布' }
      ],
      nowDate: new Date()
    }
  },
  created() {
    this.getTime()
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(v => v && v.uid !== file.uid)
    },
    handleUploadError(err, file, fileList) {
      console.log(err)
    },
    handleUploadSuccess(response, file, fileList) {
      file.raw.path = response.data[0]
      this.fileList.push(file.raw)
    },
    getTime() {
      console.log(this.addNoticelForm.createTime)
    },
    addForm() {
      console.log(this.addNoticelForm)
      this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
      this.$message({ message: '添加成功', type: 'success' })
    }
  }
}
</script>
