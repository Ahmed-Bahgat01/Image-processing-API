import express from 'express'
import * as resizeUtl from '../utilities/resizeUtilities'
import path from 'path'

const resizedDirPath = 'public/resized'
const fullImgsDirPath = 'public/images'

const router = express.Router()
router.get('/resized', async (req: express.Request, res: express.Response) => {
  const imgName = req.query.filename as string
  const imgWidth = parseInt(req.query.width as string)
  const imgHeight = parseInt(req.query.height as string)
  const servedImgName = `${imgName}-edited-w${imgWidth}-h${imgHeight}`
  //CHECK USER INPUTS and send response
  const wasServedBeforeResult = await resizeUtl.wasServedBefore(
    servedImgName,
    resizedDirPath,
    imgHeight,
    imgWidth
  )
  if (wasServedBeforeResult) {
    res.sendFile(path.resolve(`${resizedDirPath}/${servedImgName}.jpg`))
  } else if (resizeUtl.isImgHere(imgName, fullImgsDirPath)) {
    try {
      await resizeUtl.resize(imgName, imgWidth, imgHeight)
    } catch (error) {
      res.send('something want wrong while resizing the image')
    }
    res.sendFile(path.resolve(`${resizedDirPath}/${servedImgName}.jpg`))
  } else {
    res.send('Image not found')
  }
})

export default router
