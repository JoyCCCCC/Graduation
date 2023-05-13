<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>录入信息</span>
      </div>
      <el-form
        ref="acceptanceInfo"
        :disabled="isDisabled"
        :model="acceptanceInfo"
        label-width="105px"
        size="small"
      >
        <el-row>
          <el-form-item label="备注">
            <el-input v-model="acceptanceInfo.comment" type="textarea" />
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :on-exceed="handleExceed"
              :file-list="accessory"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
      <div v-if="!isDisabled" class="mt-18 text-center">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Acceptance',
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    isDisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      DialogVisible: false,
      accessory: []
      // accessory: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  computed: {
    acceptanceInfo: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }

  }
}
</script>

<style lang='scss' scoped>
</style>
