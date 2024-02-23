import {User} from '../model/UserModel.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export const loginUser = async (req, res) => {
    const {uName,password} = req.body ;
    try {
        const user = await User.findOne({uName})
        if (!user) {
            res.status(404).json({message:"User Not Found"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ uName }, process.env.JWT_SECRET);
        res.json({ token, username: user.uName,message:"LogIn Successful" });
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export const newUser = async (req, res) => {
    try {
        const { uName,email, password } = req.body
        if (!uName && !email && !password) {
            res.status(400).json({message:"Incomplete Credentials"})
            
        }
        const user = await User.findOne({uName})
        if (user) {
            res.status(400).json({message:"User Already Exist"})
            
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ uName,email, password: hashedPassword });
        const token = jwt.sign({ uName }, process.env.JWT_SECRET);
        res.status(200).json({ token, username: newUser.uName,message:"Registration Succesful" })
        }
        
    } catch (error) {
        res.status(400).json({message:"Server Not Responding"})
    }
}