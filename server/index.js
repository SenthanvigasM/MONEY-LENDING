const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/user.js');
const lentModel = require('./models/lent.js'); // Import your lent model

const app = express();
app.use(express.json());
app.use(cors());
const uri = 'mongodb+srv://SenthanVigasM:Msenthan0307@moneylent.m6vpxc1.mongodb.net/MoneyLent?retryWrites=true&w=majority&appName=MoneyLent';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Register route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists", message: "An account with this email address already exists. Please use a different email address." });
    }

    const newUser = new userModel({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: "Internal server error", message: err.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User Not Found', message: 'No user found with the provided email.' });
    }

    if (user.password === password) {
      res.json({ message: "Login successful", email: user.email });
    } else {
      res.status(401).json({ error: 'Incorrect Password', message: 'Incorrect password. Please try again.' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server Error', message: 'An error occurred while processing your request. Please try again later.' });
  }
});

// Lent routes
// Create lent entry
app.post('/lent', async (req, res) => {
  try {
    const newLentEntry = new lentModel({
      name: req.body.name,
      date: req.body.date,
      amount: req.body.amount,
      reason: req.body.reason,
      email: req.body.email, // Assuming you pass email from frontend if needed
    });

    await newLentEntry.save();
    res.status(201).json(newLentEntry);
  } catch (error) {
    console.error('Error saving lent entry:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.get('/lent', async (req, res) => {
  try {
    const userEmail = req.query.email; // Get email from query parameter
    const entries = await lentModel.find({ email: userEmail });
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching lent entries:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.put('/lent/:id', async (req, res) => {
  try {
    const updatedLent = await lentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLent);
  } catch (error) {
    console.error('Error updating lent data:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.delete('/lent/:id', async (req, res) => {
  try {
    await lentModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting lent data:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
