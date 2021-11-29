<template>
  <div class="no-border-table">
    <el-table
      :data="mysqlService"
      size="small"
      :header-cell-style="{textAlign: 'center',padding: '0',height: '25px',backgroundColor: '#0f1326'}"
      :cell-style="{textAlign: 'center', height: '25px', padding: 0}"
      :row-style="{
        fontSize: '10px',
        maxHeight: '35px',
        }"
      :row-class-name="tableRowClassName"
      :header-row-class-name="'warning-row'"
    >
      <el-table-column
      prop="service"
      label="Service"
      width="200"
      >
      </el-table-column>
      <el-table-column
        prop="up"
        label="Up"
        width="200"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MysqlTable",
  props: {
    service: '',
    up: ''
  },
  computed: {
    mysqlService() {
      let serviceArr = []
      for(let i in this.service) {
        let a = {
          service: this.service[i],
          up: this.up[i]
        }
        serviceArr.push(a)
      }
      return serviceArr
    },
  },
  methods: {
    tableRowClassName({row,rowIndex}) {
      if(rowIndex %2 === 1) {
        return 'warning-row'
      }
      else {
        return 'success-row'
      }
    },
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
