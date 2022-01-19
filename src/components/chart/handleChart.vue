<template>
  <div id="mainChart5" style="height: 95%;width: 95%"></div>
</template>

<script>
import TidbData from "@/components/mysql/TidbData";
import * as echarts from 'echarts';
import {formatWithSeperator} from "@/untils/datetime";

export default {
  name: "handleChart",
  mounted() {
    this.initChart()
  },
  data() {
    return {
      tidb: new TidbData(),
      option: {
        backgroundColor: 'rgb(255,255,255,0)',
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
              let unit = 'us'
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
              return value+'us'
            }
          },
        },
        series: []
      },
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('mainChart5'),'dark')
      this.chart.setOption(this.option)
      this.tidb.getHandle(this.triggerEvent)
    },
    triggerEvent() {
      let tempOption = this.option
      let timeArr = []
      let nameArr = ['tso-98%', 'tso-average']
      let seriesArr = []
      let arr1 = []
      let arr2 = []
      for(let i in this.tidb.handle98.data.result[0].values) {
        timeArr.push(formatWithSeperator(new Date(this.tidb.handle98.data.result[0].values[i][0]*1000),'/',':'))
        arr1.push((this.tidb.handle98.data.result[0].values[i][1]*Math.pow(10,6)).toFixed(0))
        arr2.push((this.tidb.handleAvg.data.result[0].values[i][1]*Math.pow(10,6)).toFixed(0))
      }
      seriesArr.push(arr1)
      seriesArr.push(arr2)
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
