import mongoose from "mongoose";
import { User } from "./models/userModel.js";

mongoose.connect("mongodb://localhost:27017/MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"); // Replace with your DB name

async function checkAdmin() {
  const admin = await User.findOne({ email: "admin@library.com" });
  console.log(admin);
  process.exit();
}

checkAdmin();