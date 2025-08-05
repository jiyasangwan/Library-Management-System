import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const testDatabase = async () => {
  try {
    console.log("🧪 Testing database connection...");
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"
    });
    console.log("✅ Database connected successfully");

    // Test basic operations
    console.log("📊 Testing User model...");
    
    // Count users
    const userCount = await User.countDocuments();
    console.log(`📈 Total users in database: ${userCount}`);

    // Test creating a user (without saving)
    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      role: "User",
      accountVerified: true
    });

    // Validate the user
    const validationError = testUser.validateSync();
    if (validationError) {
      console.log("❌ User model validation error:", validationError.message);
    } else {
      console.log("✅ User model validation passed");
    }

    // Test admin creation specifically
    const testAdmin = new User({
      name: "Test Admin",
      email: "testadmin@example.com",
      password: "hashedpassword",
      role: "Admin",
      accountVerified: true,
      avatar: {
        public_id: null,
        url: null
      }
    });

    const adminValidationError = testAdmin.validateSync();
    if (adminValidationError) {
      console.log("❌ Admin model validation error:", adminValidationError.message);
    } else {
      console.log("✅ Admin model validation passed");
    }

    console.log("🎉 Database test completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database test failed:", error);
    process.exit(1);
  }
};

testDatabase(); 