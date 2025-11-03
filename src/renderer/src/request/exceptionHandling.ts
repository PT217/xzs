
import { ElMessage } from 'element-plus'

interface CodeExceptionHandling {
  systemError: boolean
  message: string
  exception: string
}

// 代码异常处理
export const codeExceptionHandling = (e: CodeExceptionHandling) => {
  if (!e) {
    return
  }
  if (e.systemError) {
    // 系统异常，跳过
    return
  }
  if (e.message) {
    // 优先提示 message
    ElMessage.warning(e.message)
  } else if (e.exception) {
    // 其次 exception
    // ElMessage.warning(`${e.exception}`)
    console.log(e.exception)
  } else {
    ElMessage.warning('系统异常')
  }
}
