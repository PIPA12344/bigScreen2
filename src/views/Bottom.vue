<template>
  <bottom-display-frame :name="name">
    <parameter-table @tableChange="tableChange"/>
  </bottom-display-frame>
</template>

<script>
import ParameterTable from "@/components/table/ParameterTable";
import BottomDisplayFrame from "@/components/BottomDisplayFrame";
export default {
  name: "Bottom",
  components: {
    BottomDisplayFrame,
    ParameterTable
  },
  data() {
    return {
      name: 'windows:服务器资源总览'
    }
  },
  methods: {
    tableChange(show) {
      this.$emit('tableChange',show)
    }
  }
}
</script>

<style scoped>

</style>
