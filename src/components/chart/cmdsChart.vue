<template>
  <div id="mainChart4" style="height: 95%;width: 95%"></div>
</template>

<script>
import * as echarts from 'echarts';
import TidbData from "@/components/mysql/TidbData";
import {formatWithSeperator} from "@/untils/datetime";
export default {
  name: "cmdsChart",
  mounted() {
    this.initChart()
  },
  data() {
    return {
      tidb: new TidbData(),
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
            let str = '<div style="color: white">'+params[0].axisValue+'</div>'+"<br />";
            params.forEach((item) => {
              let unit = 'ms'
              str +='<span style="float: left;color:white"><span style="display:inline-block;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+item.color+'"></span>' + '<span> '+item.seriesName+' </span></span>'+'&nbsp&nbsp'+'<span style="float: right;color: white"> '+item.data+unit+'</span>' +"<br />";
            });
            return str;
          }
        },
        legend: {
          data: [],
          show: false,
          selected: {

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
              return vArr[0]+':'+vArr[1 ]
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
          // maxInterval: 50*1024*1024,
          // minInterval: 50*1024,
          axisTick:{
            show :false
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            //设置y轴刻度
            formatter: function (value,index) {
              return value+'ms'
            }
          },
        },
        series: []
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('mainChart4'),'dark')
      this.chart.setOption(this.option)
      this.tidb.getCmds(this.triggerEvent)
    },
    triggerEvent() {
      let tempOption = this.option
      let timeArr = []
      let nameArr = []
      let seriesArr = []
      for(let i  in this.tidb.cmdsData[0].values) {
        timeArr.push(formatWithSeperator(new Date(this.tidb.cmdsData[0].values[i][0]*1000),'/',':'))
      }
      for(let i in this.tidb.cmdsData) {
        let arr = []
        nameArr.push(this.tidb.cmdsData[i].metric.grpc_method)
        for(let j in this.tidb.cmdsData[i].values) {
          if(this.tidb.cmdsData[i].values[j][1]==='NaN') {
            this.tidb.cmdsData[i].values[j][1] = 0
          }
          arr.push((this.tidb.cmdsData[i].values[j][1]*1000).toFixed(2))
        }
        seriesArr.push(arr)
      }
      for(let i in seriesArr) {
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
        tempOption.series[i].name = nameArr[i]
        tempOption.series[i].data = seriesArr[i]
      }
      tempOption.legend.data = nameArr
      tempOption.xAxis.data = timeArr
      this.chart.setOption(tempOption,true)
    }
  }
}
</script>

<style scoped>

</style>
