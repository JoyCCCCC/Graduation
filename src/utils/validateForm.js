import { validMoney, validNum } from './validate'

/**
 * 校验表单金额格式
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateMoney(rule, value, callback) {
  if (value && value.toString().trim() && !validMoney(value.toString().trim())) {
    callback(new Error('请输入正确的金额格式'))
  } else {
    callback()
  }
}

/** 校验表格输入框金额 */
export function formatMoney(val) {
  // formatNum(val, key) {
  let temp = val.toString()
  // temp = temp.replace(/。/g, ".");
  temp = temp.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
  temp = temp.replace(/^\./g, '') // 验证第一个字符是数字
  temp = temp.replace(/\.{2,}/g, '') // 只保留第一个, 清除多余的
  temp = temp.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
  return temp
}

/**
 * 检验表单利率格式
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateRate(rule, value, callback) {
  if (value && value.toString().trim() && !validMoney(value.toString().trim())) {
    callback(new Error('请输入正确的利率格式'))
  } else {
    callback()
  }
}

/**
 * 检验数量格式
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateQuantity(rule, value, callback) {
  if (value && value.trim() && !validNum(value.trim())) {
    callback(new Error('请输入正确的数量格式'))
  } else {
    callback()
  }
}
