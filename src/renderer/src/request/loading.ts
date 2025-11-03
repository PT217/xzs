import { ElLoading } from 'element-plus'
let loadingInstance: any
let loadingNum = 0
/**
 * @描述: 打开loading
 */
const startLoading = (text?: string) => {
  if (loadingNum === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: text || '加载中...',
      background: 'rgba(0, 0, 0, 0.2)'
    })
  }
  // 请求数量加1
  loadingNum++
}
/**
 * @描述: 关闭loading
 */
const closeLoading = () => {
  // 请求数量减1
  loadingNum--
  if (loadingNum <= 0) {
    loadingInstance.close()
  }
}

export { startLoading, closeLoading }
