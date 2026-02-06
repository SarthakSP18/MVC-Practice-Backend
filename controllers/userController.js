import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, userName, password } = req.body;
    if (!fullname || !email || !userName || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const existinguserName = await userModel.findOne({ userName });
    if (existinguserName)
      return res.status(409).json({ message: "UserName already exists" });
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "email already exists" });
    const checkpass = await bcrypt.hash(password,10)

    const reg = await userModel.create({ fullname, email,userName,password:checkpass });
    res.status(201).json({ message: "Registered !!!", user: reg });
  } catch (error) {
    res.status(400).json({ message: "register failed !!!" ,error:error.message});
  }
};

export const getusers = async (req, res) => {
  {
    try {
      const getUser = await userModel.find();
      res.json(getUser);
    } catch (error) {
      res.json({ message: "failed to get users" }, error);
    }
  }
};

export const updateUsers = async (req,res) => {
  try {
    const updateUser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true}) ;
    res.status(204).json({message:"User data updated !",updateUser});
  } catch (error) {
    res.status(400).json({message:"Update failed",error})
  }
}

export const deleteUsers = async (req,res) => {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.params.id) ;
    res.status(204).json({message:"User deleted !",deleteUser});
  } catch (error) {
    res.status(400).json({message:"delete user failed",error})
  }
}

