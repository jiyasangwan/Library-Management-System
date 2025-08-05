import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const createJiyaAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if Jiya Sangwan already exists
    const existingUser = await User.findOne({ 
      email: "jiyasangwan70@gmail.com" 
    });

    if (existingUser) {
      console.log("⚠️ User already exists, updating avatar...");
      existingUser.avatar = {
        public_id: null,
        url: "/uploads/avatars/jiya-sangwan-avatar.jpg"
      };
      await existingUser.save();
      console.log("✅ Avatar updated for existing user");
      console.log("📧 Email:", existingUser.email);
      console.log("👤 Name:", existingUser.name);
      console.log("👥 Role:", existingUser.role);
    } else {
      // Create new admin user for Jiya Sangwan
      const hashedPassword = await bcrypt.hash("jiya123", 10);
      
      const jiyaUser = await User.create({
        name: "Jiya Sangwan",
        email: "jiyasangwan70@gmail.com",
        password: hashedPassword,
        role: "Admin",
        accountVerified: true,
        avatar: {
          public_id: null,
          url: "/uploads/avatars/jiya-sangwan-avatar.jpg"
        }
      });

      console.log("✅ Jiya Sangwan admin created successfully!");
      console.log("📧 Email: jiyasangwan70@gmail.com");
      console.log("🔑 Password: jiya123");
      console.log("👤 Name: Jiya Sangwan");
      console.log("👥 Role: Admin");
      console.log("🖼️ Avatar URL: /uploads/avatars/jiya-sangwan-avatar.jpg");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating Jiya Sangwan admin:", error);
    process.exit(1);
  }
};

createJiyaAdmin(); 