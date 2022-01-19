<template>
  <dv-full-screen-container class="bg">
    <el-row>
      <el-col :span="24">
        <title1>
          监控面板
        </title1>
      </el-col>
    </el-row>
    <el-row style="height: 100%;display: flex;justify-content: space-around">
      <el-col :span="8">
        <bottom-display-frame :name="'windows服务器资源总览'" :height="200">
          <windows-table style="background-color: black;margin: auto" @tableChange="tableChange" @rowClick="rowClick" ref="table" @sendTableData="getTableData"></windows-table>
        </bottom-display-frame>
        <center-left style="width: 100%" ref="centerLeft"></center-left>
      </el-col>
      <el-col :span="8" style="height: 100%">
        <dv-border-box12 style="height: 280px">
          <Left3 style="width: 95%;margin: 0 0 0 2.5%;height: 95%;padding-top: 5%" ref="left3" :table-data="tableData"></Left3>
        </dv-border-box12>
      </el-col>
      <el-col :span="8" >
        <el-row>
          <el-col :span="24">
            <right1></right1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <right2></right2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" >
            <right3></right3>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </dv-full-screen-container>
</template>

<script>
import CenterLeft from "@/views/CenterLeft";
import Left3 from "@/views/Left3";
import Title1 from "@/components/title/Title";
import BottomDisplayFrame from "@/components/displayFrame/BottomDisplayFrame";
import WindowsTable from "@/components/WindowsTable";
import Right1 from "@/views/Right1";
import Right2 from "@/views/Right2";
import Right3 from "@/views/Right3";
export default {
  name: "index",
  components: {
    Right3,
    Right2,
    WindowsTable,
    BottomDisplayFrame,
    CenterLeft,
    Left3,
    Title1,
    Right1
  },
  mounted() {
  },
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    tableChange(show,index,type) {
      this.$refs.centerLeft.changeShow(show)
      this.$refs.left3.changeOptions(show,index,type)
    },
    rowClick(value) {
      this.$refs.left3.instance = value
      this.$refs.left3.instanceChange(value)
    },
    getTableData(tableData) {
      let selectOptions = []
      this.tableData = tableData
      for(let i in tableData) {
        selectOptions.push({
          value: Number(i)+1,
          label: tableData[i].instance
        })
      }
      this.$refs.left3.options = selectOptions
    }
  }
}
</script>

<style>
  body {
    margin: 0;
  }
  .bg {
    background-image: url('../assets/pageBg.jpg');
    z-index: 9;
  }
</style>
