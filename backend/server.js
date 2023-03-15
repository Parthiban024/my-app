const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Allow cross-origin requests from all domains
app.use(cors());

// Set up MongoDB connection
mongoose.connect('mongodb+srv://ParthiGMR:Parthiban7548@parthibangmr.1quwer2.mongodb.net/my-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoDB connected');
});

// Set up multer storage engine for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Resume file type must be PDF.'));
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 700000,
  },
});

// Add body-parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));

// Set up API endpoint for form submission
app.post('/submit', upload.single('resume'), async (req, res) => {
  // Create a new document in the MongoDB collection using Mongoose
  const { firstName, lastName, email, phone, company, degree, year, experience } = req.body;
  const resume = req.file ? req.file.filename : null; // Check if file exists before accessing filename property

  const data = { firstName, lastName, email, phone, company, degree, year, resume, experience }; // Add experience field
  const newEntry = new FormEntry(data);
  
  try {
    await newEntry.save();
    res.send(data); 
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
  
});


// Define Mongoose schema for form data
const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  company: String,
  degree: String,
  year: Number,
  resume: String,
  experience: Number, // Add this field
});

const FormEntry = mongoose.model('FormEntry', formSchema); // Define the model after the schema is created

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
