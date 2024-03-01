const membershipModel = require('../models/membershipModel');
const contactModel = require('../models/contactModel');

// function to render the SUP Management
exports.getSupManagementPage = async (req, res) => {
    try {
        // Fetch membership form submissions
        const membershipSubmissions = await membershipModel.getAllMemberships();
        // Fetch contact messages
        const contactMessages = await contactModel.getAllContactMessages();
        
        res.render('admin/supManagement', { membershipSubmissions, contactMessages }); // Corrected file name and path
    } catch (error) {
        console.error('Error fetching SUP Management data:', error);
        res.status(404).send('Internal Server Error');
    }
};


// function to delete membership submission
exports.deleteMembershipSubmission = async (req, res) => {
    const { submissionId } = req.body;
    try {
        // Delete the membership submission
        await membershipModel.deleteMembership(submissionId);
        res.redirect('/admin/SUPManagement');
    } catch (error) {
        console.error('Error deleting membership submission:', error);
        res.status(404).send('Internal Server Error');
    }
};

// function to delete contact message
exports.deleteContactMessage = async (req, res) => {
    const { messageId } = req.body;
    try {
        // Delete the contact message
        await contactModel.deleteContactMessage(messageId);
        res.redirect('/admin/supManagement');
    } catch (error) {
        console.error('Error deleting contact message:', error);
        res.status(404).send('Internal Server Error');
    }
};
