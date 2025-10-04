const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');

// Import Jewelry model
const Jewelry = require('./models/jewelry');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection String - replace with your own connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jewelry_store';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Middleware
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Image folder setup
const imageFolder = path.join(__dirname, 'images');

// Ensure images directory exists
if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageFolder);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// WhatsApp contact numbers
const whatsappContacts = [
    { name: "Sales Team 1", number: "8080577408" },
    { name: "Sales Team 2", number: "6280362243" }
];

// API Routes

// Get WhatsApp contact numbers
app.get('/api/contacts', (req, res) => {
    res.json(whatsappContacts);
});

// Get all jewelry items
app.get('/api/jewelry', async (req, res) => {
    try {
        const jewelry = await Jewelry.find().sort('id');
        res.json(jewelry);
    } catch (error) {
        console.error('Error getting jewelry data:', error);
        res.status(500).json({ error: 'Failed to get jewelry data' });
    }
});

// Add new jewelry item
app.post('/api/jewelry', async (req, res) => {
    try {
        const newItem = req.body;
        
        // Generate a new ID
        newItem.id = await Jewelry.getNextId();
        
        // Create new jewelry item
        const jewelry = new Jewelry(newItem);
        await jewelry.save();
        
        res.status(201).json(jewelry);
    } catch (error) {
        console.error('Error creating jewelry item:', error);
        res.status(500).json({ error: 'Failed to create jewelry item' });
    }
});

// Update an existing jewelry item
app.put('/api/jewelry/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedItem = req.body;
        
        const jewelry = await Jewelry.findOneAndUpdate(
            { id: id },
            updatedItem,
            { new: true }
        );
        
        if (!jewelry) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.json(jewelry);
    } catch (error) {
        console.error('Error updating jewelry item:', error);
        res.status(500).json({ error: 'Failed to update jewelry item' });
    }
});

// Delete a jewelry item
app.delete('/api/jewelry/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        const jewelry = await Jewelry.findOneAndDelete({ id: id });
        
        if (!jewelry) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.json(jewelry);
    } catch (error) {
        console.error('Error deleting jewelry item:', error);
        res.status(500).json({ error: 'Failed to delete jewelry item' });
    }
});

// Save all jewelry data at once (for bulk operations)
app.post('/api/save', async (req, res) => {
    try {
        const newData = req.body;
        
        // Clear existing data and insert new data
        await Jewelry.deleteMany({});
        
        if (newData.length > 0) {
            await Jewelry.insertMany(newData);
        }
        
        res.json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving all jewelry data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Upload image endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // Return the relative path to the image
        const relativePath = './images/' + req.file.filename;
        res.json({ 
            success: true, 
            filePath: relativePath,
            filename: req.file.filename,
            originalname: req.file.originalname
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Delete image file endpoint
app.delete('/api/images', (req, res) => {
    try {
        const imagePath = req.query.path;
        
        if (!imagePath) {
            return res.status(400).json({ error: 'Image path is required' });
        }
        
        // Extract filename from path (e.g., "./images/filename.jpg" -> "filename.jpg")
        const filename = path.basename(imagePath);
        const fullPath = path.join(imageFolder, filename);
        
        // Check if the file exists
        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ error: 'Image file not found' });
        }
        
        // Delete the file
        fs.unlinkSync(fullPath);
        
        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Failed to delete image' });
    }
});

// Generate data.js file for client-side usage
app.get('/api/generate-data-file', async (req, res) => {
    try {
        const jewelry = await Jewelry.find().sort('id');
        
        const dataFilePath = path.join(__dirname, 'data.js');
        const dataString = `const jewelryData = ${JSON.stringify(jewelry, null, 4)};`;
        
        fs.writeFileSync(dataFilePath, dataString, 'utf8');
        
        res.json({ 
            success: true, 
            message: 'data.js file generated successfully',
            count: jewelry.length
        });
    } catch (error) {
        console.error('Error generating data file:', error);
        res.status(500).json({ error: 'Failed to generate data file' });
    }
});

// Error handling middleware for multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
        }
        return res.status(400).json({ error: err.message });
    }
    next(err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin interface: http://localhost:${PORT}/admin.html`);
});
