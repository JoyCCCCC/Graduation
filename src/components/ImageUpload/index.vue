<template>
  <div class="component-upload-image" :class="{'hide-upload-img-container':!showButton}">
    <el-upload
      :action="action"
      :file-list="fileList"
      list-type="picture-card"
      :on-success="handleSuccess"
      :on-error="handleError"
      :limit="isSingle?1:9999"
    >
      <i slot="default" class="el-icon-plus" />
      <div v-if="showErrorTip" slot="tip" class="text-red">上传失败,请重试!</div>
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { UPLOAD_ACTION } from '@/constants'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: UPLOAD_ACTION
    },
    fileList: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Object,
      default: () => ({
        'Authorization': `Bearer ` + getToken()
      })
    },
    isSingle: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      showErrorTip: false
    }
  },
  computed: {
    showButton() {
      return !(this.isSingle && this.fileList && this.fileList.length > 0)
    }
  },
  methods: {
    handleError(err, file, fileList) {
      this.showErrorTip = true
      this.$listeners.handleError && this.$listeners.handleError(err, file, fileList)
    },

    handleSuccess(response, file, fileList) {
      if (response && response.success) {
        this.showErrorTip = false
        this.$listeners.handleSuccess && this.$listeners.handleSuccess(response, file, fileList)
      } else {
        this.showErrorTip = true
        this.$listeners.handleError && this.$listeners.handleError(response, file, fileList)
      }
    },

    handleRemove(file) {
      this.$listeners.handleRemove && this.$listeners.handleRemove(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
      window.open(file.url, '_blank')
    },

    beforeUpload() {
      // Todo
      // 文件类型、大小限制待定
    }
  }
}
</script>

<style lang="scss">
 .component-upload-image{
  .el-upload--picture-card{
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}

.hide-upload-img-container{
  .el-upload--picture-card{
    display: none;
  }
}
</style>

<style scoped lang="scss">
.image {
  position: relative;
  .mask {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
  }
  &:hover .mask {
    opacity: 1;
  }
}

</style>
