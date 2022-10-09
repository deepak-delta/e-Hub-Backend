import express from 'express'
import createUserHandler from '../controller/user.controller'
import validator from '../middelware/validator'
import { createUserSchema } from '../schema/user.schema'

const UserRouter = express.Router()

UserRouter.post(
  '/api/user/signup',
  validator(createUserSchema),
  createUserHandler
)
export default UserRouter
