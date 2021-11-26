<template>
    <div class="no-border-table">
      <el-table
        style="height: 80%"

        size="small"
        :data="tableData"
        :header-cell-style="{textAlign: 'center',padding: '0',height: '25px',backgroundColor: '#0f1326'}"
        :cell-style="{textAlign: 'center', height: '25px', padding: 0}"
        :row-style="{
        fontSize: '10px',
        maxHeight: '35px',
        }"
        :row-class-name="tableRowClassName"
        :header-row-class-name="'warning-row'"
        :border="false"
        @row-click="rowClick"
      >
        <template slot="empty">
          <div style="background-color: rgb(7,7,18);width: 200%;height: 100%;padding: 0;margin-left: -50%">
            暂无数据
          </div>
        </template>
        <el-table-column
          prop="instance"
          label="instance(连接到明细)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="runtime"
          label="运行时间"
          width="95">
        </el-table-column>
        <el-table-column
          prop="cpuCores"
          label="CPU核数"
          width="70">
        </el-table-column>
        <!--      <el-table-column-->
        <!--        prop="cpuFrequency"-->
        <!--        label="CPU频率"-->
        <!--        width="80">-->
        <!--      </el-table-column>-->
        <!--      <el-table-column-->
        <!--        prop="cpuUsage"-->
        <!--        label="CPU使用率"-->
        <!--        width="100">-->
        <!--      </el-table-column>-->
        <el-table-column
          prop="totalMemory"
          label="总内存"
          width="75">
        </el-table-column>
        <!--      <el-table-column-->
        <!--        prop="memoryUsage"-->
        <!--        label="内存使用率"-->
        <!--        width="100">-->
        <!--      </el-table-column>-->
        <!--      <el-table-column-->
        <!--        prop="usageRateOfC"-->
        <!--        label="C盘使用率"-->
        <!--        width="100">-->
        <!--      </el-table-column>-->
        <!--      <el-table-column-->
        <!--        prop="maxUsageRate"-->
        <!--        label="使用最多分区"-->
        <!--        width="120">-->
        <!--      </el-table-column>-->
        <!--      <el-table-column-->
        <!--        prop="numOfProcesses"-->
        <!--        label="进程数"-->
        <!--        width="100">-->
        <!--      </el-table-column>-->
        <!--      <el-table-column-->
        <!--        prop="numOfServices"-->
        <!--        label="运行服务"-->
        <!--        width="100">-->
        <!--      </el-table-column>-->
        <el-table-column
          label="操作"
          width="58"
        >
          <template slot-scope="scope" style="display: flex">
            <el-tooltip effect="dark" content="Filter for value" placement="top">
              <el-button
                @click.stop="filterForValue(scope.$index, scope.row)"
                type="text"
                class="el-icon-zoom-in"
                style="font-size: 10px;margin: 0;padding: 0"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="Filter out value" placement="top">
              <el-button
                @click.stop="filterOutValue(scope.$index, scope.row)"
                type="text"
                class="el-icon-zoom-out"
                style="font-size: 10px;margin: 0;padding: 0"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import {TableData} from "@/components/table/parameterTableData";
export default {
  name: "WindowsTable",
  mounted() {
    this.getTableValue()
  },
  data() {
    return {
      tableData: [],
      table: new TableData(),
      value: 1,
    }
  },
  computed: {
    showInstance() {
      const show = []
      for(let i in this.tableData) {
        show.push(this.tableData[i].instance)
      }
      return show
    }
  },
  methods: {
    sendTableData() {
      setTimeout(() => {
        this.$emit('sendTableData',this.table.config.data)
      },300)
    },
    getTableValue() {
      this.table.getTableValue(this.sendTableData)
      this.tableData = this.table.config.data
    },
    filterForValue(index,row) {
      let operateType = 'for'
      for(let i = this.tableData.length-1;i>=0;i--) {
        if(i !== index) {
          this.tableData.splice(i,1)
        }
      }
      this.$emit('tableChange',this.showInstance,index,operateType)
    },
    filterOutValue(index,row) {
      let operateType = 'out'
      this.tableData.splice(index,1)
      this.$emit('tableChange',this.showInstance,index,operateType)
    },
    tableRowClassName({row,rowIndex}) {
      if(rowIndex %2 === 1) {
        return 'warning-row'
      }
      else {
       return 'success-row'
      }
    },
    rowClick(row) {
      for(let i in this.showInstance) {
        if(this.showInstance[i] === row.instance) {
          this.$emit('rowClick',Number(i)+1)
        }
      }
    }
  }
}
</script>

<style scoped>
.el-table >>>.warning-row {
  background: #0f1326;
}

.el-table >>>.success-row {
  background: #171c34;
}
/* 去掉中间数据的分割线 */
.no-border-table >>>.el-table__row>td{
  /* 去除表格线 */
  border: none;
}
.no-border-table >>> .el-table th.is-leaf {
  /* 去除上边框 */
  border: none;
}
.no-border-table >>> .el-table::before {
  /* 去除下边框 */
  height: 0;
}

</style>
