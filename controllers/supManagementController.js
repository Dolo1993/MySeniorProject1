
const membershipModel = require('../models/membershipModel');
const contactModel = require('../models/contactModel');

// Render the SUP Management page
exports.getSupManagementPage = async (req, res) => {
    try {
        // Fetch membership form submissions
        const membershipSubmissions = await membershipModel.getAllMemberships();
        // Fetch contact messages
        const contactMessages = await contactModel.getAllContactMessages();
        
        res.render('admin/supManagement', { membershipSubmissions, contactMessages }); 
    } catch (error) {
        console.error('Error fetching SUP Management data:', error);
        res.status(404).send('404 Server Error');
    }
};

// Delete membership submission
exports.deleteMembershipSubmission = async (req, res) => {
    const { submissionId } = req.body;
    try {
        await membershipModel.deleteMembership(submissionId);
        res.redirect('/admin/SUPManagement');
    } catch (error) {
        console.error('Error deleting membership submission:', error);
        res.status(404).send('404 Server Error');
    }
};

// Delete contact message
exports.deleteContactMessage = async (req, res) => {
    const { messageId } = req.body;
    try {
        await contactModel.deleteContactMessage(messageId);
        res.redirect('/admin/supManagement');
    } catch (error) {
        console.error('Error deleting contact message:', error);
        res.status(404).send('404 Server Error');
    }
};

// Handle logout request
exports.logout = (req, res) => {
    req.session.destroy();  
    res.clearCookie('auth_token');  
    res.redirect('/admin/login'); 
};
