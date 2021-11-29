<template>
  <bottom-display-frame :name="'mysql服务总览'" :height="250">
    <mysql-table :service="service" :up="mysql.serviceData" style="margin: auto"></mysql-table>
  </bottom-display-frame>
</template>

<script>
import MysqlTable from "@/components/MysqlTable";
import BottomDisplayFrame from "@/components/BottomDisplayFrame";
import MysqlData from "@/components/mysql/mysqlData";
export default {
  name: "Right1",
  components: {MysqlTable, BottomDisplayFrame},
  data() {
    return {
      mysql: new MysqlData(),
      service: ['TiDB','PD','TiKV','Node_exporter','Blackbox_exporter','Grafana']
    }
  },
  mounted() {
    this.getMysqlService()
  },
  methods:  {
    getMysqlService() {
      this.mysql.getService()
      console.log(this.mysql.serviceData)
    }
  }

}
</script>

<style scoped>

</style>
