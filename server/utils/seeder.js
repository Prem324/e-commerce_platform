const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Product = require("../models/Product");
const User = require("../models/User");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // 1. Delete all existing products (as requested)
    console.log("Removing all products...");
    await Product.deleteMany({});
    console.log("All products removed successfully.");

    // 2. Ensure Admin user exists (don't delete users, just ensure admin is there for manual entry)
    let adminUser = await User.findOne({ username: process.env.ADMIN_USERNAME || "admin" });
    
    if (!adminUser) {
      console.log("Creating admin user...");
      adminUser = await User.create({
        name: process.env.ADMIN_NAME || "Admin User",
        email: "admin@example.com",
        username: process.env.ADMIN_USERNAME || "admin",
        password: process.env.ADMIN_PASSWORD || "admin@123",
        role: "admin",
      });
      console.log("Admin user created.");
    } else {
      console.log("Admin user already exists.");
    }

    console.log("Database is now clean and ready for manual entry.");
    process.exit();
  } catch (error) {
    console.error("Error during database cleanup:", error);
    process.exit(1);
  }
};

seedData();
