import axios from '@renderer/request/http'

import { commonOutDTO } from '@renderer/api/common'
import { GetZxtbsjParam, GetZxtbsjRes } from './xtfw-dto'

export default class xtfwService {
  // 连接PDA
  static connect(): Promise<commonOutDTO<null>> {
    return axios.post('/api/xtfw/connect')
  }

  // 获取最新同步时间
  static getZxtbsj(data: GetZxtbsjParam): Promise<commonOutDTO<GetZxtbsjRes>> {
    return axios.post('/api/xtfw/getZxtbsj', data)
  }
}
