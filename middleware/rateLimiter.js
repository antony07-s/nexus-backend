import rateLimit from "express-rate-limit";

// General API limiter — generous, just stops abuse
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please try again shortly." },
});

// Contact form limiter — stricter, prevents spam submissions
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many messages sent. Please try again in an hour." },
});