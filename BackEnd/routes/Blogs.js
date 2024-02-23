import express from "express";
import jwt from "jsonwebtoken"

const router = express.Router();
import { newblog, allBlogs,myBlogs,deleteBlog } from "../controller/blogControl.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401).json({message:"No token Found"}); // No token provided
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token is invalid
    }
    req.user = user; // Attach user information to request object
    next(); // Proceed to next middleware
  });
};
router
    .post('/newblog',authenticateToken,newblog)
    .get('/allblog',authenticateToken, allBlogs)
    .get('/Myblog',authenticateToken, myBlogs)
    .delete('/delBlog',authenticateToken,deleteBlog)
export default router;
