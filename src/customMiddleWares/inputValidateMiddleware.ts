import * as inputChecks from '../utilities/inputCheckUtilities'
import express, { NextFunction } from 'express'
import _ from 'lodash'

const inputValidate = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void => {
  const imgName = req.query.filename as string
  const imgWidth = req.query.width as string
  const imgHeight = req.query.height as string
  if (_.isEmpty(imgName)) {
    res.send('filename parameter is empty')
  } else if (_.isEmpty(imgWidth)) {
    res.send('width parameter is empty')
  } else if (_.isEmpty(imgHeight)) {
    res.send('height parameter is empty')
  } else if (
    inputChecks.isValidSizeNum(parseInt(imgWidth)) &&
    inputChecks.isValidSizeNum(parseInt(imgHeight)) &&
    _.isString(imgName)
  ) {
    next()
  }
}
export default inputValidate
