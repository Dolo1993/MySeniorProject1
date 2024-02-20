// Requirement statement area
const express = require('express');
const path = require('path');
require('dotenv').config();

// Require routes
const announcementRoutes = require('./routes/announcementRoutes'); 
const eventsRoutes = require('./routes/eventsRoutes');  
const contactRoutes = require('./routes/contactRoutes'); 
const membershipRoutes = require('./routes/membershipRoutes'); 
const sup_chairsRoutes = require('./routes/sup_chairsRoutes'); 
const galleryRoutes = require('./routes/galleryRoutes');
 
const app = express(); 


const port = process.env.PORT;

// view engine
app.set('view engine', 'ejs');

// views directory
app.set('views', path.join(__dirname, 'views'));

// public directory
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
    // index view 
    res.render('index');
}); 

// Use routes
app.use('/', announcementRoutes); 
app.use('/', eventsRoutes);
app.use('/', contactRoutes); 
app.use('/', membershipRoutes);
app.use('/', sup_chairsRoutes); 
app.use('/', galleryRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
