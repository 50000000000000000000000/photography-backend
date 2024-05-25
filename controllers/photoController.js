const Photo = require('../models/photo');
const path = require('path');

exports.uploadPhoto = (req, res) => {
    const { title } = req.body;
    const imageUrl = req.file.path;

    const newPhoto = new Photo({ title, imageUrl, user: req.userId });

    newPhoto.save()
        .then(photo => res.status(201).json(photo))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getAllPhotos = (req, res) => {
    Photo.find()
        .then(photos => res.json(photos))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.deletePhoto = (req, res) => {
    Photo.findById(req.params.id)
        .then(photo => {
            if (!photo) {
                return res.status(404).json({ msg: 'Photo not found' });
            }
            if (photo.user.toString() !== req.userId) {
                return res.status(401).json({ msg: 'User not authorized' });
            }
            photo.remove().then(() => res.json({ msg: 'Photo removed' }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

