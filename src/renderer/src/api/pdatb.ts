import axios from '@renderer/request/http'

import { commonOutDTO } from '@renderer/api/common'
import {
  DeletePdaDataParam,
  QueryPdaCcdjRes,
  QueryPdaKjtzRes,
  QueryPdaRcdjRes,
  TbPdasjParam
} from './pdatb-dto'

export default class pdatbService {
  // 查询PDA出厂登记数据
  static queryPdaCcdj(): Promise<commonOutDTO<QueryPdaCcdjRes[]>> {
    return axios.post('/api/pdatb/queryPdaCcdj')
  }

  // 查询PDA入厂登记数据
  static queryPdaRcdj(): Promise<commonOutDTO<QueryPdaRcdjRes[]>> {
    return axios.post('/api/pdatb/queryPdaRcdj')
  }

  // 查询PDA库间调整数据
  static queryPdaKjtz(): Promise<commonOutDTO<QueryPdaKjtzRes[]>> {
    return axios.post('/api/pdatb/queryPdaKjtz')
  }
  // 查询PDA例检任务数据
  static queryPdaLjrw(): Promise<commonOutDTO<any>> {
    return axios.post('/api/pdatb/queryPdaLjrw')
  }
  // 查询PDA定检任务数据
  static queryPdaDjrw(): Promise<commonOutDTO<any>> {
    return axios.post('/api/pdatb/queryPdaDjrw')
  }

  // 删除PDA数据
  static deletePdaData(data: DeletePdaDataParam): Promise<commonOutDTO<null>> {
    return axios.post('/api/pdatb/deletePdaData', data)
  }

  // 删除PDA数据
  static tbPdasj(data: TbPdasjParam): Promise<commonOutDTO<null>> {
    return axios.post('/api/pdatb/tbPdasj', data)
  }
}
