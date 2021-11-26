import {query} from "@/api/bigScreen/bigScreen";
import axios from "axios";
export class TableData {
  query = {
    runTimeSearchQuery: 'time() - windows_system_system_up_time{job="windows"}',
    cpuCoresSearchQuery: 'windows_cs_logical_processors{job="windows"}',
    cpuFrequencyQuery: 'avg by (instance) (windows_cpu_core_frequency_mhz{job="windows"})',
    cpuUsageQuery: '100 - (avg by (instance) (irate(windows_cpu_time_total{job="windows",mode="idle"}[2m])) * 100)',
    totalMemoryQuery: 'windows_cs_physical_memory_bytes{job="windows"}',
    memoryUsageRateQuery: '100 - 100 * windows_os_physical_memory_free_bytes{job="windows"} / windows_cs_physical_memory_bytes{job="windows"}',
    usageRateOfCQuery: '1 - (windows_logical_disk_free_bytes{job="windows",volume=~"C:"}/windows_logical_disk_size_bytes{job="windows",volume=~"C:"})',
    maxUsageRateQuery: 'max by (instance) (1-windows_logical_disk_free_bytes{job="windows"}/windows_logical_disk_size_bytes{job="windows"})',
    numOfProcessesQuery: 'windows_os_processes{job="windows"}',
    numOfServicesQuery: 'sum by (instance) (windows_service_state{job="windows",state="running"})',
  }
  config = {
    headerBGC: 'rgb(15,19,38)',
    oddRowBGC: 'rgb(23,28,52)',
    evenRowBGC: 'rgb(15,19,38)',
    align: ['center','center','center','center','center','center','center','center','center','center','center','center',],
    columnWidth: [180,100,100,100,100,80,100,100,120,80,80],
    header: ['instance(连接到明细)','运行时间','CPU核数','CPU频率','CPU使用率','总内存','内存使用率','C盘使用率','使用最多分区','进程数','运行服务'],
    data: [],
  }
  start = new Date().getTime() / 1000-21
  end = new Date().getTime() / 1000-20
  step = 2
  p = []
  pushProperty = 0
  getTableValue(callback) {
    for (let i in this.query) {
      this.p[i] = query(this.query[i], this.start).then(res => {
        if(this.pushProperty === 0) {
          this.pushProperty = 1
          for(let i = 0;i < res.data.result.length; i++) {
            this.config.data.push({
              instance: '',
              runtime: '',
              cpuCores:'',
              cpuFrequency: '',
              cpuUsage: '',
              totalMemory: '',
              memoryUsage: '',
              usageRateOfC: '',
              maxUsageRate: '',
              numOfProcesses: '',
              numOfServices: ''
            })
          }
        }
        switch (i) {
          case 'runTimeSearchQuery': {
            for (let j in res.data.result) {
              let item = res.data.result[j].metric.instance
              let runtime = res.data.result[j].value[1] / 3600 / 24 / 7
              this.config.data[j].instance = item
              this.config.data[j].runtime = runtime.toFixed(2) + ' week'
            }
            break
          }
          case 'cpuCoresSearchQuery': {
            for (let j in res.data.result) {
              this.config.data[j].cpuCores = res.data.result[j].value[1]
            }
            break
          }
          case 'cpuFrequencyQuery': {
            for (let j in res.data.result) {
              this.config.data[j].cpuFrequency = (res.data.result[j].value[1] / 1000).toFixed(2) + ' GHz'
            }
            break
          }
          case 'cpuUsageQuery': {
            for (let j in res.data.result) {
              this.config.data[j].cpuUsage = (res.data.result[j].value[1] / 1).toFixed(2) + '%'
            }
            break
          }
          case 'totalMemoryQuery': {
            for (let j in res.data.result) {
              this.config.data[j].totalMemory = (res.data.result[j].value[1] / 1024 / 1024 / 1024).toFixed(1) + 'GiB'
            }
            break
          }
          case 'memoryUsageRateQuery': {
            for (let j in res.data.result) {
              this.config.data[j].memoryUsage= (res.data.result[j].value[1] / 1).toFixed(2) + '%'
            }
            break
          }
          case 'usageRateOfCQuery': {
            for (let j in res.data.result) {
              this.config.data[j].usageRateOfC =(res.data.result[j].value[1] * 100).toFixed(2) + '%'
            }
            break
          }
          case 'maxUsageRateQuery': {
            for (let j in res.data.result) {
              this.config.data[j].maxUsageRate = (res.data.result[j].value[1] * 100).toFixed(2) + '%'
            }
            break
          }
          case 'numOfProcessesQuery': {
            for (let j in res.data.result) {
              this.config.data[j].numOfProcesses = (res.data.result[j].value[1])
            }
              break
          }
          case 'numOfServicesQuery' : {
            for (let j in res.data.result) {
              this.config.data[j].numOfServices = (res.data.result[j].value[1])
            }
            break
          }
        }
      })
    }
    axios.all(this.p).then(() => {
      callback()
    })
  }
}
