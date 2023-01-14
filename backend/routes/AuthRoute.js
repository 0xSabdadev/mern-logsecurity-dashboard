import express from 'express'
import {Login, Logout, validateUser} from '../controllers/Auth'

const router = express.Router()

router.get('/me', validateUser)
router.post('/login', Login)
router.delete('/logout', Logout)

export default router
