import {request} from "@/untils/request";
import {request2} from "@/untils/request";
import {request3} from "@/untils/request";

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

export function queryTidb(query,start,end,step) {
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
export function getArrst(avg_x,cv,cs) {
  return request3( {
    url: '/ht_p3/service/P3CurveService.svc/IniP3Curve',
    params: {
      avg_x,
      cv,
      cs
    },
    method: 'get'
  })
}
