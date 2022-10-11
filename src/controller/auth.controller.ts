import { Request, Response } from 'express'
import { createLoginInput } from '../schema/auth.schema'
import {
  signAccessToken,
  signRefreshToken,
  findSesssionByUserId,
  findSesssionBySessionId,
} from '../service/auth.service'
import { findByEmail, findUserById } from '../service/user.service'
import argon2 from 'argon2'
import { get } from 'lodash'
import { verifyJwt } from '../utils/jwt'

const createLoginHandler = async (
  req: Request<{}, {}, createLoginInput>,
  res: Response
) => {
  const { email, password } = req.body

  const user = await findByEmail(email)

  if (!user) {
    return res.send('Invalid email or password')
  }

  if (!user.verified) {
    return res.send('Please verify your email')
  }

  const sessionValidity: object | null = await findSesssionByUserId(user.id)

  if (sessionValidity) {
    return res.send('User already logged in')
  } else {
    try {
      if (await argon2.verify(user.password, password)) {
        //sign access toekn
        const accessToken = signAccessToken(user)
        //sign refesh token
        const refreshToken = await signRefreshToken(user.id)

        //send token
        return res.send({
          accessToken,
          refreshToken,
        })
      } else {
        return res.send('Incorrect Passowrd')
      }
    } catch (error) {}
  }
}

const refreshAccessTokenHandler = async (req: Request, res: Response) => {
  const refreshToken = get(req, 'headers.x-refresh')

  const decoded: any = verifyJwt(refreshToken, 'refreshTokenPublicKey')

  if (!decoded) {
    return res.status(401).send('Could no refresh access token')
  }

  const session: any = await findSesssionBySessionId(decoded.object.session)

  if (!session || !session.valid) {
    return res.status(401).send('Could no refresh access token')
  }

  const user = await findUserById(session.userId)

  if (!user) {
    return res.status(401).send('Could no refresh access token')
  }

  const accessToken = signAccessToken(user)

  return res.send({ accessToken })
}

export { createLoginHandler, refreshAccessTokenHandler }
