const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "tutors.json");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serving HTML and other static files

// Helper function to read the tutors data
const readTutorsData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tutors data:", error);
    throw new Error("Failed to read tutors data.");
  }
};

// Helper function to write the tutors data
const writeTutorsData = (tutors) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tutors, null, 2));
  } catch (error) {
    console.error("Error writing tutors data:", error);
    throw new Error("Failed to save tutors data.");
  }
};

// Routes

// Get all tutors or filter by subject and name
app.get("/tutors", (req, res) => {
  const subject = req.query.subject?.toLowerCase();
  const name = req.query.name?.toLowerCase();

  let tutors = readTutorsData();
  let filteredTutors = tutors;

  if (subject) {
    filteredTutors = filteredTutors.filter(tutor =>
      tutor.subjects.some(s => s.toLowerCase().includes(subject))
    );
  }

  if (name) {
    filteredTutors = filteredTutors.filter(tutor =>
      tutor.name.toLowerCase().includes(name)
    );
  }

  res.json(filteredTutors);
});

// Get all unique subjects
app.get("/subjects", (req, res) => {
  let tutors = readTutorsData();
  const subjects = Array.from(new Set(tutors.flatMap(t => t.subjects)));
  res.json(subjects);
});

// POST route to register a new tutor
app.post("/tutors", (req, res) => {
  const { name, email, subjects } = req.body;

  // Validation
  if (!name || !email || !subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ message: "All fields are required and subjects should be a non-empty array." });
  }

  // Create new tutor object
  const tutors = readTutorsData();
  const newTutor = {
    id: tutors.length + 1, // Auto-increment ID
    name,
    email,
    subjects,
    rating: 0, // Initial rating
    ratings: [], // Initialize ratings array
  };

  // Add new tutor to the tutors array
  tutors.push(newTutor);

  // Save tutors data to JSON file
  try {
    writeTutorsData(tutors);
    res.status(201).json({ message: "Tutor registered successfully", tutor: newTutor });
  } catch (error) {
    res.status(500).json({ message: "Failed to save tutor data." });
  }
});

// POST route to rate a tutor
app.post("/rate-tutor", (req, res) => {
  const { tutorId, rating, studentEmail } = req.body;

  // Validation
  if (!tutorId || !rating || !studentEmail || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "All fields are required and rating must be between 1 and 5." });
  }

  let tutors = readTutorsData();

  // Find the tutor by ID
  const tutor = tutors.find(t => t.id === tutorId);
  if (!tutor) {
    return res.status(404).json({ message: "Tutor not found." });
  }

  // Add the rating to the tutor's ratings array
  tutor.ratings.push({ rating: parseInt(rating), studentEmail });

  // Calculate the new average rating
  const totalRatings = tutor.ratings.reduce((acc, r) => acc + r.rating, 0);
  tutor.rating = totalRatings / tutor.ratings.length;

  // Save tutors data to JSON file
  try {
    writeTutorsData(tutors);
    res.status(201).json({ message: "Rating submitted successfully", tutor });
  } catch (error) {
    res.status(500).json({ message: "Failed to save rating." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 