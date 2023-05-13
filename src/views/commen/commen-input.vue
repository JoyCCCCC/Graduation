<template>
  <div>
    <el-card>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="75px" class="b-line" size="small">
        <el-form-item label="字段一">
          <el-input v-model="ruleForm.one" />
        </el-form-item>
        <el-form-item label="字段二" prop="two">
          <el-input v-model="ruleForm.two" />
        </el-form-item>
        <el-form-item label="字段三" prop="three">
          <el-select v-model="ruleForm.three" placeholder="请选择字段三">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="字段四" prop="four">
          <el-input v-model="ruleForm.four" />
        </el-form-item>
        <el-form-item label="字段五" prop="five">
          <el-input v-model="ruleForm.five" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form
        ref="queryruleForm"
        :model="queryruleForm"
        label-width="60px"
        class="mt-18 b-line"
        size="small"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="字段一">
              <el-input v-model="queryruleForm.one" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="字段一">
              <el-input v-model="queryruleForm.one" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="字段一">
              <el-input v-model="queryruleForm.one" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="字段一">
              <el-input v-model="queryruleForm.one" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item label="字段三">
              <el-select v-model="queryruleForm.three" placeholder="请选择字段三">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
            <el-form-item>
              <el-button type="primary" @click="submitForm('queryruleForm')">立即创建</el-button>
              <el-button @click="resetForm('queryruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :inline="true" :model="formInline" size="small" class="mt-18 b-line">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人" />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" size="small" class="form-inline-nolabel mt-18 b-line">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="审批人" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item class="ml-12">
          <el-button type="primary" size="small">查询</el-button>
          <el-button size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="mt-18">
        <el-button type="primary" size="small" @click="centerDialogVisible = true">两列表单 Dialog</el-button>
        <el-button type="primary" size="small" @click="centerDialogVisible1 = true">一列表单 Dialog </el-button>
      </div>

      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="60%">
        <el-form
          ref="queryruleForm"
          :model="queryruleForm"
          :rules="queryrules"
          label-width="60px"
          class="demo-ruleForm"
          size="small"
        >
          <el-row :gutter="32">
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段三">
                <el-select v-model="queryruleForm.three" placeholder="请选择字段三">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段一">
                <el-input v-model="queryruleForm.one" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字段三">
                <el-select v-model="queryruleForm.three" placeholder="请选择字段三">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="centerDialogVisible1" width="30%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="75px" size="small">
          <el-form-item label="字段一">
            <el-input v-model="ruleForm.one" />
          </el-form-item>
          <el-form-item label="字段二" prop="two">
            <el-input v-model="ruleForm.two" />
          </el-form-item>
          <el-form-item label="字段三" prop="three">
            <el-select v-model="ruleForm.three" placeholder="请选择字段三">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="字段四" prop="four">
            <el-input v-model="ruleForm.four" />
          </el-form-item>
          <el-form-item label="字段五" prop="five">
            <el-input v-model="ruleForm.five" />
          </el-form-item>
          <el-form-item label="字段四" prop="four">
            <el-input v-model="ruleForm.four" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" center>
          <el-button size="small" @click="centerDialogVisible1 = false">取 消</el-button>
          <el-button type="primary" size="small" @click="centerDialogVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>

</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      centerDialogVisible1: false,
      ruleForm: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: ''
      },
      queryruleForm: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      rules: {
        one: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        two: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        three: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'change'
        }],
        four: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        five: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
</style>
