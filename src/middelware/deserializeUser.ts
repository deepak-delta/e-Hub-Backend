import { Request, Response, NextFunction } from 'express'
import { object } from 'zod'
import { verifyJwt } from '../utils/jwt'
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '')

  if (!accessToken) {
    return next()
  }

  const decoded: any = verifyJwt(accessToken, 'accessTokenPublicKey')

  if (decoded) {
    const decodedData = {
      ...JSON.parse(decoded.object),
      iat: decoded.iat,
      exp: decoded.exp,
    }
    res.locals.user = decodedData
  }

  return next()
}

export default deserializeUser
