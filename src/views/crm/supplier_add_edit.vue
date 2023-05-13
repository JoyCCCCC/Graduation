<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          供应商列表
        </span>
      </div>
      <el-form
        ref="supplierForm"
        label-width="130px"
        :model="supplierForm"
        size="small"
        class="mt-18 b-line"
        :rules="addRules"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item prop="supplierId" label="供应商编号">
              <el-input v-model="supplierForm.supplierNum" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="制表日期" prop="creatTabelTime">
              <el-date-picker v-model="supplierForm.creatTabelTime" type="date" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="供应商类型" prop="supplierType">
              <el-select v-model="supplierForm.supplierType" multiple>
                <el-option
                  v-for="item in supplierTypeNameOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="供应商品牌" prop="supplierBrand">
              <el-select v-model="supplierForm.supplierBrand" multiple>
                <el-option
                  v-for="item in supplierBrandNameOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="供应商登记时间" prop="supplierRegisterTime">
              <el-date-picker v-model="supplierForm.supplierRegisterTime" type="date" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="登记人">
              <el-input />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item prop="companyName" label="公司名称">
              <el-input v-model="supplierForm.companyName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="法人代表" prop="corporationRepresentative">
              <el-input v-model="supplierForm.corporationRepresentative" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="地址" prop="address">
              <el-input v-model="supplierForm.address" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="邮编" prop="mail">
              <el-input v-model="supplierForm.mail" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="单位性质" prop="companyProperty">
              <el-select v-model="supplierForm.companyProperty">
                <el-option v-for="item in companyPropertyOptions" :key="item.value" :value="item.value" :label="item.lale" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="经营类型" prop="bussinessCatagory">
              <el-select v-model="supplierForm.bussinessCatagory">
                <el-option v-for="item in bussinessCatagoryOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="业务联系人" prop="bussinessContractName">
              <el-input v-model="supplierForm.bussinessContractName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系电话" prop="contractTel">
              <el-input v-model="supplierForm.contractTel" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="注册资金" prop="companyFoundMoney">
              <el-input v-model="supplierForm.companyFoundMoney" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="实收资本" prop="netReceiveMoney">
              <el-input v-model="supplierForm.netReceiveMoney" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="公司成立日期">
              <el-date-picker v-model="supplierForm.companyFoundDate" type="date" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="公司所有制" prop="companyOwnership">
              <el-select v-model="supplierForm.companyOwnership">
                <el-option v-for="item in companyOwnershipOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="雇员总人数" prop="empolyeeNum">
              <el-input v-model="supplierForm.empolyeeNum" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="技术人员" prop="techologyPerson">
              <el-input v-model="supplierForm.techologyPerson" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="管理人员" prop="managePerson">
              <el-input v-model="supplierForm.managePerson" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="其他人员" prop="otherPerson">
              <el-input v-model="supplierForm.otherPerson" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="税率" prop="taxRate">
              <el-select v-model="supplierForm.taxRate">
                <el-option v-for="item in taxRateOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="默认申报纳税类型" prop="taxTypeName">
              <el-select v-model="supplierForm.taxTypeName">
                <el-option v-for="item in taxTypeNameOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="主要产品及业务" prop="mainProductBussiness">
              <el-input v-model="supplierForm.mainProductBussiness" type="textarea" rows="5" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="过去三年销售额">
          <div class="addSupplierProduct">
            <div class="add-cont pt-18 plr-18">
              <el-form
                v-for="(item1,index) in supplierForm.saleThreeYears"
                :key="index"
                :inline="true"
                class="form-wxm"
                size="small"
                :model="item1"
              >
                <el-form-item label="年份">
                  <el-date-picker v-model="item1.year" type="year" />
                </el-form-item>
                <el-form-item label="销售额">
                  <el-input v-model="item1.sales"><i slot="suffix">万元</i></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="deleteSupplierProduct">删除</el-button>
                </el-form-item>
              </el-form>
              <div slot="footer" class="tm-18 btnCenter" style="margin-bottom: 10px">
                <el-button type="primary" @click="addSupplierProduct">添加销售额</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="银行账号" prop="bankAccount">
              <el-input v-model="supplierForm.bankAccount" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="用户名" prop="accountName">
              <el-input v-model="supplierForm.accountName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="开户银行" prop="bankName">
              <el-input v-model="supplierForm.bankName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="银行资信等级" prop="bankQualityName">
              <el-input v-model="supplierForm.bankQualityName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="发票" prop="receipt">
              <el-input v-model="supplierForm.receipt" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="结账方式" prop="checkMethodName">
              <el-input v-model="supplierForm.checkMethodName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系人" prop="contracterName">
              <el-input v-model="supplierForm.contracterName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系人职位">
              <el-input v-model="supplierForm.contractorPosition" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系手机" prop="contracterPosition">
              <el-input v-model="supplierForm.contracterPosition" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系人邮箱" prop="contractMail">
              <el-input v-model="supplierForm.contractMail" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="我司对接人" prop="ourCompanyConnecter">
              <el-input v-model="supplierForm.ourCompanyConnecter" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="是否与我司成交过" prop="Dealwith">
              <el-select v-model="supplierForm.Dealwith">
                <el-option v-for="item in isDealwithOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="与我司关系程度" prop="ourCompanyRelationship">
              <el-select v-model="supplierForm.ourCompanyRelationship">
                <el-option v-for="item in ourCompanyRelationshipOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="已成交项目名称" prop="dealtProjectName">
              <el-input v-model="supplierForm.dealtProjectName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="公司名称(盖章)">
              <el-input type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form class="mt-18 b-line">
        <div>
          <h4>注:</h4>
          <ol>
            <li>本公司郑重承诺填写信息真实有效</li>
            <li>须提供公司营业执照副本扫描件、法人身份证复印件、近两年审计报告(或尽量过年财务报表)、公司简介</li>
            <li>代理产品证书扫描件(若有)</li>
          </ol>
        </div>
      </el-form>
      <el-form size="small" class="mt-18 b-line" label-width="170px">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="公司营业执照副本扫描件">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="法人身份证复印件">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="近两年审计报告">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="公司简介">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="代理产品证书扫描件">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="mt-18 btnCenter">
        <el-button type="primary" @click="$router.push('/customer/supplier')">保 存</el-button>
        <el-button @click="$router.push('/customer/supplier')">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      addRules: {
        supplierBrand: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        supplierId: [
          { required: true, message: '项目编号不能为空', trigger: 'blur' }
        ],
        supplierType: [
          { required: true, message: '供应商品牌不能为空', trigger: 'blur' }
        ],
        supplierRegisterTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        corporationRepresentative: [
          { required: true, message: '法人代表不能为空', trigger: 'blur' }
        ]

      },
      supplierForm: {
        'supplierNum': '供应商编号',
        'supplierName': '供应商名称',
        'address': '地址',
        'mail': '邮编',
        'companyName': '公司名称',
        'companyProperty': '单位性质',
        'companyOwnership': 1,
        'companyFoundDate': '公司成立日期',
        'companyFoundMoney': 111,
        'netReceiveMoney': 111,
        'companyIntroduction': '公司简介',
        'corporationRepresentative': '法人代表',
        'corporationId': '法人身份证',
        'bankAccount': '银行账号',
        'bankQuality': 1,
        'accountName': '开户名',
        'bankName': '开户行',
        'taxRate': '税率',
        'taxType': 1,
        'receipt': '发票',
        'checkMethod': 1,
        'mainProductBusiness': '主要产品及业务',
        'businessCategory': '经营类别',
        'businessLicense': '营业执照',
        'businessContractName': '业务联系人',
        'businessContractTel': '业务联系电话',
        'employeeNum': 11,
        'technologyPerson': '技术人员',
        'managePerson': '管理人员',
        'otherPerson': '其他人员',
        'contractorName': '联系人',
        'contractorPosition': '联系人职位',
        'contractTel': '联系手机',
        'contractMail': '联系邮箱',
        'ourCompanyRelationship': 1,
        'ourCompanyConnector': '我司对接人',
        'dealWith': 1,
        'dealtProjectName': '已成交项目名称',
        'auditReport': '近两年审计报告',
        // 'saleThreeYears': '过去三年销售额，单位：万元，[1,2,3]',
        'agencyProductLicense': '代理产品证书',
        saleThreeYears: [{
          year: Date.now(),
          sales: ''
        }],
        supplierType: [1],
        supplierBrand: [1]
      },
      supplierTypeNameOptions: [{
        value: 1,
        label: '伙伴'
      },
      {
        value: 2,
        label: '优先'
      },
      {
        value: 3,
        label: '重点'
      },
      {
        value: 4,
        label: '商业'
      }
      ],
      supplierBrandNameOptions: [{
        value: 1,
        label: '华为'
      },
      {
        value: 2,
        label: '苹果'
      },
      {
        value: 3,
        label: '三星'
      }
      ],
      companyPropertyOptions: [
        { value: 1, label: '国家行政机构' },
        { value: 2, label: '公私合作企业' },
        { value: 3, label: '中外合资企业}'
        }],
      bussinessCatagoryOptions: [
        { value: 1, label: '国有企业类型' },
        { value: 2, label: '集体所有制类型' },
        { value: 3, label: '股份制企业类型' }
      ],
      companyOwnershipOptions: [
        { value: 1, label: '国营' },
        { value: 2, label: '私营' },
        { value: 3, label: '股份制' }
      ],
      taxRateOptions: [
        { value: 1, label: '6%' },
        { value: 2, label: '9%' },
        { value: 3, label: '13%' }
      ],
      taxTypeNameOptions: [
        { value: 1, label: '正常申报' },
        { value: 2, label: '欠税补缴' },
        { value: 3, label: '迟申报' }
      ],
      isDealwithOptions: [
        { value: 1, label: '是' },
        { value: 2, label: '否' }
      ],
      ourCompanyRelationshipOptions: [
        { value: '1', label: '支持' },
        { value: '2', label: '一般' },
        { value: '3', label: '反对' }
      ]
    }
  },
  methods: {
    addSupplierProduct() {
      this.supplierForm.saleThreeYears.push({
        year: '',
        sales: ''
      })
    },
    deleteSupplierProduct(index) {
      this.supplierForm.saleThreeYears.splice(index, 1)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
    }
  }
}
</script>

<style lang="scss">
  .addSupplierProduct {
    position: relative;
    margin-bottom: 18px;
    width: 600px;
  }

  .supplierProduct-add {
    position: absolute;
    left: 98px;
    font-size: 24px;
    color: #1890ff;
    top: 50%;
    margin-top: -12px;
  }

  .add-cont {
    background: #f7f7f7;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
  }

  .btnCenter {
    text-align: center;
  }
</style>
