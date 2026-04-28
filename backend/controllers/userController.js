import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/userModel.js";

const TOKEN_EXPIRES_IN = "24h";
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id.toString() },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "Register successful",
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    const status = err?.code === 11000 ? 409 : 500;
    const message = err?.code === 11000 ? "Email already registered." : err?.message || "Server error";
    res.status(status).json({ success: false, message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "Login successful",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err?.message || "Server error" });
  }
};