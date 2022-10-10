import { Request, Response } from 'express'
import {
  createUserInput,
  forgotPasswordInput,
  verifyUserInput,
} from '../schema/user.schema'
import {
  createUser,
  findUserById,
  fingByEmail,
  updateUser,
} from '../service/user.service'
import sendEmail from '../utils/mailer'
import argon2 from 'argon2'
import { v4 as uuidv4 } from 'uuid'

const callSendEmail = async (
  userEmail: string,
  userCode: string,
  subject: string
) => {
  try {
    await sendEmail({
      from: 'test@testing.com',
      to: userEmail,
      subject: subject,
      text: `code: ${userCode}`,
    })
  } catch (error) {}
}

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

  const requestBody = {
    ...body,
    id: uuidv4().substring(0, 13),
    verificationCode: verificationCode.toString(),
    verified: false,
    passwordResetCode: '',
  }

  try {
    // const user = await fingByEmail(body.email)
    // if (!user) {
    //   const user = await createUser(requestBody)
    //   callSendEmail(user.email, user.verificationCode, 'Verifiaction Code')
    //   return res.send(user)
    // } else {
    //   return res.send('User already exist')
    // }
    const user = await createUser(requestBody)
    callSendEmail(user.email, user.verificationCode, 'Verifiaction Code')
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

const forgotPasswordHandler = async (
  req: Request<{}, {}, forgotPasswordInput>,
  res: Response
) => {
  const { email } = req.body

  const user = await fingByEmail(email)

  if (!user) {
    console.log('User does not exist')
  }

  if (!user?.verified) {
    return res.send('User is not verified')
  }

  const passwordResetCode = uuidv4()
  user.passwordResetCode = passwordResetCode

  await updateUser(user)
  callSendEmail(user.email, user.passwordResetCode, 'Verifiaction Code')
  return res.send('Password resest link will be sent if user exist')
}

export { createUserHandler, verifyUserHandler, forgotPasswordHandler }
