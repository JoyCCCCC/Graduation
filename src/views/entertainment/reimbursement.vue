<template>
  <el-form ref="form" :model="form" label-width="100px" style="width: 700px;margin-left: 300px; margin-top:80px;" label-position="right">
    <el-row :gutter="20">
      <el-col span="11">
        <el-form-item label="申请主题">
          <el-input v-model="form.projectName" />招待报销</el-form-item>
      </el-col>
      <el-col span="11">
        <el-form-item label="项目类型">
          <el-select v-model="form.region" placeholder="请选择项目类型">
            <el-option label="类型1" value="XXX" />
            <el-option label="类型2" value="XXX" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col span="11">
        <el-form-item label="招待类型">
          <el-select v-model="form.region" placeholder="请选择招待类型">
            <el-option label="类型1" value="yanqing" />
            <el-option label="类型2" value="juhui" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col span="11">
        <el-form-item label="时间">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col span="11">
        <el-form-item
          class="demo-ruleForm"
          label="金额"
          prop="amount"
          :rules="[ {type:'number', message:'金额必须为数字'}]"
        >
          <el-input v-model="form.money" />
        </el-form-item>
      </el-col>
      <el-col span="11">
        <el-form-item label="地点">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col span="11">
        <el-form-item label="宴请人数">
          <el-input v-model="form.nvitedNum" />
        </el-form-item>
      </el-col>
      <el-col span="11">
        <el-form-item label="我司陪同人数">
          <el-input v-model="form.accompanyNum" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-col span="22">
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" /></el-form-item>
    </el-col>
    <el-form-item label="上传发票">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <el-button size="mini" type="primary">点击上传</el-button></el-upload></el-form-item>
    <el-form-item label="支付凭证">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <el-button size="mini" type="primary">点击上传</el-button></el-upload></el-form-item>
    <el-form-item label="查询额度">
      <el-button type="primary" size="mini" icon="el-icon-search" @click="dialogFormVisible=true">点击查询</el-button>
      <el-dialog custom-class="customWidth" title="额度查询" :visible.sync="dialogFormVisible" customclass="customWidth" width="20%">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 100px   margin-top:10px;">
          <el-form-item label="总额度:" prop="type" />
          <el-form-item label="可用额度:" prop="type" />

          <el-form>
            <el-form-item /></el-form>
        </el-form>
      </el-dialog>
    </el-form-item>

    <el-button style="margin-left:250px" @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" style="align:center" @click="centerDialogVisible = false">确 定</el-button>

  </el-form>

</template>

<script>

export default {
  data() {
    return {
      form: {
        projectName: '',
        date: new Date(),
        amount: '',
        address: '',
        nvitedNum: '',
        accompanyNum: '',
        remark: '',
        projectName2: '',
        reason: ''

      },
      dialogFormVisible: false,
      dialogFormVisible2: false

    }
  }
}
</script>

