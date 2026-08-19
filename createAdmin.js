import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();

const [, , username, password] = process.argv;

if (!username || !password) {
  console.error("Usage: node createAdmin.js <username> <password>");
  process.exit(1);
}

async function run() {
  await connectDB();
  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.deleteMany({ username });
  await Admin.create({ username, passwordHash });
  console.log(`Admin user "${username}" created.`);
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});