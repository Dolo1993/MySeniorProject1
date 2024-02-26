const membershipModel = require('../models/membershipModel');
const validateMembershipForm = require('../validation/membershipValidation');


//function to render the membership page
exports.getMembershipPage = (req, res) => {
    res.render('membership');
};

// function to handle form submission
exports.submitMembershipForm = async (req, res) => {
    try {
        const formData = req.body;
        // Validate form data
        const errors = validateMembershipForm(formData);
        if (Object.keys(errors).length > 0) {
            return res.status(404).json({ errors });
        }
        // Process form data and insert into the database
        await membershipModel.createMembership(formData);
        res.send('Membership form submitted successfully.');
    } catch (error) {
        console.error('Error submitting membership form:', error);
        res.status(404).send('Internal Server Error');
    }
}; 

 

module.exports = exports;  
