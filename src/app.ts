require('dotenv').config({ path: __dirname + '/.env' })

import express from 'express'
import 'reflect-metadata'

import router from './routes'
import sqlDS from './data-source'

const app = express()
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listining on ${PORT}`)
})

sqlDS
  .initialize()
  .then(() => {
    console.log(`Database Connection sucessful`)
  })
  .catch((error) => console.log(error))
