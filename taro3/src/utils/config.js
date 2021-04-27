import store from "@/store"; // rematch

let BASE_URL = "";

if (TARO_PLAT.indexOf("test") > -1) {
  BASE_URL = "";
} else {
  BASE_URL = "";
}

// TODO 小程序版本号
const DEV_VER = "1.0.0";

console.table({
  DEV_MODE: TARO_PLAT,
  DEV_VER,
  BASE_URL,
});

const BASE_HEADER = () => {
  const { login } = store.getState();
  // console.log(login)
  return {
    token: login.token || "",
  };
};

export { BASE_URL, BASE_HEADER, store };
