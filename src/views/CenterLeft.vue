<template>
  <center-display-frame1 :decoration-num="decorationNum" @chartChange="chartChange" :options="options" >
    <usage-rate-chart class="chart" ref="usage" v-if="chartNum===1" :name="'各主机CPU使用率'" :key="chartNum"/>
    <usage-rate-chart class="chart" ref="usage" v-if="chartNum===2" :name="'各主机内存使用率'" :key="chartNum"/>
    <disk-read-and-write-chart class="chart" ref="disk" v-if="chartNum===3"/>
  </center-display-frame1>
</template>

<script>
import UsageRateChart from "@/components/chart/UsageRateChart";
import CenterDisplayFrame1 from "@/components/displayFrame/CenterDisplayFrame1";
import DiskReadAndWriteChart from "@/components/chart/DiskReadAndWriteChart";
export default {
  name: "CenterLeft",
  components: {
    DiskReadAndWriteChart,
    UsageRateChart,
    CenterDisplayFrame1
  },
  data() {
    return {
      chartNum: 1,
      decorationNum: 3,
      show: [
        '172.16.35.12:9182',
        '172.16.35.13:9182',
        '172.16.35.14:9182',
        '172.16.35.15:9182',
        '172.16.35.53:9182',
        '172.16.35.6:9182'
      ],
      options: [
        {
          value: 1,
          label: '各主机CPU使用率'
        },
        {
          value: 2,
          label: '各主机内存使用率'
        },
        {
          value: 3,
          label:'各主机磁盘读写情况'
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    chartChange(value) {
      this.chartNum = value
      switch (value) {
        case 1:
          this.decorationNum = 3
          break
        case 2:
          this.decorationNum = 1
          break
        case 3:
          this.decorationNum = 6
      }
      this.changeShow(this.show)
    },
    changeShow(show) {
      this.show = show
      if(this.chartNum === 1|| this.chartNum ===2) {
        for(let i in this.$refs.usage.option.legend.selected) {
          this.$refs.usage.option.legend.selected[i] = false
        }
        for(let i in this.show) {
          this.$refs.usage.option.legend.selected[this.show[i]] = true
        }
      }
      else {
        for(let i in this.$refs.disk.option.legend.selected) {
          this.$refs.disk.option.legend.selected[i] = false
        }
        for(let i in this.show) {
          this.$refs.disk.option.legend.selected[this.show[i]+'_Read'] = true
          this.$refs.disk.option.legend.selected[this.show[i]+'_Write'] = true
        }
      }
      if(this.chartNum === 1 || this.chartNum === 2) {
        this.$refs.usage.setOption()
      }
      else {
        this.$refs.disk.setOption()
      }
    }
  }
}
</script>

<style scoped>

</style>
