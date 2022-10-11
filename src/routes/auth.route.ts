import express from 'express'
import {
  refreshAccessTokenHandler,
  createLoginHandler,
} from '../controller/auth.controller'
import validator from '../middelware/validator'
import { createLoginSchema } from '../schema/auth.schema'

const AuthRouter = express.Router()

AuthRouter.post('/api/login', validator(createLoginSchema), createLoginHandler)
AuthRouter.post('/api/sessions/refresh', refreshAccessTokenHandler)

export default AuthRouter
