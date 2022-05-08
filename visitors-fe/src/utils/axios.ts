import axios from "axios";

console.log("axios base url", import.meta.env.VITE_BASE_URL);
// console.log("axios base url", process.env.VUE_APP_BASE_URL);
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  //   baseURL: "http://zuo11.com:3000/",
  timeout: 60000,
  headers: { "X-Custom-Header": "foobar" },
});

// axios.interceptors.request.use(resolve func, reject func)
// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    console.log("request 拦截: ", config);

    // 为所有请求加一个时间戳参数
    config.url += (config?.url?.includes("?") ? "&" : "?") + "t=" + +new Date();

    return config; // 用来请求的参数
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
