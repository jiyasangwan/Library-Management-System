import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const testCompleteSystem = async () => {
  try {
    console.log("🧪 Testing complete system...");
    
    // Test 1: Environment variables
    console.log("📋 Checking environment variables...");
    const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET_KEY', 'JWT_EXPIRE'];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.log(`❌ Missing environment variable: ${envVar}`);
        return;
      }
    }
    console.log("✅ Environment variables are set");

    // Test 2: Database connection
    console.log("🗄️ Testing database connection...");
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"
    });
    console.log("✅ Database connected successfully");

    // Test 3: bcrypt functionality
    console.log("🔐 Testing bcrypt...");
    const testPassword = "testpassword123";
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    if (isMatch) {
      console.log("✅ bcrypt is working correctly");
    } else {
      console.log("❌ bcrypt is not working");
      return;
    }

    // Test 4: User model operations
    console.log("👤 Testing User model...");
    const testUserData = {
      name: "Test User",
      email: "testuser@example.com",
      password: hashedPassword,
      role: "User",
      accountVerified: true
    };

    const testUser = new User(testUserData);
    const validationError = testUser.validateSync();
    if (validationError) {
      console.log("❌ User model validation failed:", validationError.message);
      return;
    }
    console.log("✅ User model validation passed");

    // Test 5: Admin creation specifically
    console.log("👑 Testing admin creation...");
    const adminUserData = {
      name: "Test Admin",
      email: "testadmin@example.com",
      password: hashedPassword,
      role: "Admin",
      accountVerified: true,
      avatar: {
        public_id: null,
        url: null
      }
    };

    const testAdmin = new User(adminUserData);
    const adminValidationError = testAdmin.validateSync();
    if (adminValidationError) {
      console.log("❌ Admin model validation failed:", adminValidationError.message);
      return;
    }
    console.log("✅ Admin model validation passed");

    // Test 6: Database operations
    console.log("💾 Testing database operations...");
    const userCount = await User.countDocuments();
    console.log(`📈 Current users in database: ${userCount}`);

    // Test 7: Check if admin exists
    const existingAdmin = await User.findOne({ role: "Admin" });
    if (existingAdmin) {
      console.log("✅ Admin user exists:", existingAdmin.email);
    } else {
      console.log("⚠️ No admin user found - you may need to create one");
    }

    console.log("🎉 Complete system test passed!");
    console.log("\n📝 Summary:");
    console.log("- Environment variables: ✅");
    console.log("- Database connection: ✅");
    console.log("- bcrypt functionality: ✅");
    console.log("- User model: ✅");
    console.log("- Admin model: ✅");
    console.log("- Database operations: ✅");

    process.exit(0);
  } catch (error) {
    console.error("❌ System test failed:", error);
    process.exit(1);
  }
};

testCompleteSystem(); 