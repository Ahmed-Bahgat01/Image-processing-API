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
    res.send('filename parameter is missing please enter a filename')
  } else if (_.isEmpty(imgWidth)) {
    res.send('width parameter is missing please enter a width')
  } else if (_.isEmpty(imgHeight)) {
    res.send('height parameter is missing please enter a height')
  } else if (Number.isNaN(Number(imgWidth))) {
    res.send('width should be a number')
  } else if (Number.isNaN(Number(imgHeight))) {
    res.send('height should be a number')
  } else if (!inputChecks.isValidSizeNum(parseInt(imgWidth))) {
    res.send('width should be between 0 and 10000')
  } else if (!inputChecks.isValidSizeNum(parseInt(imgHeight))) {
    res.send('height should be between 0 and 10000')
  } else {
    next()
  }
}
export default inputValidate
