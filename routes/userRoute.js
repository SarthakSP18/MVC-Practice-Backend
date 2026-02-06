import express from "express";
import { registerUser,getusers,updateUsers,deleteUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/register",registerUser);
router.get("/getusers",getusers);
router.put("/updateusers/:id",updateUsers);
router.delete("/deleteusers/:id",deleteUsers);

export default router;