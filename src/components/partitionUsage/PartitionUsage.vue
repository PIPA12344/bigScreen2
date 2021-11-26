<template>
<div>
  <div style="color: #c8c8da;font-size: 10px;float: left">
    各分区使用率
  </div>
  <br />
  <el-row>
    <div style="color: white;font-size: 20px;float: left">C:</div>
  </el-row>
  <el-row>
    <dv-percent-pond :config="config[0]" style="width:100%;height:30px;" />
  </el-row>
  <el-row>
    <div style="color: white;font-size: 20px;float: left">D:</div>
  </el-row>
  <el-row>
    <dv-percent-pond :config="config[1]" style="width:100%;height:30px;" />
  </el-row>
  <el-row>
    <div style="color: white;font-size: 20px;float: left">E:</div>
  </el-row>
  <el-row>
    <dv-percent-pond :config="config[2]" style="width:100%;height:30px;" />
  </el-row>
  <el-row>
    <div style="color: white;font-size: 20px;float: left">HarddiskVolume1</div>
  </el-row>
  <el-row>
    <dv-percent-pond :config="config[3]" style="width:100%;height:30px;" />
  </el-row>
</div>
</template>

<script>
import {Query} from "@/untils/query";
export default {
  name: "PartitionUsage",
  mounted() {
    this.initPool()
    this.triggerEvent(1)
  },
  data() {
    return {
      partitionUsageData: new Query('100 - (windows_logical_disk_free_bytes{job=~"windows"} / windows_logical_disk_size_bytes{job=~"windows"})*100'),
      config: [
        {
          value: 0,
          colors: ['#32CD32','#FF0000']
        },
        {
          value: 0,
          colors: ['#32CD32','#FF0000']
        },
        {
          value: 0,
          colors: ['#32CD32','#FF0000']
        },
        {
          value: 0,
          colors: ['#32CD32','#FF0000']
        },
      ],
      config2: [
        {
          value:22,
          colors: ['#32CD32','#FF0000']
        },
        {
          value:44,
          colors: ['#32CD32','#FF0000']
        },
        {
          value:66,
          colors: ['#32CD32','#FF0000']
        },
        {
          value:88,
          colors: ['#32CD32','#FF0000']
        },
      ]
    }
  },
  methods: {
    initPool() {
      this.partitionUsageData.getValue()
    },
    triggerEvent(value) {
      setTimeout(() => {
        for(let i=0;i<4;i++) {
          this.config2[i].value = this.partitionUsageData.yArr[(value-1)*4+i]
        }
        this.config = JSON.parse(JSON.stringify(this.config2))
      },500)
    },
    clear() {
      this.config = [
        {
          value: 0,
          colors: ['#32CD32','#FF0000']
        },
        {
          value: 0,
          colors: ['#32CD32','#FF0000']
        },
        {
          value: 0,
          colors: ['#32CD32','#FF0000']
        },
        {
          value: 0,
          colors: ['#32CD32','#FF0000']
        },
      ]
    }
  }

}
</script>

<style scoped>

</style>
