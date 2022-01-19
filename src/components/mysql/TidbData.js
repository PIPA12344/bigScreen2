import {queryTidb} from "@/api/bigScreen/bigScreen";
import axios from "axios";
import handleChart from "@/components/chart/handleChart";
export default class TidbData {
  resourceQuery= [
    'pd_tso_role{tidb_cluster="", instance="192.168.1.140:2379", dc="global"}',
    'pd_cluster_status{tidb_cluster="",instance="192.168.1.140:2379",type="storage_capacity"}',
    'pd_cluster_status{tidb_cluster="",instance="192.168.1.140:2379",type="storage_size"}',
    'pd_cluster_status{tidb_cluster="",instance="192.168.1.140:2379", type="leader_count"}',
    'sum(pd_cluster_status{tidb_cluster="",instance="192.168.1.140:2379",type="store_up_count"})'
  ]
  serviceQuery = [
    'count(probe_success{tidb_cluster="", group="tidb"} == 1)',
    'count(probe_success{tidb_cluster="", group="pd"} == 1)',
    'count(probe_success{tidb_cluster="", group="tikv"} == 1)',
    'count(probe_success{tidb_cluster="", group="node_exporter"} == 1)',
    'count(probe_success{tidb_cluster="", group="blackbox_exporter"} == 1)',
    'count(probe_success{tidb_cluster="", group="grafana"} == 1)'
  ]
  cmdsQuery = 'histogram_quantile(0.99, sum(rate(grpc_server_handling_seconds_bucket{ instance="192.168.1.140:2379"}[5m])) by (grpc_method, le))'
  handleQuery = [
    'histogram_quantile(0.98, sum(rate(pd_client_request_handle_requests_duration_seconds_bucket{tidb_cluster=""}[30s])) by (type, le))',
    'avg(rate(pd_client_request_handle_requests_duration_seconds_sum{tidb_cluster=""}[30s])) by (type) / avg(rate(pd_client_request_handle_requests_duration_seconds_count{tidb_cluster=""}[30s])) by (type)'
  ]
  tiKVMemoryQuery = 'avg(process_resident_memory_bytes{tidb_cluster="", job="tikv"}) by (instance)'
  storeSizeQuery = 'sum(tikv_engine_size_bytes{tidb_cluster=""}) by (instance)'
  start = new Date().getTime() / 1000-21
  start2 = new Date().getTime() / 1000 - 3620
  end = new Date().getTime() / 1000-20
  step = 2
  step2 = 30
  serviceData = []
  resourceData = []
  cmdsData = []
  handle98 = []
  handleAvg = []
  tiKVMemoryData = []
  storeSizeData = []
  getService() {
    for (let i in this.serviceQuery) {
      queryTidb(this.serviceQuery[i],this.start,this.end,this.step).then(res => {
        this.serviceData.push(res.data.result[0].values[0][1])
      })
    }
  }
  getResource(callback) {
    let p = []
    for (let i in this.resourceQuery) {
      p[i] = queryTidb(this.resourceQuery[i],this.start,this.end,this.step).then(res => {
        this.resourceData[i] = res.data.result[0].values[0][1]
      })
    }
    axios.all(p).then(() => {
      callback()
    })
  }
  getCmds(callback) {
    queryTidb(this.cmdsQuery,this.start2,this.end,this.step2).then(res => {
      for(let i in res.data.result) {
        for(let j in res.data.result[i].values) {
          if(res.data.result[i].values[j][1] !== "NaN") {
            this.cmdsData.push(res.data.result[i])
            break
          }
        }
      }
      callback()
    })
  }
  getHandle(callback) {
    let p = []
    for(let i in this.handleQuery) {
      p[i] = queryTidb(this.handleQuery[i],this.start2,this.end,this.step2).then(res => {
        if(Number(i) === 0) {
          this.handle98 = res
        }
        else if(Number(i) === 1) {
          this.handleAvg = res
        }
      })
    }
    axios.all(p).then(()=> {
      callback()
    })
  }
  getTiKVMemory(callback) {
    queryTidb(this.tiKVMemoryQuery,this.start2,this.end,this.step2).then(res => {
      for(let i in res.data.result) {
        this.tiKVMemoryData.push(res.data.result[i])
      }
      callback()
    })
  }
  getStoreSize(callback) {
    queryTidb(this.storeSizeQuery,this.start2,this.end,this.step2).then(res => {
      for(let i in res.data.result) {
        this.storeSizeData.push(res.data.result[i])
      }
      callback()
    })
  }
}
