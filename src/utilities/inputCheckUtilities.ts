import _ from 'lodash'

export function isValidSizeNum(num: number): boolean {
  if (_.isSafeInteger(num) && 0 < num && num < 10000) {
    return true
  } else {
    return false
  }
}
