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
const mongoURI = "mongodb+srv://yashshah9279:DcOxAdmXXdKr4vNt@twofields.htroe.mongodb.net/?retryWrites=true";
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
  codingProfile: { type: String, default: "" },
  codingProfileplatname: { type: String, default: "" },
  github: { type: String, default: "" },
  githubusrn: { type: String, default: "" },
  objective: { type: String, default: "" },
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: String, required: true },
      coursework: { type: String, default: "" },
      CGPA: { type: String, default: "" },
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
  projects: [
    {
      title: { type: String, required: true },
      description: { type: [String], default: [''] }, // Array of strings for bullet points
      link: { type: String, default: "" },
    },
  ],
  activities: [String],
  leadership: [String],
});

const User = mongoose.model("User", userSchema);

// Routes

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Resume Builder API");
});

// Create User
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

// Generate LaTeX from User Data
app.get("/generate-latex", async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(400).json({ error: "No user data found to generate LaTeX." });
    }

    const user = users[0];
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
    }}

\\begin{document}

${user.objective && user.objective !== "" ? `
\\begin{rSection}{Objective}
${escapeLatex(user.objective)}
\\end{rSection}` : ""}

${user.education && user.education.length > 0 ? `
\\begin{rSection}{Education}
${user.education.map((ed) => `
\\textbf{${escapeLatex(ed.degree)}} \\\\
${escapeLatex(ed.institution)} \\hfill ${escapeLatex(ed.year)} \\\\
${ed.coursework && ed.coursework !== "" ? `Relevant Coursework: ${escapeLatex(ed.coursework)}\\\\` : ""}
${ed.CGPA && ed.CGPA !== "" ? `CGPA: ${escapeLatex(ed.CGPA)}\\\\` : ""}`).join("\n")}
\\end{rSection}` : ""}

${user.experience && user.experience.length > 0 ? `
\\begin{rSection}{Experience}
${user.experience.map((exp) => `
\\textbf{${escapeLatex(exp.roleName)}} ${exp.dateRange && exp.dateRange !== "" ? `\\hfill ${escapeLatex(exp.dateRange)}` : ""} \\\\
${escapeLatex(exp.companyName)} ${exp.location && exp.location !== "" ? `\\hfill \\textit{${escapeLatex(exp.location)}}` : ""} \\\\
\\begin{itemize}
${exp.achievements && exp.achievements.length > 0 ? exp.achievements.map((achievement) => `
\\item ${escapeLatex(achievement)}`).join("\n") : ""}
\\end{itemize}`).join("\n")}
\\end{rSection}` : ""}


${user.skills && user.skills.length > 0 ? `
\\begin{rSection}{Skills}
\\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{6ex}} l }
${user.skills.map((skill) => `
${escapeLatex(skill.category)} & ${escapeLatex(skill.skills)} \\\\`).join("\n")}
\\end{tabular}
\\end{rSection}` : ""}

${user.projects && user.projects.length > 0 ? `
\\begin{rSection}{Projects}
\\begin{itemize}
${user.projects.map((proj) => `
\\item \\textbf{${escapeLatex(proj.title)}}${proj.link && proj.link !== "" ? ` \\href{${escapeLatex(proj.link)}}{(Link)}` : ""}
\\begin{itemize}
${proj.description.map((desc) => `
\\item ${escapeLatex(desc)}`).join("\n")}
\\end{itemize}`).join("\n")}
\\end{itemize}
\\end{rSection}` : ""}



${user.activities && user.activities.length > 0 ? `
\\begin{rSection}{Achievements}
\\begin{itemize}
${user.activities.map((activity) => `
\\item ${escapeLatex(activity)}`).join("\n")}
\\end{itemize}
\\end{rSection}` : ""}

${user.leadership && user.leadership.length > 0 ? `
\\begin{rSection}{Leadership}
\\begin{itemize}
${user.leadership.map((lead) => `
\\item ${escapeLatex(lead)}`).join("\n")}
\\end{itemize}
\\end{rSection}` : ""}

\\end{document}`;

    deleteAllData();
    res.setHeader("Content-Type", "application/x-tex");
    res.setHeader("Content-Disposition", "attachment; filename=resume.tex");
    res.status(200).send(latexContent);
  } catch (error) {
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
