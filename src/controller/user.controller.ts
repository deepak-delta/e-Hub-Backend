import { Request, Response } from 'express'
import { createUserInput, verifyUserInput } from '../schema/user.schema'
import { createUser, findUserById, updateUser } from '../service/user.service'
import sendEmail from '../utils/mailer'
import argon2 from 'argon2'

const createUserHandler = async (
  req: Request<{}, {}, createUserInput>,
  res: Response
) => {
  const body = req.body

  // OTP Generation
  const verificationCode = Math.floor(
    Math.random() * (987654 - 123456) + 123456
  )

  //Password Hashing
  try {
    const hash = await argon2.hash(body.password)
    body.password = hash
  } catch (err) {
    console.log(err)
  }

  const requestBody = { ...body, verificationCode }

  console.log(requestBody)

  try {
    const user = await createUser(requestBody)
    await sendEmail({
      from: 'test@testing.com',
      to: user.email,
      subject: 'Verification',
      text: `code: ${user.verificationCode}`,
    })
    return res.send(user)
  } catch (error) {}
}

const verifyUserHandler = async (
  req: Request<verifyUserInput>,
  res: Response
) => {
  const id = req.params.id
  const verificationCode = req.params.verificationCode

  const user = await findUserById(id)

  if (!user) {
    return res.send("Can't find user")
  }

  if (user.verified) {
    return res.send('User already verified')
  }

  if (user.verificationCode === verificationCode) {
    user.verified = true
    await updateUser(user)

    return res.send('User verified')
  }

  return res.send('Error verifying user')
}

const forgotPasswordHandler = () => {}
export { createUserHandler, verifyUserHandler }
