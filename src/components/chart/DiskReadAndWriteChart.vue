<template>
  <div id="mainChart3" style="height: 95%;width: 95%"></div>
</template>

<script>
import * as echarts from 'echarts';
import {QueryRange} from "@/untils/queryRange";
export default {
  name: "DiskReadAndWriteChart",
  mounted() {
    this.initChart()
    this.triggerEvent()
    setInterval(() => {
      this.triggerEvent()
    },1000*60*3)
  },
  data() {
    return {
      readQuery: '-max by (instance) (irate(windows_logical_disk_read_bytes_total[2m]))',
      writeQuery: 'max by (instance) (irate(windows_logical_disk_write_bytes_total[2m]))',
      nameArr: [],
      read: [],
      write: [],
      option: {
        backgroundColor: 'rgb(255,255,255,0)',
        // title: {
        //   link: 'http://localhost:8080/chart1',
        //   target: 'self',
        //   text: '各主机磁盘读写情况',
        //   left: 'center',
        //   top: '12',
        //   textStyle: {
        //     color: '#cacadb',
        //     fontWeight: 'normal',
        //     fontSize: 18
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          backgroundColor: 'rgba(55,55,55,0.5)',
          borderColor: 'rgba(0,0,0,0)',
          formatter: function (params) {
            let str = '<div style="color: white">'+params[0].data[0]+'</div>'+"<br />";
            params.forEach((item) => {
              let unit = 'B/s'
              if(Math.abs(item.data[1]) >= 1024  && Math.abs(item.data[1]) < 1024*1024)
              {
                item.data[1] = (item.data[1]/1024).toFixed(1)
                 unit = 'kB/s'
              }
              else if(Math.abs(item.data[1]) > 1024*1024) {
                item.data[1] = (item.data[1]/1024/1024).toFixed(1)
                 unit = 'MB/s'
              }
              else {
                item.data[1] = Number(item.data[1]).toFixed(1)
                unit = 'B/s'
              }
              str +='<span style="float: left;color:white"><span style="display:inline-block;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+item.color+'"></span>' + '<span> '+item.seriesName+' </span></span>'+'&nbsp&nbsp'+'<span style="float: right;color: white"> '+item.data[1]+unit+'</span>' +"<br />";
            });
            return str;
          }
        },
        legend: {
          data: [],
          show: false,
          selected: {
            '172.16.35.12:9182_Read': true,
            '172.16.35.12:9182_Write': true,
            '172.16.35.13:9182_Read': true,
            '172.16.35.13:9182_Write': true,
            '172.16.35.14:9182_Read': true,
            '172.16.35.14:9182_Write': true,
            '172.16.35.15:9182_Read': true,
            '172.16.35.15:9182_Write': true,
            '172.16.35.53:9182_Read': true,
            '172.16.35.53:9182_Write': true,
            '172.16.35.6:9182_Read': true,
            '172.16.35.6:9182_Write': true,
          }
        },
        xAxis: {
          z: 9,
          type: 'category',
          splitLine: {
            show: true,
          },
          splitNumber: 8,
          axisTick:{       //x轴刻度线
            show: false
          },
          data: [],
          axisLabel: {
            show: true,
            interval: 'auto',
            fontSize: 10,
            formatter: function (value,index) {
              const vArr = value.split(' ')[1].split(':')
              return vArr[0]+':'+vArr[1]
            }
          },
        },
        grid: {
          left: '20%',
          top: '10%',
          width: '76%',
          height: '70%',
        },
        yAxis: {
          z: 9,
          maxInterval: 50*1024*1024,
          minInterval: 50*1024,
          axisTick:{
            show :false
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: function (value,index) {
              return (value/1024/1024).toFixed(0) + 'MB/s'
            }
          },
        },
        series: []
      },
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('mainChart3'),'dark')
      this.chart.setOption(this.option)
    },
    triggerEvent() {
      let tempOption = this.option
      let readData = new QueryRange('-max by (instance) (irate(windows_logical_disk_read_bytes_total[2m]))')
      let writeData = new QueryRange('max by (instance) (irate(windows_logical_disk_write_bytes_total[2m]))')
      readData.getValue()
      writeData.getValue()
      this.read = readData
      this.write = writeData
      setTimeout(() => {
        for(let i in readData.instanceArr) {
          this.nameArr.push(readData.instanceArr[i] + '_Read')
        }
        for(let i in writeData.instanceArr) {
          this.nameArr.push(writeData.instanceArr[i] + '_Write')
        }
        let seriesArr = readData.yArr
        for(let i in writeData.yArr) {
           seriesArr.push(writeData.yArr[i])
        }
        for(let i = 0; i < seriesArr.length; i++) {
          tempOption.series.push({
            symbol: 'none',
            name: '',
            type: 'line',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 0.8
                }
              }
            },
            data: [],
          })
          tempOption.series[i].name = this.nameArr[i]
          tempOption.series[i].data = seriesArr[i]
        }
        tempOption.legend.data = this.nameArr
        tempOption.xAxis.data = readData.xArr
        this.chart.setOption(tempOption,true)
      },500)

    },
    setOption() {
      this.chart.setOption(this.option,true)
    }
  }
}
</script>

<style scoped>
  #mainChart3 {
    width: 100%;
    height: 90%
  }
</style>
