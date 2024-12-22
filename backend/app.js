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
  skills: [String],
  experience: [
    {
      position: { type: String, required: true },
      company: { type: String, required: true },
      duration: { type: String, required: true },
      details: { type: [String], default: [] },
    },
  ],
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      techStack: { type: [String], default: [] },
      link: { type: String, default: "" },
    },
  ],
  extraCurricular: [String],
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
    res.status(500).json({ error: "Error creating user." });
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
        .replace(/_/g, "\\_")
        .replace(/&/g, "\\&")
        .replace(/%/g, "\\%")
        .replace(/#/g, "\\#")
        .replace(/\$/g, "\\$")
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}");

    const latexContent = `
\\documentclass{resume}
\\usepackage[left=0.4in, top=0.4in, right=0.4in, bottom=0.4in]{geometry}
\\name{${user.firstName} ${user.lastName}}
\\address{${user.phone}${user.address ? ` \\\\ ${escapeLatex(user.address)}` : ""}}
\\address{\\href{mailto:${user.email}}{${user.email}}${
      user.linkedin ? ` \\\\ \\\href{${escapeLatex(user.linkedin)}}{${user.linkedinusrn}}` : ""
    }${
      user.github ? ` \\\href{${escapeLatex(user.github)}}{${user.githubusrn}}` : ""
    }${
      user.codingProfile ? ` \\\href{${escapeLatex(user.codingProfile)}}{${user.codingProfileplatname}}` : ""
    }${
      user.portfolio ? ` \\\href{${escapeLatex(user.portfolio)}}{Portfolio}` : ""
    }}

\\begin{document}

${user.objective ? `\\begin{rSection}{Objective}\n${escapeLatex(user.objective)}\n\\end{rSection}` : ""}

${user.education.length > 0 ? `\\begin{rSection}{Education}\n${user.education.map((ed) => `${escapeLatex(ed.degree)} at ${escapeLatex(ed.institution)} (${escapeLatex(ed.year)})\\\\`).join("\n")}\n\\end{rSection}` : ""}

${user.skills.length > 0 ? `\\begin{rSection}{Skills}\n${escapeLatex(user.skills.join(", "))}\n\\end{rSection}` : ""}

${user.experience.length > 0 ? `\\begin{rSection}{Experience}\n${user.experience.map((exp) => `\\item ${escapeLatex(exp.position)} at ${escapeLatex(exp.company)} (${escapeLatex(exp.duration)})\n${exp.details.map((detail) => `- ${escapeLatex(detail)}`).join("\n")}`).join("\n")}\n\\end{rSection}` : ""}

${user.projects.length > 0 ? `\\begin{rSection}{Projects}\n${user.projects.map((proj) => `\\item ${escapeLatex(proj.name)} - ${escapeLatex(proj.description)}\nTech Stack: ${escapeLatex(proj.techStack.join(", "))}\n${proj.link ? `Link: \\\href{${proj.link}}{Project Link}` : ""}`).join("\n")}\n\\end{rSection}` : ""}

${user.extraCurricular.length > 0 ? `\\begin{rSection}{Extra-Curricular Activities}\n${user.extraCurricular.map((activity) => `\\item ${escapeLatex(activity)}`).join("\n")}\n\\end{rSection}` : ""}

${user.leadership.length > 0 ? `\\begin{rSection}{Leadership}\n${user.leadership.map((lead) => `\\item ${escapeLatex(lead)}`).join("\n")}\n\\end{rSection}` : ""}

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
