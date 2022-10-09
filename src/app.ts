require('dotenv').config()
import express from 'express'
import config from 'config'
import 'reflect-metadata'

import router from './routes'
import sqlDS from './data-source'

const app = express()
app.use(express.json())
app.use(router)

const port = config.get('PORT')

app.listen(port, () => {
  console.log(`Server listining on ${port}`)
})

sqlDS
  .initialize()
  .then(() => {
    console.log(`Database Connection sucessful`)
  })
  .catch((error) => console.log(error))
