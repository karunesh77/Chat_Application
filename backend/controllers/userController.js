import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import { cloudinary } from "../lib/cloudinary.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password,pic } = req.body;
//    console.log("this is req body ", req.body);
//    console.log("this is req file ", req.file);

    

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // console.log("this is p rofile pci  ", pic);

   
     // upload on multer
   if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "chat_app",
    });
    var picUrl = result.secure_url;
   }
//    console.log("this is profile pic url ", picUrl);

    // create new user
    const user = await User.create({ name, email, password, pic: picUrl });

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // send token as a cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      message: "User registered successfully",
      succes: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allUser = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword)
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { registerUser, loginUser,allUser };
