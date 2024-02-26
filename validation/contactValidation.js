// Function to validate contact form data
function validateContactForm(formData) {
    const errors = {};

    // Validation of name
    if (!formData.name) {
        errors.name = 'Name is required';
    }

    // Validation of email
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
        errors.email = 'Invalid email format';
    }

    // Validation of message
    if (!formData.message) {
        errors.message = 'Message is required';
    }

    return errors;
}

// function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = validateContactForm;
