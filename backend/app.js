const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  linkedinusrn: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  codingProfiles: [
    {
      platform: { type: String, required: true }, // Name of the platform
      link: { type: String, required: true }, // Profile link
    },
  ],
  github: { type: String, default: "" },
  githubusrn: { type: String, default: "" },
  objective: { type: String, default: "" },
education: [
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true },
    coursework: { type: String, default: "" },
    score: { type: String, default: "" }, // Combined field for both CGPA and percentage
    scoreType: { type: String, enum: ["CGPA", "Percentage"], default: "CGPA" }, // Type of score
  },
],
  skills: [
    {
      category: { type: String, required: true },
      skills: { type: String, required: true }, // Comma-separated skills
    },
  ],
 experience: [
  {
    roleName: { type: String, required: true }, // Job title
    companyName: { type: String, required: true }, // Company name
    dateRange: { type: String }, // Updated from 'duration' to 'dateRange'
    location: { type: String }, // Added for job location
    achievements: { type: [String], default: [] }, // Updated from 'details' to 'achievements'
  },
],

responsibilities: [
  {
    position: { type: String, required: true }, // Responsibility title
    organization:{ type: String, required: true }, // Responsibility organisation
    dateRange: { type: String }, // Updated from 'duration' to 'dateRange'
    bulletPoints: { type: [String], default: [] }, // Array of detailed descriptions
  },
],
projects: [
  {
    title: { type: String, required: true },
    description: { type: [String], default: [''] },
    links: [
      {
        name: { type: String, default: "" }, // Placeholder for the name of the link
        url: { type: String, default: "" }, // Placeholder for the actual link URL
      },
    ],
    date: { type: String, default: "" }, // Optional string field for the date
  },
],


  activities: [String],
  leadership: [String],
  certifications: [
    {
      name: { type: String, required: true },
      validUntil: { type: String, default: ""},
      link: { type: String, default: "" },
    },
  ],
});

// Models
const User = mongoose.model("User", userSchema);
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully.", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});
// Example Saved Order
let savedOrder = ["experience","education","skills","projects","activities","certifications","responsibilities"];

// Save Order Route
app.post("/api/save-order", (req, res) => {
  const { order } = req.body;
  if (!Array.isArray(order) || order.length === 0) {
    return res.status(400).json({ error: "Invalid order data provided." });
  }
  savedOrder = order;
  res.status(200).json({ message: "Order updated successfully.", order: savedOrder });
});


