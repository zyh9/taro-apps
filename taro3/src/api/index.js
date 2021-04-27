import { COMMON_POST } from "@/utils/request";

// 错误上报
export const ApiLog = data =>
  COMMON_POST({
    url: "/api/log",
    data,
    isLoad: false
  });
