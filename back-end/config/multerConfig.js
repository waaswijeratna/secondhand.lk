const multer = require('multer');
const { uploadToFirebase } = require('./firebaseConfig');

// Set up multer storage for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage instead of disk storage

// Set up multer middleware to handle file uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Middleware to handle the file upload to Firebase and pass URLs to next middleware
const handleFirebaseUpload = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return next();
    }

    try {
        const fileUploadPromises = req.files.map(file => uploadToFirebase(file));

        const fileUrls = await Promise.all(fileUploadPromises);

        // Attach the file URLs to the request object
        req.body.fileUrls = fileUrls.filter(url => typeof url === 'string'); // Filter out non-URLs

        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload files to Firebase', details: error.message });
    }
};

module.exports = { upload, handleFirebaseUpload };
