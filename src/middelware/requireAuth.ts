import { Request, Response, NextFunction } from 'express'

//For Protected Routes
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user

  if (!user) {
    return res.sendStatus(403)
  }

  return next()
}

export default requireAuth
