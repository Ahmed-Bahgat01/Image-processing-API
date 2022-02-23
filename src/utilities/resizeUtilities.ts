import fs from 'fs'
import sharp from 'sharp'

//search for image in directory
export function isImgHere(imgName: string, dirPath: string): boolean {
  imgName = `${imgName}.jpg`
  try {
    const imgs = fs.readdirSync(dirPath)
    for (let i = 0; i < imgs.length; i++) {
      if (imgName == imgs[i]) {
        return true
      }
    }
    return false
  } catch (error) {
    return false
  }
}

//check if image found has same size requested
export async function isSameSize(
  imgPath: string,
  imgWidth: number,
  imgHeight: number
): Promise<unknown> {
  try {
    const metaData = await sharp(imgPath).metadata()
    if (imgWidth == metaData.width && imgHeight == metaData.height) {
      return true
    } else {
      return false
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

//was image served before
export async function wasServedBefore(
  imgName: string,
  dirPath = 'public/resized',
  imgWidth: number,
  imgHeight: number
): Promise<unknown> {
  const imgPath = `${dirPath}/${imgName}.jpg`
  const isSameSizeResult = await isSameSize(imgPath, imgWidth, imgHeight)
  if (isImgHere(imgName, dirPath) && isSameSizeResult) {
    return true
  } else {
    return false
  }
}

export async function resize(
  imgName: string,
  imgWidth: number,
  imgHeight: number
): Promise<boolean> {
  let isResised = false
  try {
    await sharp(`public/images/${imgName}.jpg`)
      .resize(imgWidth, imgHeight)
      .toFile(`public/resized/${imgName}-edited-w${imgWidth}-h${imgHeight}.jpg`)
    isResised = true
  } catch (error) {
    isResised = false
  }
  return isResised
}
