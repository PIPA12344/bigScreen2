import axios from "axios"
export function request(config) {
  const instance =axios.create({
    baseURL: 'http://172.16.35.6:9090/api',
    timeout: 5000,
  })
  instance.interceptors.request.use(config => {
    return config
  },error => {
    console.log(error)
  })
  instance.interceptors.response.use(res => {
    return res.data
  },error => {
    console.log(error)
  })
  return instance(config)
}

export function request2(config) {
  const instance =axios.create({
    baseURL: 'http://116.63.52.201:9090/api',
    timeout: 5000,
  })
  instance.interceptors.request.use(config => {
    return config
  },error => {
    console.log(error)
  })
  instance.interceptors.response.use(res => {
    return res.data
  },error => {
    console.log(error)
  })
  return instance(config)
}
