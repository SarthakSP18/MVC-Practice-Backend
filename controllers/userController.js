import express from "express";
import userModel from "../models/user.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, userName } = req.body;
    if (!fullname || !email || !userName) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const existinguserName = await userModel.findOne({ userName });
    if (existinguserName)
      return res.status(409).json({ message: "UserName already exists" });
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "email already exists" });

    const reg = await userModel.create({ fullname, email,userName });
    res.status(201).json({ message: "Registered !!!", user: reg });
  } catch (error) {
    res.status(400).json({ message: "register failed !!!" }, error);
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
