import jwt from 'jsonwebtoken'
import { jwtKeys } from '../config'

const signJwt = (
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) => {
  const keyType =
    keyName === 'accessTokenPrivateKey'
      ? jwtKeys.accessTokenPrivateKey
      : jwtKeys.refreshTokenPrivateKey
  const signingKey = Buffer.from(keyType, 'base64').toString('ascii')

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  const keyType =
    keyName === 'accessTokenPublicKey'
      ? jwtKeys.accessTokenPublicKey
      : jwtKeys.refreshTokenPublicKey
  const publicKey = Buffer.from(keyType, 'base64').toString('ascii')

  try {
    const decoded = jwt.verify(token, publicKey) as T
    return decoded
  } catch (error) {
    return null
  }
}

export default { signJwt, verifyJwt }
