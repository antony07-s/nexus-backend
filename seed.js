// Populates MongoDB Atlas with realistic placeholder content so the site
// looks production-ready immediately. Replace with real content later via
// the same API endpoints, or by editing this file and re-running it.
//
// Usage: node seed.js

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import Service from "./models/Service.js";
import Project from "./models/Project.js";
import Award from "./models/Award.js";
import BlogPost from "./models/BlogPost.js";

dotenv.config();

const services = [
  {
    title: "Interior",
    slug: "interior",
    order: 1,
    category: "design-build",
    shortDescription: "Residential and commercial interiors, tailored to how the space will actually be used.",
    fullDescription:
      "From space planning to final styling, we handle the full interior journey — concept, materials, furniture, and lighting design, built around how you'll actually live or work in the space.",
    offerings: ["Interior Design", "Renovation", "Project Consultancy", "Planning", "3D Perspective", "Animation"],
  },
  {
    title: "Architecture",
    slug: "architecture",
    order: 2,
    category: "design-build",
    shortDescription: "Ground-up structural design, from concept massing to construction drawings.",
    fullDescription:
      "We handle architectural design from first massing studies through to submission-ready construction drawings, coordinating with structural and M&E consultants along the way.",
    offerings: ["Concept Design", "Structural Planning", "Permit Drawings", "Construction Documentation"],
  },
  {
    title: "Consulting",
    slug: "consulting",
    order: 3,
    category: "design-build",
    shortDescription: "Planning, budgeting and project consultancy for builds of any scale.",
    fullDescription:
      "Independent project consultancy for clients who need budgeting, feasibility studies, and hands-on project management without committing to a full design-build package.",
    offerings: ["Feasibility Studies", "Budgeting", "Project Management", "Contractor Coordination"],
  },
  {
    title: "IT & Technology",
    slug: "it",
    order: 4,
    category: "technology",
    shortDescription: "Smart-building systems, networking, and the software that runs the space.",
    fullDescription:
      "Structured cabling, networking, access control, smart-home/building automation, and custom software — planned in from day one so the systems that run your space are never an afterthought.",
    offerings: ["Structured Cabling", "Networking & Wi-Fi", "Smart Automation", "Security Systems", "Custom Software"],
  },
];

const projects = [
  {
    title: "Ridgewood Residence",
    slug: "ridgewood-residence",
    client: "Private Client",
    location: "Mumbai, Maharashtra",
    category: "Interior",
    coverImage: "/images/projects/ridgewood-residence.jpg",
    description: "A warm, material-led renovation of a 4-bedroom bungalow, with integrated smart lighting.",
    year: 2025,
    featured: true,
  },
  {
    title: "Meridian Office Tower — Fit-Out",
    slug: "meridian-office-tower",
    client: "Meridian Holdings",
    location: "Bengaluru, Karnataka",
    category: "Commercial",
    coverImage: "/images/projects/meridian-office.jpg",
    description: "Full-floor commercial fit-out including structured cabling and access control for 200 staff.",
    year: 2025,
    featured: true,
  },
  {
    title: "Casa Verde Ground-Up Build",
    slug: "casa-verde",
    client: "Private Client",
    location: "New Delhi, Delhi",
    category: "Architecture",
    coverImage: "/images/projects/casa-verde.jpg",
    description: "Architecture and structural design for a 3-storey residence from land purchase to keys.",
    year: 2024,
    featured: false,
  },
  {
    title: "Harbor Point Retail Network",
    slug: "harbor-point-retail",
    client: "Harbor Point Sdn Bhd",
    location: "Pune, Maharashtra",
    category: "IT",
    coverImage: "/images/projects/harbor-point.jpg",
    description: "Networking and POS infrastructure rollout across 6 retail outlets.",
    year: 2024,
    featured: false,
  },
];

const awards = [
  { title: "Atap Design Awards 2025", subtitle: "Best Themed Design (Commercial)", year: 2025, order: 1 },
  { title: "Qanvast Design Awards 2024", subtitle: "Commercial Design Project Winner", year: 2024, order: 2 },
  { title: "MFID 2024", subtitle: "Best Luxury Villa Design Winner", year: 2024, order: 3 },
];

const blogPosts = [
  {
    title: "Why We Wire the Network Before We Hang the Drywall",
    slug: "wire-network-before-drywall",
    excerpt: "The case for planning IT infrastructure at the same stage as interior layout, not after.",
    content:
      "Most renovations treat networking as an afterthought — an electrician runs a cable wherever's convenient once the walls are already up. We plan structured cabling, access points and automation alongside the interior layout from week one, so the finished space never has a visible retrofit.",
    tags: ["IT", "Process"],
  },
  {
    title: "Choosing Materials That Age Well in India's Climate",
    slug: "materials-that-age-well",
    excerpt: "Humidity and heat change which finishes make sense here — here's what we specify and why.",
    content:
      "Tropical humidity is unkind to certain finishes that look great on a moodboard shot in a temperate climate. We favour sealed engineered timber, powder-coated metal, and moisture-resistant substrates in wet zones — details that don't show up in a rendering but matter five years in.",
    tags: ["Materials", "Interior"],
  },
];

async function seed() {
  await connectDB();

  console.log("Clearing existing collections...");
  await Promise.all([
    Service.deleteMany({}),
    Project.deleteMany({}),
    Award.deleteMany({}),
    BlogPost.deleteMany({}),
  ]);

  console.log("Inserting seed data...");
  await Service.insertMany(services);
  await Project.insertMany(projects);
  await Award.insertMany(awards);
  await BlogPost.insertMany(blogPosts);

  console.log("Seed complete:", {
    services: services.length,
    projects: projects.length,
    awards: awards.length,
    blogPosts: blogPosts.length,
  });

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
