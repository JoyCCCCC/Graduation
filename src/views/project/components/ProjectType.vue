<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>项目类型</span>
      </div>
      <el-row :gutter="30" class="mb-18">
        <el-col :span="6">
          <el-form-item label-width="80px" label="项目类型:">
            <el-select
              v-model="projectInfo.projectTypeId"
              placeholder="请选择项目类型"
            >
              <el-option label="渠道" :value="1" />
              <el-option label="集成" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <!-- <el-col> -->
        <el-button
          type="primary"
        >保存</el-button>
        <!-- </el-col> -->

      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectType',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    projectInfo: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  created() {
  },
  methods: { }
}
</script>

<style lang='scss' scoped>
</style>

