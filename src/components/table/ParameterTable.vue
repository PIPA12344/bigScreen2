<template>
<!--  <dv-scroll-board :config="config" style="height:85%;width: 100%;margin-top: 0" ref="scrollBoard" />-->
  <test style="height:85%;width: 200%" @tableChange="tableChange"/>
</template>

<script>
import {TableData} from "@/components/table/parameterTableData";
import Test from "@/components/WindowsTable";
export default {
  name: "parameterTable",
  components: {
    Test
  },
  mounted() {
    setInterval(() => {
      this.getTableValue()
    },1000*60*3)
    this.getTableValue()
  },
  data() {
    return {
      tableData: new TableData(),
      config: {
      },
    }
  },
  methods: {
    getTableValue() {
      this.tableData.getTableValue()
      this.config = this.tableData.config
    },
    tableChange(show) {
      this.$emit('tableChange',show)
    }
  }
}
</script>

<style scoped>

</style>
