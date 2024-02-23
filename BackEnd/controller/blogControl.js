import { Blog } from "../model/BlogModel.js";

export const newblog = async (req, res) => {
  try {
    const { uName,title, desc } = req.body;
    if (!uName || !title || !desc) {
        return res.status(400).json({ message: 'Missing required fields'});
      }
    const data = await Blog.create({ uName, title, desc });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const allBlogs = async (req, res) => {
  try {
    const templates = await Blog.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const myBlogs = async (req, res) => {
  const { user } = req;
  const uName = user.uName;
//   console.log(uName)
  try {
    const templates = await Blog.find({ uName });
    res.status(200).json(templates);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { _id } = req.body;
    const { user } = req;

    const blog = await Blog.findById(_id);
console.log(user)
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.uName !== user.uName) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    } else {
     const deletedBlog = await Blog.findByIdAndDelete(_id);
      res
        .status(200)
        .json({ message: "Blog deleted successfully", deletedBlog });
    }
  } catch (error) {
    // Handle any errors
    res.status(400).json({ error: error.message });
  }
};
