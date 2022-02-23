import {
  isImgHere,
  isSameSize,
  resize,
  wasServedBefore,
} from '../../utilities/resizeUtilities'
//import sharp from 'sharp'

describe('isSameSize() suite', () => {
  it('should isSameSize(exist image, right w, right h) be ture', async () => {
    const result = await isSameSize(
      'public/resized/a-edited-w100-h100.jpg',
      100,
      100
    )
    expect(result).toEqual(true)
  })
  it('should isSameSize(NOT exist image, right w, right h) throw', async () => {
    const result = await isSameSize(
      'public/resized/notExist-w100-h100.jpg',
      100,
      100
    )
    expect(result).toThrow
  })
  it('should isSameSize(exist image, wrong w, right h) be false', async () => {
    const result = await isSameSize(
      'public/resized/a-edited-w100-h100.jpg',
      200,
      100
    )
    expect(result).toEqual(false)
  })
  it('should isSameSize(exist image, right w, wrong h)be false', async () => {
    const result = await isSameSize(
      'public/resized/a-edited-w100-h100.jpg',
      100,
      200
    )
    expect(result).toEqual(false)
  })
  it('should isSameSize(NOT exist image, wrong w, wrong h) throw', async () => {
    const result = await isSameSize('wrong.jpg', 356, 356)
    expect(result).toThrow
  })
})

describe('isImgHere() suite', () => {
  it('should isImgHere(existImg, existDir) return true', () => {
    expect(isImgHere('a', 'public/images')).toEqual(true)
  })
  it('should isImgHere(NOTexistImg, existDir) return false', () => {
    expect(isImgHere('zzzzz', 'public/images')).toEqual(false)
  })
  it('should isImgHere(existImg, NOTexistDir) return false', () => {
    expect(isImgHere('a', 'public/images/wrong')).toEqual(false)
  })
})

describe('wasServedBefore() suite', () => {
  it('should wasServedBefore(rightImgName,rightDirPath,rightwidth,rightHeight) return true', async () => {
    const result = await wasServedBefore(
      'a-edited-w100-h100',
      'public/resized',
      100,
      100
    )
    expect(result).toEqual(true)
  })
  it('should wasServedBefore(wrongImgName,rightDirPath,rightwidth,rightHeight) return false', async () => {
    const result = await wasServedBefore(
      'worngname',
      'public/resized',
      100,
      100
    )
    expect(result).toEqual(false)
  })
  it('should wasServedBefore(rightImgName,worngDirPath,rightwidth,rightHeight) throw', async () => {
    const result = await wasServedBefore(
      'a-edited-w100-h100',
      'public/resized/WRONG',
      100,
      100
    )
    expect(result).toThrow
  })
  it('should wasServedBefore(rightImgName,rightDirPath,wrongWidth,rightHeight) return false', async () => {
    const result = await wasServedBefore(
      'a-edited-w100-h100',
      'public/resized',
      326,
      100
    )
    expect(result).toEqual(false)
  })
  it('should wasServedBefore(rightImgName,rightDirPath,rightWidth,wrongHeight) return false', async () => {
    const result = await wasServedBefore(
      'a-edited-w100-h100',
      'public/resized',
      100,
      326
    )
    expect(result).toEqual(false)
  })
  it('should wasServedBefore(wrongImgName,wrongDirPath,wrongWidth,wrongHeight) return false', async () => {
    const result = await wasServedBefore(
      '20wrong',
      '20public/resized/wrong',
      326,
      326
    )
    expect(result).toEqual(false)
  })
})

describe('resize() suite', () => {
  it('makes sure image resized in happy scenario', async () => {
    const result = await resize('b', 20, 20)
    expect(result).toBe(true)
  })
  it('return false when image not exist', async () => {
    const result = await resize('wrong', 20, 20)
    expect(result).toBe(false)
  })
})
