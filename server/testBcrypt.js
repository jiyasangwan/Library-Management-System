import bcrypt from "bcrypt";

const testBcrypt = async () => {
  try {
    console.log("🔐 Testing bcrypt functionality...");
    
    const testPassword = "testpassword123";
    console.log("📝 Test password:", testPassword);
    
    // Test hashing
    console.log("🔒 Testing password hashing...");
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    console.log("✅ Password hashed successfully");
    console.log("🔑 Hashed password:", hashedPassword);
    
    // Test comparison
    console.log("🔍 Testing password comparison...");
    const isMatch = await bcrypt.compare(testPassword, hashedPassword);
    console.log("✅ Password comparison result:", isMatch);
    
    if (isMatch) {
      console.log("🎉 bcrypt is working correctly!");
    } else {
      console.log("❌ bcrypt comparison failed!");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ bcrypt test failed:", error);
    process.exit(1);
  }
};

testBcrypt(); 