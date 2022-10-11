import express from 'express'
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from '../controller/user.controller'
import requireAuth from '../middelware/requireAuth'
import validator from '../middelware/validator'
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
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

UserRouter.post(
  '/api/users/resetpassword/:id/:passwordResetCode',
  validator(resetPasswordSchema),
  resetPasswordHandler
)

UserRouter.get('/api/users/currentuser', requireAuth, getCurrentUserHandler)
export default UserRouter
