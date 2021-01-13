import store from "@/store"; // rematch

const env = "pro"; // dev 开发环境 pro 生产
let baseUrl = "";
if (env == "dev") {
  baseUrl = "";
} else if (env == "pro") {
  baseUrl = "";
}

// import { version } from "~/package.json";

const commonHeader = () => {
  // 公共header
  const { login } = store.getState(); // 获取token
  // console.log(login)
  return {
    token: login.Token || "",
  };
};

export { baseUrl, commonHeader, store };
