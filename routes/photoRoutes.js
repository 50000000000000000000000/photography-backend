const express = require('express');
const multer = require('multer');
const { uploadPhoto, getAllPhotos, deletePhoto } = require('../controllers/photoController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('image'), uploadPhoto);
router.get('/', getAllPhotos);
router.delete('/:id', authMiddleware, deletePhoto);

module.exports = router;

