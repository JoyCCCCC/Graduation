<template>
  <div>
    <el-card>
      <h3>常规规范</h3>
      <div class="text-red">新增一些常用的全局样式在styles/help文件下，请自行参考</div>
      <ul>
        <li>内容间距一般设置为18,与表单相对应</li>
        <li>圆角：一般取2px</li>
        <li>分割线：1px solid #e8e8e8</li>
        <li>边框：1px solid #d9d9d9</li>
        <li>间距：10,12,16,18,20,24</li>
        <li>表单上下行间距为18,若无需提示验证可适当调小如16</li>
        <li>两个按钮间的间距为10</li>
        <li>表单和按钮的常规高度都取32，即size="small"</li>
        <li>内容多，紧凑，表单按钮高度可取28，size="mini"</li>
        <li>字体大小默认为14</li>
        <li>同一性质排序的输入框长度一致，即右侧需对齐</li>
        <li>强调文字为：#000,字体颜色默认常规为#333,次要文字#666,次次要文字#999,提示文字：#ccc,主题蓝#1890ff;</li>
      </ul>
      <h3>表单规范</h3>
      <ul>
        <li>
          <div>长度规范</div>
          <p>有设置长度的一般设置为80的倍数 80、160、240、320、480。 一般取240即可，特殊情况另做调整</p>
          <p>根据页面大小自适应的不设宽度</p>
        </li>
        <li>
          <div>页面表单的布局</div>
          <div class="mtb-18">
            <p class="text-t">1.多个表单组合的查询条件用栅格布局，即根据不同页面宽度，一行显示不同的个数:如下</p>
            <p>xs	&lt; 768px 一行显示一个</p>
            <p>sm	≥768px 一行显示两个</p>
            <p>md	≥992px 一行显示3个</p>
            <p>xl	≥1920px 一行显示4个</p>
            <p>gutter="32" 表单的上下间距为18,左右间距为32, 高度都为32，即添加size="small"</p>
            <div class="text-red">表单字段label右对齐,根据字的最大长度设宽度,3个字为60,4个为75,每多一个加15,必填字段加*，*号代表一个字</div>
            <el-form
              ref="queryruleForm"
              :model="queryruleForm"
              :rules="rules"
              label-width="75px"
              class="mt-18 b-line"
              size="small"
            >
              <el-row :gutter="32">
                <el-col :xs="24" :sm="12" :md="8" :xl="6">
                  <el-form-item label="字段一" prop="one">
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
                    <el-input v-model="queryruleForm.one" :disabled="true" />
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
                    <el-button type="primary" @click="submitForm1('queryruleForm')">立即创建</el-button>
                    <el-button @click="resetForm1('queryruleForm')">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="mtb-18">
            <p class="text-t">单行表单查询（一行显示无label）</p>
            <p>规范：输入宽长度一般为240,表单间的间距为12，按钮间距为10，表单和按钮间距为24</p>
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
          </div>

          <div class="mtb-18">
            <p class="text-t">单行表单查询（一行显示有label）</p>
            <p>规范：输入宽长度一般为240,表单间的间距为24，按钮间距为10，表单和按钮间距为24</p>
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
          </div>
          <div class="mtb-18">
            <p class="text-t">弹窗表单</p>
            <p>规范：一般分为单列和双列,列数少单列，列数多双列，长度自适应</p>
            <div class="mt-18">
              <el-button type="primary" size="small" @click="centerDialogVisible = true">两列表单 Dialog</el-button>
              <el-button type="primary" size="small" @click="centerDialogVisible1 = true">一列表单 Dialog </el-button>
            </div>
            <el-dialog title="表单多用双列" :visible.sync="centerDialogVisible" width="60%">
              <el-form
                ref="queryruleForm"
                :model="queryruleForm"
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
            <el-dialog title="表单少用单列" :visible.sync="centerDialogVisible1" width="30%">
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="60px" size="small">
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
          </div>
        </li>
      </ul>
      <h3>分页规范</h3>
      <p>分页统一放右边</p>
      <p>页面常规用如下分页</p>
      <div class="mtb-18 clearfix">
        <el-pagination
          class="pull-right"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <p>弹窗分页用小型分页</p>
      <div class="mtb-18 clearfix">
        <el-pagination
          class="pull-right"
          small
          layout="prev, pager, next, jumper"
          :total="400"
        />
      </div>
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
        }]
      }
    }
  },
  methods: {
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
  li{
    line-height: 32px;
  }
  p{
    line-height: 24px;
    margin:4px 0;
  }
</style>
