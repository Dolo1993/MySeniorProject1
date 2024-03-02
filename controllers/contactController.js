const contactModel = require('../models/contactModel');
const validateContactForm = require('../validation/contactValidation');

// Function to render the contact page
exports.getContactPage = (req, res) => {
    const successMessage = req.session.successMessage;
    req.session.successMessage = null;
    const errors = req.session.errors;
    res.render('contact', { errors, successMessage });
};

// Function to render the contact messages page
exports.displayContactMessagesPage = async (req, res) => {
    try {
        // Fetch all contact messages from the database in descending order
        const contactMessages = await contactModel.getAllContactMessagesDesc();
        res.render('admin/contact-messages', { contactMessages });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to search contact messages by name
exports.searchContactMessagesByName = async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).send('Name parameter is missing');
        }

        // Search contact messages by name
        const contactMessages = await contactModel.searchContactMessagesByName(name);
        res.render('admin/contact-messages', { contactMessages });
    } catch (error) {
        console.error('Error searching contact messages by name:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to handle form submission
exports.submitContactForm = async (req, res) => {
    try {
        const formData = req.body;

        // Check for existing contact message 
        const existingContactMessage = await contactModel.findExistingContactMessage(formData.name, formData.email);
        if (existingContactMessage) {
            return res.status(400).render('contact', { errors: ['A contact message with the provided name and email already exists'], formData });
        }

        // Validate form data
        const errors = validateContactForm(formData);
        if (Object.keys(errors).length > 0) {
            return res.render('contact', { errors, formData });
        }

        // Process form data and insert into the database
        await contactModel.saveContactMessage(formData.name, formData.email, formData.message);

        // Set success message in session
        req.session.successMessage = "Contact Form Submitted Successfully! Thank you for contacting us. We will get back to you as soon as possible.";

        res.redirect('/contact');
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to render the contact messages page
exports.displayContactMessagesPage = async (req, res) => {
    try {
        // Fetch all contact messages from the database
        const contactMessages = await contactModel.getAllContactMessages();
        res.render('admin/contact-messages', { contactMessages });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to delete a contact message
exports.deleteContactMessage = async (req, res) => {
    try {
        const messageId = req.body.messageId;

        // Retrieve confirmation status
        const confirmDelete = req.body.confirmDelete;
        if (confirmDelete !== 'true') {
            return res.redirect('/admin/contact-messages');
        }

        // Delete the contact message from the database
        await contactModel.deleteContactMessage(messageId);
        res.redirect('/admin/contact-messages');
    } catch (error) {
        console.error('Error deleting contact message:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = exports;
