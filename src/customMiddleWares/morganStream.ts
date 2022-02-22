import path from 'path'
import fs from 'fs'

//logging access into file /logs/access.log
export const accessLogsStream = fs.createWriteStream(
  path.join(path.resolve('logs'), 'access.log'),
  { flags: 'a' }
)
