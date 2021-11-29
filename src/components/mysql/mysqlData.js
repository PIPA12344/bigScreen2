import {queryMysql} from "@/api/bigScreen/bigScreen";
import axios from "axios";
export default class MysqlData {
  resourceQuery= {
    pdStorageCapacity: 'pd_cluster_status{tidb_cluster="",instance="192.168.1.140:2379",type="storage_capacity"}'
  }
  serviceQuery = [
    'count(probe_success{tidb_cluster="", group="tidb"} == 1)',
    'count(probe_success{tidb_cluster="", group="pd"} == 1)',
    'count(probe_success{tidb_cluster="", group="tikv"} == 1)',
    'count(probe_success{tidb_cluster="", group="node_exporter"} == 1)',
    'count(probe_success{tidb_cluster="", group="blackbox_exporter"} == 1)',
    'count(probe_success{tidb_cluster="", group="grafana"} == 1)'
  ]
  start = new Date().getTime() / 1000-21
  end = new Date().getTime() / 1000-20
  step = 2
  serviceData = []
  resourceData = []
  getService() {
    let p = []
    for (let i in this.serviceQuery) {
      p[i] = queryMysql(this.serviceQuery[i],this.start,this.end,this.step).then(res => {
        this.serviceData.push(res.data.result[0].values[0][1])
      })
    }
    axios.all(p).then(() => {
      console.log(123)
    })
  }
  getResource() {
    let p = []
    for (let i in this.resourceQuery) {
      p[i] = queryMysql(this.resourceQuery[i],this.start,this.end,this.step).then(res => {
        console.log(res)
      })
    }
    axios.all(p).then(() => {
      console.log(123456)
    })
  }
}
