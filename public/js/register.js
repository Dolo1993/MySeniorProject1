 
function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (username.trim() === "") {
        alert("Username cannot be empty");
        return false;
    }

    if (password.trim() === "") {
        alert("Password cannot be empty");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    return true;
}
