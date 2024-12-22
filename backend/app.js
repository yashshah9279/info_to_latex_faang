const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

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
  portfolio: { type: String, default: "" },
  codingProfile: { type: String, default: "" },
  github: { type: String, default: "" },
  objective: { type: String, required: true },
  education: { type: [String], required: true },
  skills: { type: [String], default: [] },
  experience: { type: [String], default: [] },
  projects: { type: [String], default: [] },
  extraCurricular: { type: [String], default: [] },
  leadership: { type: [String], default: [] },
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

    // Escape LaTeX special characters in URLs
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
\\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}} 
\\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}
\\name{${user.firstName} ${user.lastName}}
\\address{${user.phone}${user.address ? ` \\\\ ${escapeLatex(user.address)}` : ""}}
\\address{\\href{mailto:${user.email}}{${user.email}}${
      user.linkedin ? ` \\\\ \\href{${escapeLatex(user.linkedin)}}{LinkedIn}` : ""
    }${
      user.github ? ` \\href{${escapeLatex(user.github)}}{GitHub}` : ""
    }${
      user.codingProfile ? ` \\href{${escapeLatex(user.codingProfile)}}{Coding Profile}` : ""
    }${
      user.portfolio ? ` \\href{${escapeLatex(user.portfolio)}}{Portfolio}` : ""
    }}
\\begin{document}

\\begin{rSection}{Objective}
${escapeLatex(user.objective)}
\\end{rSection}

\\begin{rSection}{Education}
${user.education.map((ed) => `${escapeLatex(ed)} \\\\`).join("")}
\\end{rSection}

${user.skills.length > 0 ? `\\begin{rSection}{Skills}
${escapeLatex(user.skills.join(", "))}
\\end{rSection}` : ""}

${user.experience.length > 0 ? `\\begin{rSection}{Experience}
${user.experience.map((exp) => `\\item ${escapeLatex(exp)}`).join("\n")}
\\end{rSection}` : ""}

${user.projects.length > 0 ? `\\begin{rSection}{Projects}
${user.projects.map((proj) => `\\item ${escapeLatex(proj)}`).join("\n")}
\\end{rSection}` : ""}

${user.extraCurricular.length > 0 ? `\\begin{rSection}{Extra-Curricular Activities}
${user.extraCurricular.map((activity) => `\\item ${escapeLatex(activity)}`).join("\n")}
\\end{rSection}` : ""}

${user.leadership.length > 0 ? `\\begin{rSection}{Leadership}
${user.leadership.map((lead) => `\\item ${escapeLatex(lead)}`).join("\n")}
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
    // Get all collection names
    const collections = await mongoose.connection.db.listCollections().toArray();

    if (!collections || collections.length === 0) {
      console.log("No collections found in the database.");
      return;
    }

    // Iterate through each collection and delete its data
    for (const collection of collections) {
      const collectionName = collection.name;
      await mongoose.connection.db.collection(collectionName).deleteMany({});
      console.log(`All data deleted from collection: ${collectionName}`);
    }

    console.log("All data in the cluster has been deleted.");
  } catch (error) {
    console.error("Error deleting all data:", error);
  }
};

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
