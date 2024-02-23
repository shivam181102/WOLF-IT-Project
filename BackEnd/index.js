import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import Blog from './routes/Blogs.js'
import User from './routes/User.js'

const server = express()
dotenv.config();
server.use(express.json());
server.use(cors());
main()
async function main() {
    await mongoose.connect(process.env.MONGODB_URL).then(() => console.log("database connected"));
}
server.get('/', (req, res) => {
    res.status(200).json("hello , good morning!")
})

server.use("/blog", Blog)
server.use('/user',User)



server.listen(process.env.PORT, () => {
    console.log(`server started at port ${process.env.PORT}`);
});