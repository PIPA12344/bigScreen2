<template>
  <div style="height: 95%;width: 95%">
    <div v-if="this.isCpu" id = "mainChart1"></div>
    <div v-else id="mainChart2"></div>
  </div>
</template>

<script>
import {QueryRange} from "@/untils/queryRange";
import * as echarts from 'echarts';
export default {
  name: "UsageRateChart",
  mounted() {
    this.initChart()
    this.triggerEvent()
    setInterval(() => {
      this.triggerEvent()
    },1000*60*3)
  },
  props: {
    name: {
      default: '各主机CPU使用率',
      type: String
    }
  },
  data() {
    return {
      areaStyleColor: ['rgb(31,53,66)','rgb(44,58,48)','rgb(33,45,52)','rgb(62,52,40)','rgb(49,43,40)','rgb(54,51,46)'],
      color: ['rgb(31,119,192)','rgb(97,180,121)','rgb(109,206,223)','rgb(219,185,74)','rgb(204,80,79)','rgb(237,131,61)'],
      option: {
        backgroundColor: 'rgb(255,255,255,0)',
        // title: {
        //   link: 'http://localhost:8080/chart1',
        //   target: 'self',
        //   text: this.name,
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
          // backgroundColor: 'rgb(255,255,255,0)',
          backgroundColor: 'rgba(55,55,55,0.5)',
          borderColor: 'rgba(0,0,0,0)',
          formatter: function (params) {
            let str = '<div style="color: white">'+params[0].data[0]+'</div>' + "<br />";
            params.forEach((item) => {
              str +='<span style="float: left;color:white"><span style="display:inline-block;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+item.color+'"></span>' + '<span> '+item.seriesName+' </span></span>'+'&nbsp&nbsp'+'<span style="float: right;color: white"> '+item.data[1]+'% </span>' +"<br />";
            });
            return str;
          }
        },
        legend: {
          data: [],
          show: false,
          selected: {
            '172.16.35.12:9182': true,
            '172.16.35.13:9182': true,
            '172.16.35.14:9182': true,
            '172.16.35.15:9182': true,
            '172.16.35.53:9182': true,
            '172.16.35.6:9182': true,
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
          top: '10%',
          height: '75%',
          width: '80%',
          right: '7%'
        },
        yAxis: {
          max: 100,
          min: 0,
          z: 9,
          axisTick:{
            show :false
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}%'
          },
        },
        series: []
      }
    }
  },
  computed: {
    isCpu() {
      if(this.name === '各主机CPU使用率') {
        return true
      }
      else {
        return false
      }
    },
    query() {
      if(this.isCpu) {
        return '100 - (avg by (instance) (irate(windows_cpu_time_total{job=~"windows",mode="idle"}[2m])) * 100)'
      }
      else {
        return '100 - 100 * windows_os_physical_memory_free_bytes{job="windows"} / windows_cs_physical_memory_bytes{job="windows"}'
      }
    }
  },
  methods: {
    initChart() {
      if(this.isCpu) {
        this.charts1 = echarts.init(document.getElementById('mainChart1'),'dark');
      }
      else {
        this.charts2 = echarts.init(document.getElementById('mainChart2'),'dark');
      }
      if(this.isCpu) {
        this.charts1.setOption(this.option)
      }
      else {
        this.charts2.setOption(this.option)
      }
    },
    triggerEvent() {
      let cpuUsageData = new QueryRange(this.query)
      cpuUsageData.getValue()
      let tempOption = this.option
      tempOption.xAxis.data = cpuUsageData.xArr
      setTimeout(() => {
        if(cpuUsageData.min<10) {
          tempOption.yAxis.min = 0
        }
        else {
          tempOption.yAxis.min = Number(cpuUsageData.min.toString()[0]+'0')
        }
        tempOption.legend.data = cpuUsageData.instanceArr
        for(let i = 0; i < cpuUsageData.yArr.length; i++) {
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
            //
            color: this.color[i],
            areaStyle: {
              color: this.areaStyleColor[i]
            },
            data: [],
          })
          tempOption.series[i].name = cpuUsageData.instanceArr[i]
          tempOption.series[i].data = cpuUsageData.yArr[i]
        }
         if(this.isCpu) {
           this.charts1.setOption(tempOption,true)
         }
         else {
           this.charts2.setOption(tempOption,true)
         }
      },500)
    },
    setOption() {
      if(this.isCpu) {
        this.charts1.setOption(this.option,true)
      }
      else {
        this.charts2.setOption(this.option,true)
      }
    }
  }
}
</script>

<style scoped>
#mainChart1 {
  width: 100%;
  height: 90%
}
#mainChart2 {
  width: 100%;
  height: 90%
}
</style>
