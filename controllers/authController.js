import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Username and password required." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in the environment.");
      return res.status(503).json({ success: false, error: "Auth is not configured." });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, error: "Invalid credentials." });
    }

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) {
      return res.status(401).json({ success: false, error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { sub: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, data: { token, username: admin.username } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Login failed." });
  }
};