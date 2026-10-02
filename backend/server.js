const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces Node to use Google Public DNS

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Your MongoDB connection string
const MONGO_URI = "mongodb+srv://naweenramesh_db_user:JLQtgRCfckLXBm5i@cluster0.i3uodaz.mongodb.net/?appName=Cluster0";


mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Cloud Database!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema & Model
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// API Route
app.post('/api/contact', async (req, res) => {
  try {
    const { Name, Email, Message } = req.body;
    const newContact = new Contact({ name: Name, email: Email, message: Message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message saved to MongoDB!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Express Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});