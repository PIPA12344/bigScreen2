<template>
  <center-display-frame2 :options="options" @chartChange="chartChange">
    <cmds-chart v-if="chartNum===1"/>
    <handle-chart v-if="chartNum===2"/>
    <memory-chart v-if="chartNum===3"/>
    <store-size-chart v-if="chartNum===4"/>
  </center-display-frame2>
</template>

<script>

import CmdsChart from "@/components/chart/cmdsChart";
import HandleChart from "@/components/chart/handleChart";
import MemoryChart from "@/components/chart/MemoryChart";
import StoreSizeChart from "@/components/chart/StoreSizeChart";
import CenterDisplayFrame2 from "@/components/displayFrame/CenterDisplayFrame2";
export default {
  name: "Right3",
  components: {StoreSizeChart, MemoryChart, HandleChart, CenterDisplayFrame2, CmdsChart},
  mounted() {
  },
  data() {
    return {
      chartNum: 1,
      options: [
        {
          value: 1,
          label: '99% completed cmds duration seconds'
        },
        {
          value: 2,
          label: 'Handle requests duration seconds'
        },
        {
          value: 3,
          label: 'Memory'
        },
        {
          value: 4,
          label: 'Store Size'
        }
      ]
    }
  },
  methods: {
    chartChange(value) {
      this.chartNum = value
    },
  }
}
</script>

<style scoped>

</style>
