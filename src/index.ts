import express from 'express'
import path from 'path'
import * as resizeUtl from './utilities/resizeUtilities'
import inputValidate from './customMiddleWares/inputValidateMiddleware'
import morgan from 'morgan'
import { accessLogsStream } from './customMiddleWares/morganStream'

const app = express()

const fullImgsDirPath = 'public/images'
const resizedDirPath = 'public/resized'

//using express static middleware to serve images requested
app.use('/', express.static('public'))

app.use(inputValidate)
app.use(morgan('combined', { stream: accessLogsStream }))

app.get('/resized', async (req: express.Request, res: express.Response) => {
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
      // eslint-disable-next-line no-empty
    } catch (error) {}
    res.sendFile(path.resolve(`${resizedDirPath}/${servedImgName}.jpg`))
  } else {
    res.send('Image not found')
  }
})

export default app
