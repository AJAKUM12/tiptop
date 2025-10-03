const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Data file path
const dataFilePath = path.join(__dirname, 'data.js');
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

// Helper function to read jewelry data
function readJewelryData() {
    try {
        // Read the data.js file
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        
        // Extract the array part (remove "const jewelryData = " and the trailing semicolon)
        const dataString = fileContent
            .replace('const jewelryData = ', '')
            .replace(/;[\s\n]*$/, '');
        
        return JSON.parse(dataString);
    } catch (error) {
        console.error('Error reading jewelry data:', error);
        return [];
    }
}

// Helper function to write jewelry data
function writeJewelryData(data) {
    try {
        const dataString = `const jewelryData = ${JSON.stringify(data, null, 4)};`;
        fs.writeFileSync(dataFilePath, dataString, 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing jewelry data:', error);
        return false;
    }
}

// API Routes

// Get all jewelry items
app.get('/api/jewelry', (req, res) => {
    const data = readJewelryData();
    res.json(data);
});

// Add new jewelry item
app.post('/api/jewelry', (req, res) => {
    const data = readJewelryData();
    const newItem = req.body;
    
    // Generate a new ID (max + 1)
    const maxId = data.reduce((max, item) => Math.max(max, item.id || 0), 0);
    newItem.id = maxId + 1;
    
    data.push(newItem);
    
    if (writeJewelryData(data)) {
        res.status(201).json(newItem);
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Update an existing jewelry item
app.put('/api/jewelry/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const data = readJewelryData();
    
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    
    data[index] = { ...updatedItem, id };
    
    if (writeJewelryData(data)) {
        res.json(data[index]);
    } else {
        res.status(500).json({ error: 'Failed to update data' });
    }
});

// Delete a jewelry item
app.delete('/api/jewelry/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readJewelryData();
    
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    
    const deletedItem = data[index];
    data.splice(index, 1);
    
    if (writeJewelryData(data)) {
        res.json(deletedItem);
    } else {
        res.status(500).json({ error: 'Failed to delete data' });
    }
});

// Save all jewelry data at once
app.post('/api/save', (req, res) => {
    const newData = req.body;
    
    if (writeJewelryData(newData)) {
        res.json({ success: true, message: 'Data saved successfully' });
    } else {
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
