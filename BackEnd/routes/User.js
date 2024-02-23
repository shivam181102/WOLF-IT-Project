import express from "express"
const router = express.Router()
import{newUser,loginUser} from '../controller/userControl.js'
router
    .post('/register',newUser)
    .post('/login',loginUser)
    
    
export default router