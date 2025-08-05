import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const testAdminAuth = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"
    });
    console.log("✅ Connected to MongoDB");

    // Check for existing admin users
    const adminUsers = await User.find({ role: "Admin" });
    console.log(`📊 Found ${adminUsers.length} admin users:`);
    
    adminUsers.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.name} (${admin.email}) - Verified: ${admin.accountVerified}`);
    });

    if (adminUsers.length === 0) {
      console.log("⚠️ No admin users found. Creating a default admin...");
      
      const hashedPassword = await bcrypt.hash("admin123", 10);
      
      const defaultAdmin = await User.create({
        name: "Default Admin",
        email: "admin@library.com",
        password: hashedPassword,
        role: "Admin",
        accountVerified: true,
        avatar: {
          public_id: null,
          url: null
        }
      });

      console.log("✅ Default admin created:");
      console.log(`   Email: ${defaultAdmin.email}`);
      console.log(`   Password: admin123`);
      console.log(`   Role: ${defaultAdmin.role}`);
    }

    console.log("\n🔧 To test admin creation, you need to:");
    console.log("1. Login with an admin account");
    console.log("2. Use the admin credentials to create new admins");
    console.log("3. Make sure you're logged in before trying to create admins");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error testing admin auth:", error);
    process.exit(1);
  }
};

testAdminAuth(); 