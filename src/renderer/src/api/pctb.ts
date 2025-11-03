import axios from '@renderer/request/http'

import { commonOutDTO } from '@renderer/api/common'

export default class pctbService {
  // 同步PC端最新数据到PDA
  static tbpcsj(): Promise<commonOutDTO<any>> {
    return axios.post('/api/pctb/tbpcsj', null, {
      timeout: 1000 * 60 * 10
    })
  }
}
