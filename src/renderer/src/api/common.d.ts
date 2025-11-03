// 基础响应类型
export interface commonOutDTO<T> {
  code: number
  data: T
  isError?: boolean
  success: boolean
  msg: string
}

// 分页接口入参
export interface pageCommonInputDTO<T> {
  filter?: T
  orderBy?: string
  pageNum: number
  pageSize: number
}

// 分页接口出参
export interface pageCommonOutDTO<T> {
  list: T
  total: number
}

// 默认对象类型
export interface ObjectCommonDTO<T> {
  [key: string]: T
}
