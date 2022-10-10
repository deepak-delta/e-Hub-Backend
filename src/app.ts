require('dotenv').config({ path: __dirname + '/.env' })

import express from 'express'
import 'reflect-metadata'

import router from './routes'
import mongoDS from './data-source'
import { boolean } from 'zod'

const app = express()
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listining on ${PORT}`)
})

const environment = process.env.PROD === 'true' ? 'Prod' : 'Dev'
mongoDS
  .initialize()
  .then(() => {
    console.log(` ${environment} Database Connection sucessful`)
  })
  .catch((error) => console.log(error))
