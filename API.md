#Windows监控面板
##服务器资源总览表格SQL语句
### 查询服务器基本信息
- windows_os_info{job="windows"} * on(instance) group_right(product) windows_cs_hostname
### 查询运行时间
- time() - windows_system_system_up_time{job="windows"}
### 查询Cpu核心数
- windows_cs_logical_processors{job="windows"}
### 查询Cpu频率
- avg by (instance) (windows_cpu_core_frequency_mhz{job="windows"})
### 查询Cpu使用率
- 100 - (avg by (instance) (irate(windows_cpu_time_total{job="windows",mode="idle"}[2m])) * 100)
### 查询总内存
- windows_cs_physical_memory_bytes{job="windows"}
### 查询内存使用率
- 100 - 100 * windows_os_physical_memory_free_bytes{job="windows"} / windows_cs_physical_memory_bytes{job="windows"}
### 查询C盘使用率
* 1 - (windows_logical_disk_free_bytes{job="windows",volume=~"C:"}/windows_logical_disk_size_bytes{job="windows",volume=~"C:"})
### 查询使用最多分区使用率
- max by (instance) (1-windows_logical_disk_free_bytes{job="windows"}/windows_logical_disk_size_bytes{job="windows"})
### 查询进程数
- windows_os_processes{job="windows"}
### 查询服务数量
- sum by (instance) (windows_service_state{job="windows",state="running"})

##专项监控图表
### 查询各主机cpu使用率图表
- 100 - (avg by (instance) (irate(windows_cpu_time_total{job=~"$job",mode="idle"}[2m])) * 100)
### 查询各主机磁盘读写情况
 - -max by (instance) (irate(windows_logical_disk_read_bytes_total[2m]))
 - max by (instance) (irate(windows_logical_disk_write_bytes_total[2m]))

#MySql监控面板
## 服务状态
### tidb 
- count(probe_success{tidb_cluster="", group="tidb"} == 1)
### pd
- count(probe_success{tidb_cluster="", group="pd"} == 1)
### tikv
- count(probe_success{tidb_cluster="", group="tikv"} == 1)
### node_exporter
- count(probe_success{tidb_cluster="", group="node_exporter"} == 1)
### blackbox_exporter
- count(probe_success{tidb_cluster="", group="blackbox_exporter"} == 1)
### grafana
- count(probe_success{tidb_cluster="", group="grafana"} == 1)




### 查询存储容量
- pd_cluster_status{instance="192.168.1.140:2379",type="storage_capacity"}

