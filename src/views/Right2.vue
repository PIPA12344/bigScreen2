<template>
  <el-row style="display: flex;justify-content: space-around" >
    <el-col :span="5">
      <dv-border-box12 style="height: 100px">
        <div class="title1">
          PD role
        </div>
        <div class="text1">
          Leader
        </div>
      </dv-border-box12>
    </el-col>
    <el-col :span="5">
      <dv-border-box12 style="height: 100px">
        <div class="title2">
          Storage capacity
        </div>
        <div class="text2">
          {{storageCapacity}}
        </div>
      </dv-border-box12>
    </el-col>
    <el-col :span="5">
      <dv-border-box12 style="height: 100px">
        <div class="title2">
          Current storage size
        </div>
        <div class="text2">
          {{currentStorageSize}}
        </div>
      </dv-border-box12>
    </el-col>
    <el-col :span="5">
      <dv-border-box12 style="height: 100px">
        <div class="title2">
          Number of Regions
        </div>
        <div class="text2">
          {{numberOfRegions}}
        </div>
      </dv-border-box12>
    </el-col>
    <el-col :span="5">
      <dv-border-box12 style="height: 100px">
        <div class="title1">
          Normal stores
        </div>
        <div class="text1">
          {{normalStores}}
        </div>
      </dv-border-box12>
    </el-col>
  </el-row>
</template>

<script>
import MysqlData from "@/components/mysql/TidbData";
export default {
  name: "Right2",
  created() {
    this.init()
  },
  data() {
    return {
      mysql: new MysqlData(),
      storageCapacity: '',
      currentStorageSize: '',
      numberOfRegions: '',
      normalStores: '',
    }
  },
  methods: {
    init() {
      this.mysql.getResource(this.triggerEvent)
    },
    triggerEvent() {
      this.storageCapacity = (this.mysql.resourceData[1]/Math.pow(10,12)).toFixed(1)+'TB'
      this.currentStorageSize = (this.mysql.resourceData[2]/Math.pow(10,9)).toFixed(1)+'GB'
      this.numberOfRegions = this.mysql.resourceData[3]
      this.normalStores = this.mysql.resourceData[4]
    }
  }
}
</script>

<style scoped>
  .title1 {
    padding-top: 15%;
    color: white;
  }
  .title2 {
    padding-top: 5%;
    color: white;
  }
  .text1 {
    margin-top: 20%;
    color: white;
    font-size: 25px;
    font-weight: bold;
  }
  .text2 {
    margin-top: 12%;
    color: white;
    font-size: 25px;
    font-weight: bold;
  }
</style>
