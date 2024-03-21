const membershipModel = require('../models/membershipModel');
const validateMembershipForm = require('../validation/membershipValidation');
const pdfGenerator = require('../utils/pdfGenerator');

// Render the membership page
exports.getMembershipPage = (req, res) => {
    const successMessage = req.session.successMessage;
    delete req.session.successMessage;
    res.render('membership', { successMessage });
};

// Handle form submission
exports.submitMembershipForm = async (req, res) => {
    try {
        const formData = req.body;

        // Check for existing membership
        const existingMembership = await membershipModel.checkExistingMembership(formData);
        if (existingMembership) {
            return res.status(400).render('membership', { errors: ['Membership with the provided information already exists'] });
        }

        // Validate form data
        const errors = validateMembershipForm(formData);
        if (Object.keys(errors).length > 0) {
            return res.status(400).render('membership', { errors: Object.values(errors) });
        }

        // current date
        const currentDate = new Date();

        // Add the date to the form data
        formData.date_sent = currentDate;

        // Process form data and insert into the database
        await membershipModel.createMembership(formData);

        // Render success page
        res.render('success');

    } catch (error) {
        console.error('Error submitting membership form:', error);
        res.status(404).send('404 Server Error');
    }
};

// Render the membership management page 
exports.displayMembershipManagementPage = async (req, res) => {
    try {
        // Fetch all membership submissions from the database
        const membershipSubmissions = await membershipModel.getAllMemberships();
        const totalMemberships = membershipSubmissions.length; // Calculate total number of memberships
        res.render('admin/membership', { membershipSubmissions, totalMemberships }); // Pass totalMemberships to the view
    } catch (error) {
        console.error('Error fetching membership submissions:', error);
        res.status(404).send('404 Server Error');
    }
};


// Search membership submissions by name
exports.searchMembershipByName = async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).send('Name parameter is missing');
        }
        const membershipSubmissions = await membershipModel.searchMembershipByName(name);
        res.render('admin/membership', { membershipSubmissions });
    } catch (error) {
        console.error('Error searching membership submissions by name:', error);
        res.status(404).send('404 Server Error');
    }
};


// View a specific membership submission
exports.viewMembership = async (req, res) => {
    try {
        const submission = await membershipModel.getMembershipById(req.params.id);
        if (!submission) {
            return res.status(404).send('Membership submission not found');
        }
        // Render a view to display the membership submission
        res.render('admin/viewMembership', { submission });
    } catch (error) {
        console.error('Error viewing membership submission:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Download a membership form
exports.downloadMembership = async (req, res) => {
    try {
        const submission = await membershipModel.getMembershipById(req.params.id);
        if (!submission) {
            return res.status(400).send('Membership submission not found');
        }
        // Generate PDF file using utility function
        const pdfFilePath = await pdfGenerator.generatePDF(submission);
        // Send the PDF file for download
        res.download(pdfFilePath, 'membership_form.pdf');
    } catch (error) {
        console.error('Error downloading membership form:', error);
        res.status(404).send('404 Server Error');
    }
};

// Delete a membership submission
exports.deleteMembership = async (req, res) => {
    try {
        const { submissionId, confirmDelete } = req.body;
        if (confirmDelete !== 'true') {
            return res.status(400).send('Confirmation required for deletion');
        }
        // Delete the membership submission from the database
        await membershipModel.deleteMembership(submissionId);
        res.redirect('/admin/membership');
    } catch (error) {
        console.error('Error deleting membership submission:', error);
        res.status(404).send('404 Server Error');
    }
};

module.exports = exports;
