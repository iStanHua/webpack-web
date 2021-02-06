// utils/validate.js 验证

/**
 * 特殊字符
 */
export function ValidateSpecialChar(value) {
  return /[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(value)
}

/**
 * 密码(包含 数字,英文,字符中的两种以上，长度6-20)
 */
export function ValidatePassword(value) {
  return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/.test(value)
}

/**
 * 手机号码
 */
export function ValidatePhoneNumber(value) {
  return /^1[3456789]\d{9}$/.test(value)
}

/**
 * 电话号码
 */
export function ValidateTelephone(value) {
  return /^0\d{2,3}-?\d{7,8}$/.test(value)
}

/**
 * 联系电话
 */
export function ValidateContact(value) {
  return ValidatePhoneNumber(value) || ValidateTelephone(value)
}

/**
 * 邮箱
 */
export function ValidateEmail(value) {
  return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)
}

/**
 * 身份证
 */
export function ValidateIdCard(value) {
  return /^\d{15}$|^\d{17}[0-9Xx]$/.test(value)
}

/**
 * 邮政编码
 */
export function ValidateZipcode(value) {
  return /^[1-9][0-9]{5}$/.test(value)
}

/**
 * 金额
 */
export function ValidateMomey(value) {
  return /^-?\d*(\.\d{0,2})?$/.test(value)
}

/**
 * 纯数字
 */
export function ValidatePureNumber(value) {
  return /^[0-9]*$/.test(value)
}

/**
 * 车牌号
 */
export function ValidateCarNumber(value) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(value)
}

/**
 * 中文
 */
export function ValidateChinese(value) {
  return /[\u4E00-\u9FA5]/.test(value)
}

/**
 * 表情符号
 */
export function ValidateEmoji(value) {
  return /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value)
}

/**
 * 货币格式
 */
export function currencyFormat(value) {
  value = value.replace(/\,/g, '')
  return value.replace(/(?!^)(?=(\d{3})+$)/g, ',')
}

/**
 * 手机格式
 */
export function phoneFormat(value) {
  value = trim(value)
  return value.replace(/(?!^)(?=(\d{4})+$)/g, ' ')
}

/**
 * 清除所有空格
 */
export function trim(value) {
  return value.replace(/\s/g, '')
}

/**
 * 中国移动号码
 */
export function ValidateChinaMobile(value) {
  return /^1(3[4-9]|4[7]|5[012789]|7[28]|8[23478]|9[578])\d{8}$/.test(value)
}

/**
 * 中国联通号码
 */
export function ValidateUnicomMobile(value) {
  return /^1(3[0-2]|4[56]|5[56]|6[6]|7[0156]|8[56]|9[6])\d{8}$/.test(value)
}

/**
 * 中国电信号码
 */
export function ValidateTelecomMobile(value) {
  return /^1(3[3]|4[19]|5[3]|7[3479]|8[019]|9[0139])\d{8}$/.test(value)
}

/**
 * IP地址
 */
export function ValidateIP(value) {
  return /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/.test(value)
}