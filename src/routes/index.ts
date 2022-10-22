import express from 'express'
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import requireAuth from '../middelware/requireAuth'

const router = express.Router()

router.get('/', requireAuth, (_, res) => res.sendStatus(200))

router.use(UserRouter)
router.use(AuthRouter)

export default router
