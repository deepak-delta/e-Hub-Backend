import express from 'express'
import {
  createUserHandler,
  forgotPasswordHandler,
  verifyUserHandler,
} from '../controller/user.controller'
import validator from '../middelware/validator'
import {
  createUserSchema,
  forgotPasswordSchema,
  verifyUserSchema,
} from '../schema/user.schema'

const UserRouter = express.Router()

UserRouter.post(
  '/api/users/signup',
  validator(createUserSchema),
  createUserHandler
)

UserRouter.post(
  '/api/users/verification/:id/:verificationCode',
  validator(verifyUserSchema),
  verifyUserHandler
)

UserRouter.post(
  '/api/users/forgotpassword',
  validator(forgotPasswordSchema),
  forgotPasswordHandler
)
export default UserRouter
