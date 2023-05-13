<template>
  <ContractInfo :type="type" />
</template>

<script>
import ContractInfo from '../components/contract/ContractInfo.vue'
import { contractForm, projectForm } from '../data'
export default {
  name: '',
  components: {
    ContractInfo
  },
  data: function() {
    return {
      contractForm: {},
      projectForm: {},
      expendContractForm: {},
      type: ''
    }
  },
  created() {
    this.contractForm = contractForm
    this.projectForm = projectForm
    this.type = this.$route.params && this.$route.params.type
    this.expendContractForm = this.$deepcopy({}, contractForm)
  },
  methods: {

  }
}
</script>

<style>
</style>
