<template>
  <ContractInfo :parent-props="parentProps" />
</template>

<script>
import ContractInfo from './components/contract/ContractInfo'
export default {
  name: '',
  components: {
    ContractInfo
  },
  data: function() {
    return {

      parentProps: {
        entryType: this.$route.params && this.$route.params.entryType,
        contractType: this.$route.query.contractType,
        projectId: this.$route.query.projectId,
        contractId: this.$route.params && this.$route.params.contractId
      }
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style>
</style>
