
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 验证金额输入框格式
 * @param {*} money
 * @returns {Boolean}
 */
export function validMoney(money) {
  return /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(money)
}

/**
 * 验证数量输入框格式
 * @param {*} num
 */
export function validNum(num) {
  return /^[0-9]*[1-9][0-9]*$/.test(num)
}
