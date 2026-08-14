import express from "express";
import { makeCrudController } from "../controllers/genericController.js";
import { createContactMessage, getContactMessages } from "../controllers/contactController.js";
import { contactLimiter } from "../middleware/rateLimiter.js";
import { requireAdmin } from "../middleware/auth.js";

import Service from "../models/Service.js";
import Project from "../models/Project.js";
import Award from "../models/Award.js";
import BlogPost from "../models/BlogPost.js";

const router = express.Router();

// --- Services (Interior / Architecture / Consulting / IT) ---
const serviceCtrl = makeCrudController(Service);
router.get("/services", serviceCtrl.getAll);
router.get("/services/:slug", serviceCtrl.getOne);
router.post("/services", requireAdmin, serviceCtrl.create);
router.put("/services/:id", requireAdmin, serviceCtrl.update);
router.delete("/services/:id", requireAdmin, serviceCtrl.remove);

// --- Projects ---
const projectCtrl = makeCrudController(Project);
router.get("/projects", projectCtrl.getAll);
router.get("/projects/:slug", projectCtrl.getOne);
router.post("/projects", requireAdmin, projectCtrl.create);
router.put("/projects/:id", requireAdmin, projectCtrl.update);
router.delete("/projects/:id", requireAdmin, projectCtrl.remove);

// --- Awards ---
const awardCtrl = makeCrudController(Award);
router.get("/awards", awardCtrl.getAll);
router.post("/awards", requireAdmin, awardCtrl.create);
router.put("/awards/:id", requireAdmin, awardCtrl.update);
router.delete("/awards/:id", requireAdmin, awardCtrl.remove);

// --- Blog ---
const blogCtrl = makeCrudController(BlogPost);
router.get("/blog", blogCtrl.getAll);
router.get("/blog/:slug", blogCtrl.getOne);
router.post("/blog", requireAdmin, blogCtrl.create);
router.put("/blog/:id", requireAdmin, blogCtrl.update);
router.delete("/blog/:id", requireAdmin, blogCtrl.remove);

// --- Contact form ---
router.post("/contact", contactLimiter, createContactMessage);
router.get("/contact", requireAdmin, getContactMessages);

export default router;
