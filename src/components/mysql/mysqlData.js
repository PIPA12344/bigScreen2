import {queryMysql} from "@/api/bigScreen/bigScreen";
import axios from "axios";
export default class MysqlData {
  query= {
    pdStorageCapacity: 'pd_cluster_status{tidb_cluster="",instance="192.168.1.140:2379",type="storage_capacity"}'
  }
  start = new Date().getTime() / 1000-21
  end = new Date().getTime() / 1000-20
  step = 2
  p = []
  getValue() {
    for (let i in this.query) {
      this.p[i] = queryMysql(this.query[i],this.start,this.end,this.step).then(res => {
        console.log(res)
      })
    }
    axios.all(this.p).then(() => {
      console.log(123456)
    })
  }
}
