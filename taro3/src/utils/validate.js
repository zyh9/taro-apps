const MOBILE_REG = /^1\d{10}$/; // 验证手机号
const EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/; // 验证邮箱
const MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/; // 验证RMB
const NAME_REG = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/; // 名字（包括中文、英文、数字）
const CHINESE_REG = /^[\u4e00-\u9fa5]+$/; // 名字（中文）
const BANKNO_REG = /^\d{16,19}$/; // 银行卡号
const PWD_REG = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/; // 六位密码（包含英文、数字）

function isRule(regText, value) {
  if (!value || value.length == 0) return false;
  const reg = new RegExp(regText);
  if (!reg.test(value)) {
    return false;
  }
  return true;
}

const validate = {
  isFromWeixin: () => {
    // 是否微信
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  isIos() {
    // 是否IOS
    let { userAgent } = navigator;
    let IsiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return IsiOS;
  },
  isMobile: mobile => {
    // 手机号
    return isRule(MOBILE_REG, mobile);
  },
  isEmail: email => {
    // 邮箱
    return isRule(EMAIL_REG, email);
  },
  isMoney: money => {
    // RMB
    return isRule(MONEY_REG, money);
  },
  isUsername: name => {
    // 名字（包括中文、英文、数字）
    return isRule(NAME_REG, name);
  },
  isChinese: name => {
    // 名字（中文）
    return isRule(CHINESE_REG, name);
  },
  isBankNo: name => {
    // 银行卡号
    return isRule(BANKNO_REG, name);
  },
  isPwd: pwd => {
    // 六位密码（包含英文、数字）
    return isRule(PWD_REG, pwd);
  },
  isIdCard: card => {
    // 身份证号
    if (!card) return true;
    var num = card.toUpperCase();
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
      return false;
    }
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    // 下面分别分析出生日期和校验位
    var len;
    var re;
    var birthday;
    var sex;
    len = num.length;
    if (len == 15) {
      // 获取出生日期
      birthday = `19${card.substring(6, 8)}-${card.substring(
        8,
        10
      )}-${card.substring(10, 12)}`;
      // 获取性别
      sex = parseInt(card.substr(14, 1)) % 2 == 1 ? 'M' : 'F';

      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      var arrSplit = num.match(re);

      // 检查生日日期是否正确
      var dtmBirth = new Date(`19${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
      var bGoodDay;
      bGoodDay =
        dtmBirth.getYear() == Number(arrSplit[2]) &&
        dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
        dtmBirth.getDate() == Number(arrSplit[4]);
      if (!bGoodDay) {
        return false;
      } else {
        // 将15位身份证转成18位
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum;
        var arrInt = new Array(
          7,
          9,
          10,
          5,
          8,
          4,
          2,
          1,
          6,
          3,
          7,
          9,
          10,
          5,
          8,
          4,
          2
        );
        var arrCh = new Array(
          '1',
          '0',
          'X',
          '9',
          '8',
          '7',
          '6',
          '5',
          '4',
          '3',
          '2'
        );
        var nTemp = 0;
        var i;

        num = `${num.substr(0, 6)}19${num.substr(6, num.length - 6)}`;
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        num += arrCh[nTemp % 11];
      }
    } else if (len == 18) {
      // 获取出生日期
      birthday = `${card.substring(6, 10)}-${card.substring(
        10,
        12
      )}-${card.substring(12, 14)}`;
      // 获取性别
      sex = parseInt(card.substr(16, 1)) % 2 == 1 ? 'M' : 'F';

      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var arrSplit = num.match(re);

      // 检查生日日期是否正确
      var dtmBirth = new Date(`${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
      var bGoodDay;
      bGoodDay =
        dtmBirth.getFullYear() == Number(arrSplit[2]) &&
        dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
        dtmBirth.getDate() == Number(arrSplit[4]);
      if (!bGoodDay) {
        return false;
      } else {
        // 检验18位身份证的校验码是否正确。
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum;
        var arrInt = new Array(
          7,
          9,
          10,
          5,
          8,
          4,
          2,
          1,
          6,
          3,
          7,
          9,
          10,
          5,
          8,
          4,
          2
        );
        var arrCh = new Array(
          '1',
          '0',
          'X',
          '9',
          '8',
          '7',
          '6',
          '5',
          '4',
          '3',
          '2'
        );
        var nTemp = 0;
        var i;
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != num.substr(17, 1)) {
          return false;
        }
      }
    }
    return {
      birthday,
      sex
    };
  }
};
module.exports = validate;
