import {queryRange} from "@/api/bigScreen/bigScreen";
import {formatWithSeperator} from "@/untils/datetime";
export class QueryRange {
  constructor(query) {
    this.query = query
  }
  query = ''
  start = new Date().getTime()/1000-3600
  end = new Date().getTime()/1000
  step = 14
  getValue() {
    this.min = 100
    this.xArr = []
    this.yArr = []
    this.instanceArr = []
    queryRange(this.query,this.start,this.end,this.step).then(res => {
      for(let i in res.data.result) {
        this.instanceArr.push(res.data.result[i].metric.instance)
        this.yArr.push([])
        for(let j in res.data.result[i].values) {
          if(i == 0) {
           this.xArr.push(formatWithSeperator(new Date(res.data.result[i].values[j][0])*1000,'/',':'))
          }
          if(Number(res.data.result[i].values[j][1]) < this.min) {
            this.min = Number(res.data.result[i].values[j][1])
          }
          this.yArr[i].push([formatWithSeperator(new Date(res.data.result[i].values[j][0])*1000,'/',':'),Number(res.data.result[i].values[j][1]).toFixed(2)])
        }
      }
    })
  }
}
