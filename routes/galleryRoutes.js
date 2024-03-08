const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// rendering the gallery page
router.get('/gallery', (req, res) => {
    const images = [
        { path: 'images/gallery1.jpg', alt: 'Gallery Image 1' },  
        { path: 'images/gallery3.jpg', alt: 'Gallery Image 3' }, 
        { path: 'images/gallery4.jpg', alt: 'Gallery Image 4' }, 
        { path: 'images/gallery8.jpg', alt: 'Gallery Image 8' }, 
        { path: 'images/gallery9.jpg', alt: 'Gallery Image 9' }, 
        { path: 'images/gallery10.jpg', alt: 'Gallery Image 10' }, 
        { path: 'images/gallery11.jpg', alt: 'Gallery Image 11' }, 
        { path: 'images/gallery12.jpg', alt: 'Gallery Image 12' },
        { path: 'images/gallery14.jpg', alt: 'Gallery Image 14' },  
        { path: 'images/gallery17.jpg', alt: 'Gallery Image 17' },  
        { path: 'images/gallery19.jpg', alt: 'Gallery Image 19' },
         
    ];
    res.render('gallery', { images: images });
});

module.exports = router;
