<template>
  <div>
    <el-upload
      :class="{'hide-upload-container':!showButton}"
      :data="data"
      :multiple="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :action="actions"
      :file-list="fileList"
      :show-file-list="!showErrorTip"
      v-bind="$attrs"
    >
      <el-button v-if="showButton" size="small" :type="btnType"><i :class="btnIcon" />{{ btnText }}</el-button>
      <div v-if="showErrorTip" slot="tip" class="text-red">上传失败,请重试!</div>
    </el-upload>
    <slot name="header" />
    <!-- <div v-show="imageUrl.length>0" class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { UPLOAD_ACTION } from '@/constants'

export default {
  name: 'Upload',
  props: {
    value: {
      type: String,
      default: ''
    },
    headers: {
      type: Object,
      default: () => ({
        'Authorization': `Bearer ` + getToken()
      })
    },
    actions: {
      type: String,
      default: UPLOAD_ACTION
    },
    data: {
      type: Object,
      default: () => {}
    },
    isSingle: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default: () => []
    },
    btnText: {
      type: String,
      default: '点击上传'
    },
    btnIcon: {
      type: String,
      default: 'el-icon-upload'
    },
    btnType: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      showErrorTip: false
    }
  },
  computed: {
    showButton() {
      return !(this.isSingle && this.fileList && this.fileList.length > 0)
    }
  },

  methods: {
    // rmImage() {
    //   this.emitInput('')
    // },
    // emitInput(val) {
    //   this.$emit('input', val)
    // },

    handleError(err, file, fileList) {
      this.showErrorTip = true
      this.$listeners.handleError && this.$listeners.handleError(err, file, fileList)
    },

    handleSuccess(response, file, fileList) {
      // console.log(response, 'responseresponse')
      // console.log(file, 'filefilefile')
      // console.log(fileList, 'fileListfileListfileList')
      if (response && response.success) {
        this.showErrorTip = false
        this.$listeners.handleSuccess && this.$listeners.handleSuccess(response, file, fileList)
      } else {
        this.showErrorTip = true
        this.$listeners.handleError && this.$listeners.handleError(response, file, fileList)
      }
    },

    handleRemove(file, fileList) {
      this.$listeners.handleRemove && this.$listeners.handleRemove(file, fileList)
    },

    handlePreview(file) {
      if (this.$listeners.handlePreview) {
        this.$listeners.handlePreview(file)
      } else {
        window.open(file.url, '_blank')
      }
    },

    beforeUpload() {
      // Todo
      // 文件类型、大小限制待定

      // const _self = this
      // return new Promise((resolve, reject) => {
      //   getToken().then(response => {
      //     const key = response.data.qiniu_key
      //     const token = response.data.qiniu_token
      //     _self._data.dataObj.token = token
      //     _self._data.dataObj.key = key
      //     this.tempUrl = response.data.qiniu_url
      //     resolve(true)
      //   }).catch(() => {
      //     reject(false)
      //   })
      // })
    }
  }
}
</script>

<style lang="scss" scoped>

.hide-upload-container{
  display: flex;
  margin-top:-6px;
}

</style>
