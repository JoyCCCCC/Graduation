<template>
  <div class="search-container mb-18">
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: 'SearchPart',
  components: {},
  data: function() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
  .search-container{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fdf6ec;
    border-color: #faecd8;
    padding: 18px 10px 0px 10px;

   ::v-deep .el-form--inline{
        .el-form-item{
          margin-right:10px;
          .el-date-editor{
            width: 240px;
          }
          /* .el-input{
             width:inherit !important;
          } */
          .el-form-item__label{
            padding: 0px !important;
          }

          .el-cascader{
            .el-input{
              width:180px !important;
            }
          }
        }
      }

    ::v-deep .el-form{
        .el-date-editor{
          display: flex;
        }
      }

    /* .el-form-item{
      margin-bottom: 0px !important;
    } */
  }
</style>
