<template>
  <div>
    <div id="hashBoard1" style="width: 100%;height: 40%"></div>
    <div id="hashBoard2" style="width: 100%;height: 40%;margin-top: 30px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "HashBoard",
  props: {
    cpuUsageRate: [],
    memoryUsageRate: [],
  },
  mounted() {
    this.initChart()
    setTimeout(() => {
      this.triggerEvent(1)
    },500)
  },
  methods: {
    changeOptions(show, index,type) {

    },
    initChart() {
      this.chart1 = echarts.init(document.getElementById('hashBoard1'),'dark')
      this.chart2 = echarts.init(document.getElementById('hashBoard2'),'dark')
      this.chart1.setOption(this.option1)
      this.chart2.setOption(this.option2)
    },
    triggerEvent(value) {
      this.option1.series[0].data[0].value = parseFloat(this.cpuUsageRate[value-1])/100
      this.option2.series[0].data[0].value = parseFloat(this.memoryUsageRate[value-1])/100
      this.chart1.setOption(this.option1,true)
      this.chart2.setOption(this.option2,true)
    },
    clear() {
      this.option1.series[0].data[0].value = 0
      this.option2.series[0].data[0].value = 0
      this.chart1.setOption(this.option1,true)
      this.chart2.setOption(this.option2,true)
    }
  },
  data() {
    return {
      option1: {
        backgroundColor: 'rgb(255,255,255,0)',
        title: {
          text: 'CPU使用率',
          textStyle: {
            fontSize: 15
          },
          padding: [10,35]
        },
        grid: {
          id: 'hashBoard1',
          shou: true,
          height: '100%',
          width: '100%',
          top: '20%',
        },
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#7CFFB2'],
                  [0.5, '#58D9F9'],
                  [0.75, '#FDDD60'],
                  [1, '#FF6E76']
                ]
              }
            },
            pointer: {
              length: '80%',
              width: 2,
              offsetCenter: [0, '-20%'],
              itemStyle: {
                color: 'auto'
              }
            },
            radius: '100%',
            center: ['50%','80%'],
            axisTick: {
              length: 5,
              lineStyle: {
                color: 'auto',
                width: 1
              }
            },
            splitLine: {
              length: 10,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            axisLabel: {
              show: false,
              color: '#464646',
              fontSize: 10,
              distance: -30,
              formatter: function (value) {
                if (value === 0.875) {
                  return 'D';
                } else if (value === 0.625) {
                  return 'C';
                } else if (value === 0.375) {
                  return 'B';
                } else if (value === 0.125) {
                  return 'A';
                }
                return '';
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 10
            },
            detail: {
              fontSize: 15,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 100) + '%';
              },
              color: 'auto'
            },
            data: [
              {
                value: 0.7,
              }
            ]
          }
        ]
      },
      option2: {
        backgroundColor: 'rgb(255,255,255,0)',
        title: {
          text: '内存使用率',
          textStyle: {
            fontSize: 15
          },
          padding: [10,35]
        },
        grid: {
          id: 'hashBoard1',
          shou: true,
          height: '100%',
          width: '100%',
          top: '20%',
        },
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.25, '#7CFFB2'],
                  [0.5, '#58D9F9'],
                  [0.75, '#FDDD60'],
                  [1, '#FF6E76']
                ]
              }
            },
            pointer: {
              length: '80%',
              width: 2,
              offsetCenter: [0, '-20%'],
              itemStyle: {
                color: 'auto'
              }
            },
            radius: '100%',
            center: ['50%','80%'],
            axisTick: {
              length: 5,
              lineStyle: {
                color: 'auto',
                width: 1
              }
            },
            splitLine: {
              length: 10,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            axisLabel: {
              show: false,
              color: '#464646',
              fontSize: 10,
              distance: -30,
              formatter: function (value) {
                if (value === 0.875) {
                  return 'D';
                } else if (value === 0.625) {
                  return 'C';
                } else if (value === 0.375) {
                  return 'B';
                } else if (value === 0.125) {
                  return 'A';
                }
                return '';
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 10
            },
            detail: {
              fontSize: 15,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 100) + '%';
              },
              color: 'auto'
            },
            data: [
              {
                value: 0.7,
              }
            ]
          }
        ]
      },
    }
  }
}
</script>

<style scoped>

</style>
