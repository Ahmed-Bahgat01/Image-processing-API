import { isValidSizeNum } from '../../utilities/inputCheckUtilities'

describe('isValidNum() tests', () => {
  it('tests valid size num should return false', () => {
    expect(isValidSizeNum(200)).toEqual(true)
  })
  it('tests -ve size num should return false', () => {
    expect(isValidSizeNum(-1)).toEqual(false)
  })
  it('tests 0 size num should return false', () => {
    expect(isValidSizeNum(0)).toEqual(false)
  })
})
