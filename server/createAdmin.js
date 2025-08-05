import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"
    });
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@library.com" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@library.com",
      password: hashedPassword,
      role: "Admin",
      accountVerified: true
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@library.com");
    console.log("Password: admin123");
    console.log("Role: Admin");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser(); 