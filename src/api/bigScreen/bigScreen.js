import {request} from "@/untils/request";
import {request2} from "@/untils/request";
export function queryRange(query,start,end,step) {
  return request({
    url: '/v1/query_range',
    params: {
      query,
      start,
      end,
      step
    },
    method: 'post'
  })
}
export function query(query,time) {
  return request({
    url: '/v1/query',
    params: {
      query,
      time
    },
    method: 'post'
  })
}

export function queryMysql(query,start,end,step) {
  return request2({
    url: '/v1/query_range',
    params: {
      query,
      start,
      end,
      step
    }
  })
}
// export function getArrst(avg_x,cv,cs) {
//   return request2( {
//     url: '/P3CurveService.svc/IniP3Curve',
//     params: {
//       avg_x,
//       cv,
//       cs
//     },
//     method: 'get'
//   })
// }
