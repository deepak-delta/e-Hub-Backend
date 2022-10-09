import { Request, Response } from 'express'
import { createUserInput } from '../schema/user.schema'
import createUser from '../service/user.service'

const createUserHandler = async (
  req: Request<{}, {}, createUserInput>,
  res: Response
) => {
  const body = req.body

  const user = await createUser(body)
  console.log(user)

  return res.send(user)
}

export default createUserHandler
