import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = { vus: 5, duration: '10s', thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: ['p(95)<1500'] } }
export default function () {
  const response = http.get(`${__ENV.BASE_URL || 'http://localhost:3000'}/api/weather?city=Paris&model=ecmwf_ifs025`)
  check(response, { 'weather responds': (res) => res.status === 200 })
  sleep(1)
}
