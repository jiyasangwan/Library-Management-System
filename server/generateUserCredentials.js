import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "./models/userModel.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const generateRandomUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"
    });
    console.log("Connected to MongoDB");

    // Generate random user credentials
    const randomNames = [
      "John Smith", "Emma Johnson", "Michael Brown", "Sarah Davis", 
      "David Wilson", "Lisa Anderson", "James Taylor", "Maria Garcia",
      "Robert Martinez", "Jennifer Rodriguez", "William Lee", "Linda White",
      "Richard Thompson", "Patricia Moore", "Joseph Clark", "Barbara Lewis",
      "Thomas Walker", "Elizabeth Hall", "Christopher Allen", "Nancy Young"
    ];

    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    const email = `user${randomNumber}@library.com`;
    const password = `user${randomNumber}123`;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User with this email already exists! Generating new credentials...");
      return generateRandomUser(); // Recursive call to generate new credentials
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name: randomName,
      email: email,
      password: hashedPassword,
      role: "User",
      accountVerified: true
    });

    console.log("✅ Random User Created Successfully!");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);
    console.log("👤 Name:", randomName);
    console.log("👥 Role: User");
    console.log("\n🔐 Admin Credentials:");
    console.log("📧 Email: admin@library.com");
    console.log("🔑 Password: admin123");
    console.log("👤 Role: Admin");

    process.exit(0);
  } catch (error) {
    console.error("Error creating random user:", error);
    process.exit(1);
  }
};

generateRandomUser(); 