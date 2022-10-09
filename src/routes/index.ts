import express from 'express'
import UserRouter from './user.route'
import AuthRouter from './auth.route'

const router = express.Router()

router.get('/test', (_, res) => res.sendStatus(200))

router.use(UserRouter)
router.use(AuthRouter)

export default router
