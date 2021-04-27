import _throttle from 'lodash/throttle';
import _debounce from 'lodash/debounce';
/**
 * 函数节流装饰器
 * @param {number} wait 节流的毫秒
 * @param {Object} options 节流选项对象
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
export const throttle = function (wait, options = {}) {
  return function (target, name, descriptor) {
    descriptor.value = _throttle(descriptor.value, wait, options)
  }
}

/**
 * 函数防抖装饰器
 * @param {number} wait 需要延迟的毫秒数。
 * @param {Object} options 选项对象
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 */
export const debounce = function (wait, options = {}) {
  return function (target, name, descriptor) {
    descriptor.value = _debounce(descriptor.value, wait, options)
  }
}
