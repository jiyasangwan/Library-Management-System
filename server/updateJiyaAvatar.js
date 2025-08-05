import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const updateJiyaAvatar = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find Jiya Sangwan user by email
    const jiyaUser = await User.findOne({ 
      email: "jiyasangwan70@gmail.com" 
    });

    if (!jiyaUser) {
      console.log("❌ User with email 'jiyasangwan70@gmail.com' not found in database");
      console.log("Available users:");
      const allUsers = await User.find({}, { name: 1, email: 1, role: 1 });
      allUsers.forEach(user => {
        console.log(`- ${user.name} (${user.email}) - ${user.role}`);
      });
      return;
    }

    // Update the avatar
    jiyaUser.avatar = {
      public_id: null,
      url: "/uploads/avatars/jiya-sangwan-avatar.jpg"
    };

    await jiyaUser.save();
    console.log("✅ Avatar updated successfully for Jiya Sangwan");
    console.log("📧 Email:", jiyaUser.email);
    console.log("👤 Name:", jiyaUser.name);
    console.log("👥 Role:", jiyaUser.role);
    console.log("🖼️ Avatar URL:", jiyaUser.avatar.url);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating avatar:", error);
    process.exit(1);
  }
};

updateJiyaAvatar(); 