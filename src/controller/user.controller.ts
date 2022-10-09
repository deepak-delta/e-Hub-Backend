import { Request, Response } from 'express'
import { createUserInput } from '../schema/user.schema'
import createUser from '../service/user.service'
import sendEmail from '../utils/mailer'

const createUserHandler = async (
  req: Request<{}, {}, createUserInput>,
  res: Response
) => {
  const body = req.body

  try {
    const user = await createUser(body)
    await sendEmail({
      from: 'test@testing.com',
      to: user.email,
      subject: 'Verification',
      text: `code: ${user.verificationCode}`,
    })
    return res.send(user)
  } catch (error) {}
}

export default createUserHandler
