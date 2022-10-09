import express from 'express'
import {
  createUserHandler,
  verifyUserHandler,
} from '../controller/user.controller'
import validator from '../middelware/validator'
import { createUserSchema, verifyUserSchema } from '../schema/user.schema'

const UserRouter = express.Router()

UserRouter.post(
  '/api/user/signup',
  validator(createUserSchema),
  createUserHandler
)

UserRouter.post(
  '/api/user/verification/:id/:verificationCode',
  validator(verifyUserSchema),
  verifyUserHandler
)
export default UserRouter
