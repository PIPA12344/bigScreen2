<template>
  <el-container>
    <el-header style="width: 100%;height: 35px;padding: 0">
      <div style="float: left;color:#c8c8da;margin-top: -5px">资源明细
        <el-select v-model="instance" @change="instanceChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-header>
    <el-main style="padding: 0">
      <el-row style="height: 100%;padding: 0">
        <el-col :span="8" style="height:100%">
          <hash-board style="height: 100%" :cpu-usage-rate="cpuUsageRate" :memory-usage-rate="memoryUsageRate" :instance="instance" ref="hashBoard"/>
        </el-col>
        <el-col :span="16" style="height: 60%" >
          <partition-usage ref="partition" style="margin-left: 20px"></partition-usage>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import HashBoard from "@/components/dashBoard/HashBoard";
import PartitionUsage from "@/components/partitionUsage/PartitionUsage";
export default {
  name: "Left3",
  components: {PartitionUsage, HashBoard},
  props: {
    tableData: []
  },
  mounted() {
    setInterval(() => {
      this.instanceChange(this.instance)
    },1000*60*3)
  },
  data() {
    return {
      instance: 1,
      options: [

      ],
    }
  },
  computed: {
    cpuUsageRate() {
      let cpuUsageRateArr = []
      for(let i in this.tableData) {
        cpuUsageRateArr.push(this.tableData[i].cpuUsage)
      }
      return cpuUsageRateArr
    },
    memoryUsageRate() {
      let memoryUsageRateArr = []
      for(let i in this.tableData) {
        memoryUsageRateArr.push(this.tableData[i].memoryUsage)
      }
      return memoryUsageRateArr
    }
  },
  methods: {
    instanceChange(value) {
      this.$refs.hashBoard.triggerEvent(value)
      this.$refs.partition.triggerEvent(value)
      this.instance = value
    },
    changeOptions(show,index,type) {
      this.options = []
      for(let i in show) {
        this.options.push({
          value: Number(i)+1,
          label: show[i]
        })
      }
      if(show.length === 0) {
        this.instance = ''
        this.$refs.partition.clear()
        this.$refs.hashBoard.clear()
      }
      else if(type === 'for') {
        for(let i = this.$refs.partition.config.length-1; i>=0; i--) {
          if(i !== index) {
            this.$refs.partition.partitionUsageData.yArr.splice(i*4,4)
          }
        }
        this.$refs.hashBoard.triggerEvent(index+1)
        this.$refs.partition.triggerEvent(1)
      }
      else if(type === 'out') {
        this.$refs.partition.partitionUsageData.yArr.splice(index*4,4)
        console.log(index,this.instance)
        if(index+1 === this.instance) {
          if(index === 0) {
            this.$refs.hashBoard.triggerEvent(2)
            this.$refs.partition.triggerEvent(1)
          }
          else {
            this.$refs.hashBoard.triggerEvent(1)
            this.$refs.partition.triggerEvent(1)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
>>>.el-input__inner {
  margin-top: -8px;
  width: 180px;
  color:#c8c8da;
  background-color: rgba(255,255,255,0);
  border-right-width: 0;
  border-left-width: 0;
  border-top-width: 0;
  border-bottom-width: 0;
}
</style>
