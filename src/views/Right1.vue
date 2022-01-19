<template>
  <bottom-display-frame :name="'TiDB服务总览'" :height="250">
    <mysql-table :service="service" :up="mysql.serviceData" style="margin: auto"></mysql-table>
  </bottom-display-frame>
</template>

<script>
import MysqlTable from "@/components/MysqlTable";
import BottomDisplayFrame from "@/components/displayFrame/BottomDisplayFrame";
import MysqlData from "@/components/mysql/TidbData";
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
    }
  }

}
</script>

<style scoped>

</style>
