import User from "../models/userModels";
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    try {
       const {name,email,password,pic} = req.body;

       // check if user exists
       const userExists = await User.findOne({email});
       if(userExists){
        return res.status(400).json({message:"User already exists"});
       }

       // create new user
       const user = await User.create({name,email,password,pic});

       // generate token
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        // send token as a cookie
        res.cookie("token",token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            user,
            token
        });


      
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export {registerUser,loginUser}