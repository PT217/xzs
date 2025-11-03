// HTTP拦截器
import axios, { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import * as CryptoJS from "crypto-js";
import Cookies from "js-cookie";

axios.defaults.baseURL = "";

// 创建axios实例
const instance = axios.create({
  // 是否跨站点访问控制请求
  timeout: 1000 * 60,
});

// 常用header
export enum CommonHeaderEnum {
  "TENANT_ID" = "TENANT-ID",
  "ENC_FLAG" = "Enc-Flag",
  "AUTHORIZATION" = "Authorization",
}

/**
 *加密处理
 */
const encryption = (src: string, keyWord: string) => {
  const key = CryptoJS.enc.Utf8.parse(keyWord);
  // 加密
  var encrypted = CryptoJS.AES.encrypt(src, key, {
    iv: key,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding,
  });
  return encrypted.toString();
};

const Session = {
  // 设置临时缓存
  set(key: string, val: any) {
    if (key === "token" || key === "refresh_token" || key === "tenantId") {
      Cookies.set(key, val);
    }
    window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  // 获取临时缓存
  get(key: string) {
    if (key === "token" || key === "refresh_token" || key === "tenantId")
      return Cookies.get(key);
    let json = <string>window.sessionStorage.getItem(key);
    return JSON.parse(json);
  },
  // 移除临时缓存
  remove(key: string) {
    if (key === "token" || key === "refresh_token" || key === "tenantId")
      return Cookies.remove(key);
    window.sessionStorage.removeItem(key);
  },
  // 移除全部临时缓存
  clear() {
    Cookies.remove("token");
    Cookies.remove("refresh_token");
    Cookies.remove("tenantId");
    window.sessionStorage.clear();
  },
  // 获取当前存储的 token
  getToken() {
    return this.get("token");
  },
  // 获取当前的租户
  getTenant() {
    return 1;
  },
};

// 请求前拦截
instance.interceptors.request.use(
  (config) => {
    // 统一增加Authorization请求头, skipToken 跳过增加token
    const token = Session.getToken();
    if (token && !config.headers?.skipToken) {
      config.headers![CommonHeaderEnum.AUTHORIZATION] = `Bearer ${token}`;
    }

    // 统一增加TENANT-ID请求头
    const tenantId = Session.getTenant();
    if (tenantId) {
      config.headers![CommonHeaderEnum.TENANT_ID] = tenantId;
    }

    // 请求报文加密
    if (config.headers![CommonHeaderEnum.ENC_FLAG]) {
      const enc = encryption(JSON.stringify(config.data), "pigxpigxpigxpigx");
      config.data = {
        encryption: enc,
      };
    }

    // 处理完毕，返回config对象
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

// 不需要在请求返回后统一处理的URL
const EXCLUDE_URLS: string[] = ["/api/xtfw/connect", "/api/pctb/tbpcsj"];
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    // 不需要拦截的接口，放行
    if (res.config.url && EXCLUDE_URLS.indexOf(res.config.url) >= 0) {
      return Promise.resolve(res.data);
    }
    if (res.data.code === 0 || res.data.code === 200) {
      return Promise.resolve(res.data);
    } else {
      /**
       * 1. 2开头的为业务异常
       * 2. 其他的都是系统异常
       */
      const systemError = !String(res.data.code).startsWith("2");
      // 系统异常将错误信息打印
      if (systemError && res.data.message) {
        ElMessage.warning(`${res.data.message}`);
      }
      // 无 code 为结构异常
      if (!res.data.code) {
        ElMessage.warning(`接口出参结构异常: ${res.config.url}`);
      }
      return Promise.reject({
        systemError,
        ...res.data,
      });
    }
  },
  // 请求失败
  (error) => {
    if (error.response) {
      /**
       * 请求成功发出且服务器也响应了，但出现了异常
       */
      if (error.response.data && error.response.data.message) {
        // 先看data中是否有提示信息
        ElMessage.warning(error.response.data.message);
      } else {
        // data中无提示信息，则使用自定义的
        const msg = HTTP_STATUS[error.response.status];
        msg && ElMessage.warning(msg);
      }
    } else if (error.request) {
      // 请求成功发出但服务器未响应
      // ElMessage.warning('未获取到服务器响应信息，请检查请求地址是否正确')
    } else {
      // 请求发出失败
      // ElMessage.warning('请求发送失败，请检查请求地址是否正确')
    }
    return Promise.reject({
      systemError: true,
    });
  }
);
/**
 * 自定义异常信息
 */
const HTTP_STATUS: {
  [key: number]: string;
} = {
  405: "请求不被允许，请检查接口地址或请求方式是否正确",
};

export default instance;
