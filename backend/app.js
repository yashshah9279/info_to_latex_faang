const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Parser } = require("json2csv");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI =
  "mongodb+srv://yashshah9279:DcOxAdmXXdKr4vNt@twofields.htroe.mongodb.net/?retryWrites=true";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, default: "" },
  email: { type: String, required: true },
  linkedin: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  objective: { type: String, required: true },
  education: { type: String, required: true },
  skills: { type: String, default: "" },
  experience: { type: String, default: "" },
  projects: { type: String, default: "" },
  extraCurricular: { type: String, default: "" },
  leadership: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);

// Routes

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Resume Management API");
});

// Create User
app.post("/users", async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      email,
      linkedin,
      portfolio,
      objective,
      education,
      skills,
      experience,
      projects,
      extraCurricular,
      leadership,
    } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !objective || !education) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, phone, email, objective, or education." });
    }

    const newUser = new User({
      name,
      phone,
      address,
      email,
      linkedin,
      portfolio,
      objective,
      education,
      skills,
      experience,
      projects,
      extraCurricular,
      leadership,
    });

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

    let latexContent = `
\\documentclass{resume}
\\usepackage[left=0.4in, top=0.4in, right=0.4in, bottom=0.4in]{geometry}
\\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}} 
\\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}
\\name{Generated Resume}
\\begin{document}
`;

    users.forEach((user) => {
      latexContent += `
\\begin{rSection}{Personal Information}
Name: ${user.name} \\\\
Phone: ${user.phone} \\\\
Email: ${user.email} \\\\
${user.address ? `Address: ${user.address} \\\\` : ""}
${user.linkedin ? `LinkedIn: ${user.linkedin} \\\\` : ""}
${user.portfolio ? `Portfolio: ${user.portfolio}` : ""}
\\end{rSection}

\\begin{rSection}{Objective}
${user.objective}
\\end{rSection}

\\begin{rSection}{Education}
${user.education}
\\end{rSection}

\\begin{rSection}{Skills}
${user.skills || "N/A"}
\\end{rSection}

\\begin{rSection}{Experience}
${user.experience || "N/A"}
\\end{rSection}

\\begin{rSection}{Projects}
${user.projects || "N/A"}
\\end{rSection}

\\begin{rSection}{Extra-Curricular Activities}
${user.extraCurricular || "N/A"}
\\end{rSection}

\\begin{rSection}{Leadership}
${user.leadership || "N/A"}
\\end{rSection}
`;
    });

    latexContent += "\\end{document}";
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