// Generate LaTeX Route
app.get("/generate-latex", async (req, res) => {
  try {
    console.log(`In try ${savedOrder}`);

    // Fetch user data
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(400).json({ error: "No user data found to generate LaTeX." });
    }

    const user = users[0];

    // Escape special LaTeX characters
    const escapeLatex = (str) =>
      str
        ? str
            .replace(/_/g, "\\_")
            .replace(/&/g, "\\&")
            .replace(/%/g, "\\%")
            .replace(/#/g, "\\#")
            .replace(/\$/g, "\\$")
            .replace(/\{/g, "\\{")
            .replace(/\}/g, "\\}")
        : "";

    // Map sections based on user data
    const sections = {
      objective: user.objective
        ? `\\begin{rSection}{Objective}\n${escapeLatex(user.objective)}\n\\end{rSection}`
        : null,
      experience: user.experience?.length
        ? `\\begin{rSection}{Experience}\n${user.experience
            .map(
              (exp) =>
                `\\textbf{${escapeLatex(exp.roleName)}}${exp.dateRange ? ` \\hfill ${escapeLatex(exp.dateRange)}` : ""} \\\\\n${escapeLatex(
                  exp.companyName
                )}${exp.location ? ` \\hfill \\textit{${escapeLatex(exp.location)}}` : ""}\n\\begin{itemize}\n${exp.achievements
                  .map((ach) => `\\item ${escapeLatex(ach)}`)
                  .join("\n")}\n\\end{itemize}`
            )
            .join("\n")}\n\\end{rSection}`
        : null,
    education: user.education && user.education.length > 0
  ? `\\begin{rSection}{Education}
${user.education
  .map(
    (ed) => `
\\textbf{${escapeLatex(ed.degree)}} \\hfill ${escapeLatex(ed.year)} \\\\
${escapeLatex(ed.institution)}${
      ed.score && ed.score !== ""
        ? ` \\hfill ${ed.scoreType === "CGPA" ? "CGPA" : "Percentage"}: ${escapeLatex(ed.score)}`
        : ""
    }${
      ed.coursework && ed.coursework !== ""
        ? `\\\\Relevant Coursework: ${escapeLatex(ed.coursework)}`
        : ""
    }`
  )
  .join("\n")}
\\end{rSection}`
  : null,

      skills: user.skills?.length
        ? `\\begin{rSection}{Skills}\n\\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{6ex}} l }\n${user.skills
            .map((skill) => `${escapeLatex(skill.category)} & ${escapeLatex(skill.skills)} \\\\\n`)
            .join("")}\\end{tabular}\n\\end{rSection}`
        : null,
      projects: user.projects?.length
        ? `\\begin{rSection}{Projects}\n${user.projects
            .map(
              (proj) =>
                `\\textbf{${escapeLatex(proj.title)}}${
                  proj.links?.length
                    ? " " +
                      proj.links
                        .map(
                          (link) =>
                            `\\href{${escapeLatex(link.url)}}{${escapeLatex(link.name || "Link")}}`
                        )
                        .join(" | ")
                    : ""
                }${proj.date ? ` \\hfill ${escapeLatex(proj.date)}` : ""}\n\\begin{itemize}\n${proj.description
                  .map((desc) => `\\item ${escapeLatex(desc)}`)
                  .join("\n")}\n\\end{itemize}`
            )
            .join("\n")}\n\\end{rSection}`
        : null,
      activities: user.activities?.length
        ? `\\begin{rSection}{Achievements}\n\\begin{itemize}\n${user.activities
            .map((activity) => `\\item ${escapeLatex(activity)}`)
            .join("\n")}\n\\end{itemize}\n\\end{rSection}`
        : null,
      certifications: user.certifications?.length
        ? `\\begin{rSection}{Certifications}\n\\begin{itemize}\n${user.certifications
            .map(
              (cert) =>
                `\\item ${cert.link ? `\\href{${escapeLatex(cert.link)}}{\\textbf{${escapeLatex(cert.name)}}}` : `\\textbf{${escapeLatex(cert.name)}}`}${
                  cert.validUntil ? ` \\hfill Valid Until: ${escapeLatex(cert.validUntil)}` : ""
                }`
            )
            .join("\n")}\n\\end{itemize}\n\\end{rSection}`
        : null,
      responsibilities: user.responsibilities?.length
        ? `\\begin{rSection}{Position Of Responsibility}\n${user.responsibilities
            .map(
              (resp) =>
                `\\textbf{${escapeLatex(resp.position)}}${resp.dateRange ? ` \\hfill ${escapeLatex(resp.dateRange)}` : ""} \\\\\n${escapeLatex(
                  resp.organization
                )}\n\\begin{itemize}\n${resp.bulletPoints
                  .map((point) => `\\item ${escapeLatex(point)}`)
                  .join("\n")}\n\\end{itemize}`
            )
            .join("\n")}\n\\end{rSection}`
        : null,
      leadership: user.leadership?.length
        ? `\\begin{rSection}{Leadership}\n\\begin{itemize}\n${user.leadership
            .map((lead) => `\\item ${escapeLatex(lead)}`)
            .join("\n")}\n\\end{itemize}\n\\end{rSection}`
        : null,
    };

    // Validate and process the saved order
    if (!savedOrder || !Array.isArray(savedOrder)) {
      return res.status(400).json({ error: "Invalid or missing saved order." });
    }

    const orderedSections = savedOrder
      .map((section) => sections[section])
      .filter(Boolean) // Remove null or empty sections
      .join("\n");

    // Generate final LaTeX content
    const latexContent = `
\\documentclass{resume}
\\usepackage[left=0.4in, top=0.4in, right=0.4in, bottom=0.4in]{geometry}
\\name{${escapeLatex(user.firstName)} ${escapeLatex(user.lastName)}}
\\address{${escapeLatex(user.phone)}${user.address ? ` \\\\ ${escapeLatex(user.address)}` : ""}}
\\address{\\href{mailto:${escapeLatex(user.email)}}{${escapeLatex(user.email)}}${
      user.linkedin ? ` \\\\ \\href{${escapeLatex(user.linkedin)}}{${escapeLatex(user.linkedinusrn || "LinkedIn Profile")}}` : ""
    }${
      user.github ? ` \\\\ \\href{${escapeLatex(user.github)}}{${escapeLatex(user.githubusrn || "GitHub Profile")}}` : ""
    }${
      user.portfolio ? ` \\\\ \\href{${escapeLatex(user.portfolio)}}{Portfolio}` : ""
    }${
      user.codingProfiles && user.codingProfiles.length > 0
        ? user.codingProfiles
            .map((profile) => ` \\\\ \\href{${escapeLatex(profile.link)}}{${escapeLatex(profile.platform)}}`)
            .join("")
        : ""
    }}
\\begin{document}
${user.objective && user.objective !== "" ? `
\\begin{rSection}{Objective}
${escapeLatex(user.objective)}
\\end{rSection}` : ""}
${orderedSections}
\\end{document}`;

    // Send response
    deleteAllData();
    res.setHeader("Content-Type", "application/x-tex");
    res.setHeader("Content-Disposition", "attachment; filename=resume.tex");
    res.status(200).send(latexContent);
  } catch (error) {
    console.log(`In catch ${savedOrder}`);
    console.error("Error generating LaTeX:", error);
    res.status(500).json({ error: "Error generating LaTeX file." });
  }
});


// Function to delete all data in the cluster
const deleteAllData = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const collection of collections) {
      const collectionName = collection.name;
      if (collectionName !== "important") {
        await mongoose.connection.db.collection(collectionName).deleteMany({});
        console.log(`Data deleted from collection: ${collectionName}`);
      }
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
