const contactModel = require('../models/contactModel');
const validateContactForm = require('../validation/contactValidation');

//function to render the contact page Retrieve success message from session
exports.getContactPage = (req, res) => {
    const successMessage = req.session.successMessage;
    req.session.successMessage = null; 

    
// Render the contact page with errors and success message
    const errors = req.session.errors; 
    res.render('contact', { errors, successMessage });
};

// function to handle form submission
exports.submitContactForm = async (req, res) => {
    try {
        const formData = req.body;

// Validate form data
 const errors = validateContactForm(formData);
  if (Object.keys(errors).length > 0) {
    return res.render('contact', { errors, formData });
} 

// Process form data and insert into the database
await contactModel.saveContactMessage(formData.name, formData.email, formData.message);

// Set success message in session
req.session.successMessage = "Contact Form Submitted Successfully! Thank you for contacting us. We will get back to you as soon as possible.";

// Redirect back to the contact page
 res.redirect('/contact');
} catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(404).send('Internal Server Error');
    }
};
