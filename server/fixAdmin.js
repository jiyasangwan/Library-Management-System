import mongoose from "mongoose";
import { User } from "./models/userModel.js";

mongoose.connect("mongodb://localhost:27017/MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"); // Replace with your DB name

async function fixAdmin() {
  await User.updateOne(
    { email: "admin@library.com" },
    { $set: { accountVerified: true, role: "Admin" } }
  );
  console.log("Admin user updated!");
  process.exit();
}

fixAdmin();