import {query} from "@/api/bigScreen/bigScreen";
export class Query {
  constructor(query) {
    this.query = query
  }
  query = ''
  time = new Date().getTime()/1000-10
  getValue() {
    this.yArr = []
    query(this.query,this.time).then(res => {
      for(let i in res.data.result) {
        this.yArr.push(Number(res.data.result[i].value[1]).toFixed(2))
      }
    })
  }
}
