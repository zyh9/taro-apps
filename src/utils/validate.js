import {
  msg,
} from './index.js';
//检测手机号
const authPhone = tel => {
  let reg = /^[1][3-9]\d{9}$/;
  if (reg.test(tel)) {
    return true;
  } else {
    if (tel != '') {
      msg('请输入正确的手机号')
    } else {
      msg('请输入手机号')
    }
    return false;
  }
}

//检测图片验证码
const authCode = (val, type = 1) => {
  let reg = /^\d{4}$/;
  let str = type == 1 ? `短信` : `图形`;
  if (reg.test(val)) {
    return true;
  } else {
    if (val != '') {
      msg(`请输入完整的${str}验证码`)
    } else {
      msg(`请输入${str}验证码`)
    }
    return false;
  }
}

//检测密码
const authPassword = (password, againPw) => { //密码  再次输入
  let reg = /^\d{6}$/;
  if (againPw != undefined) {
    if (!password || !againPw) {
      msg('请输入密码')
      return false;
    } else if (password.length < 6 || againPw.length < 6) {
      msg('密码为6位数')
      return false;
    } else if (password != againPw) {
      msg('两次密码不一致');
      return false;
    } else if (reg.test(password) && reg.test(againPw)) {
      return true
    }
  } else {
    if (!password) {
      msg('请输入密码')
      return false;
    } else if (password.length < 6) {
      msg('密码为6位数')
      return false;
    } else if (reg.test(password)) {
      return true;
    }
  }
}

export {
  authPhone,
  authCode,
  authPassword,
}
