// Function to validate membership form data
function validateMembershipForm(formData) {
    const errors = [];

    // Validation of name
    if (!formData.fullname) {
        errors.push('Full name is required');
    }

    // Validation of email
    if (!formData.email) {
        errors.push('Email is required');
    } else if (!isValidEmail(formData.email)) {
        errors.push('Invalid email format');
    }

    // Validation of phone number
    if (!formData.phone) {
        errors.push('Phone number is required');
    } else if (!isValidPhoneNumber(formData.phone)) {
        errors.push('Invalid phone number format');
    }

    // Validation of date of birth
    if (!formData.dob) {
        errors.push('Date of birth is required');
    } else if (!isValidDate(formData.dob)) {
        errors.push('Invalid date format');
    }

    // Validation of universities
    if (!formData.university) {
        errors.push('University is required');
    }

    return errors;
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate phone number format
function isValidPhoneNumber(phone) {

    const phoneRegex = /^\d{10}$/;  
    return phoneRegex.test(phone);
}

// Function to validate date format (YYYY-MM-DD)
function isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
    return dateRegex.test(date);
}

module.exports = validateMembershipForm;
