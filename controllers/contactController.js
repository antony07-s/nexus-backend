import sanitizeHtml from "sanitize-html";
import ContactMessage from "../models/ContactMessage.js";

const clean = (val) =>
  typeof val === "string" ? sanitizeHtml(val.trim(), { allowedTags: [], allowedAttributes: {} }) : val;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createContactMessage = async (req, res) => {
  try {
    const name = clean(req.body.name);
    const email = clean(req.body.email);
    const contactNo = clean(req.body.contactNo);
    const budget = clean(req.body.budget);
    const projectType = clean(req.body.projectType);
    const siteAddress = clean(req.body.siteAddress);
    const message = clean(req.body.message);

    if (!name || !email || !contactNo) {
      return res.status(400).json({ success: false, error: "Name, email and contact number are required." });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      contactNo,
      budget,
      projectType,
      siteAddress,
      message,
    });

    // Optional: hook nodemailer here to notify the team inbox
    // await sendNotificationEmail(newMessage);

    res.status(201).json({ success: true, data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const [messages, total] = await Promise.all([
      ContactMessage.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      ContactMessage.countDocuments(),
    ]);
    res.json({ success: true, data: messages, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
