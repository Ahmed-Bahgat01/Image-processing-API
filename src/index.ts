import express from 'express'
import inputValidate from './customMiddleWares/inputValidateMiddleware'
import morgan from 'morgan'
import { accessLogsStream } from './customMiddleWares/morganStream'
import router from './routes/routes'

const app = express()

//using express static middleware to serve images requested
app.use('/', express.static('public'))

app.use(inputValidate)
app.use(morgan('combined', { stream: accessLogsStream }))
app.use('/', router)

export default app
