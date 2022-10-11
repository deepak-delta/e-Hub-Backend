import mongoDS from '../data-source'
import { Session } from '../entity/auth.entity'
import { User } from '../entity/user.entity'
import { signJwt } from '../utils/jwt'
import { omit } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

const sessionRepository = mongoDS.getRepository(Session)

const findSesssionByUserId = async (userId: string) => {
  const sessionDeatils = await sessionRepository.findOneBy({
    userId: userId,
  })

  return sessionDeatils
}
const findSesssionBySessionId = async (sessionId: string) => {
  const sessionDeatils = await sessionRepository.findOneBy({
    sessionId: sessionId,
  })

  return sessionDeatils
}

const removePrivateFiled = (user: User) => {
  const privateFields = [
    '_id',
    'password',
    'confirmPassword',
    'verificationCode',
    'verified',
    'passwordResetCode',
  ]
  return omit(user, privateFields)
}

const signAccessToken = (user: User) => {
  const payload = JSON.stringify(removePrivateFiled(user))

  const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: '15m',
  })

  return accessToken
}

const createSession = async (userSessionData: {
  sessionId: string
  userId: string
  valid: boolean
}) => {
  await sessionRepository.save(userSessionData)
  console.log('User Session has been created')

  return userSessionData
}

const signRefreshToken = async (userId: string) => {
  const userSessionData = {
    sessionId: uuidv4().substring(0, 18),
    userId: userId,
    valid: true,
  }
  const session = await createSession(userSessionData)

  const refreshToken = signJwt(
    {
      session: session.sessionId,
    },
    'refreshTokenPrivateKey',
    { expiresIn: '5days' }
  )

  return refreshToken
}

export {
  signAccessToken,
  signRefreshToken,
  findSesssionByUserId,
  findSesssionBySessionId,
}
