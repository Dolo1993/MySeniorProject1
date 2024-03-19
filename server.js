const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 
const methodOverride = require('method-override');
const db = require('./database/db'); 
const membershipController = require('./controllers/membershipController'); 
const privacyPolicyRoute = require('./routes/privacyPolicyRoute'); 
const morgan = require('morgan')

// Environment variables loaded
dotenv.config();

// Require routes
const announcementRoutes = require('./routes/announcementRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const sup_chairsRoutes = require('./routes/sup_chairsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const supManagementRoutes = require('./routes/supManagementRoutes'); 
const aboutRoute = require('./routes/aboutRoute'); 
const authRoutes = require('./routes/authRoutes');

const app = express();

const port = process.env.PORT;

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// View engine
app.set('view engine', 'ejs');

// Views directory
app.set('views', path.join(__dirname, 'views'));

// Public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

// Routes
app.get('/', (req, res) => {
    // Index view
    res.render('index');
});

// Middleware to validate regular membership form data
app.post('/submit-membership', membershipController.submitMembershipForm);

// Use routes
app.use('/', announcementRoutes);
app.use('/', eventsRoutes);
app.use('/', contactRoutes);
app.use('/', membershipRoutes);
app.use('/', sup_chairsRoutes);
app.use('/', galleryRoutes); 
app.use('/', aboutRoute); 
app.use('/', privacyPolicyRoute);
app.use('/admin', authRoutes);  
app.use('/admin', requireLogin, supManagementRoutes);  
app.use(morgan('dev'));  

app.use(methodOverride('_method'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
 