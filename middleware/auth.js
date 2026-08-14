export const requireAdmin = (req, res, next) => {
  const token = req.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!process.env.ADMIN_API_KEY) {
    return res.status(503).json({ success: false, error: "Admin API is not configured." });
  }
  if (token !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  next();
};
