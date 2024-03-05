// function to validate create form
function validateCreateForm() {
    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value.trim();
    const time = document.getElementById('time').value.trim();
    const description = document.getElementById('description').value.trim();

    let isValid = true;

    // Clear previous error messages
    document.getElementById('titleError').innerText = '';
    document.getElementById('dateError').innerText = '';
    document.getElementById('timeError').innerText = '';
    document.getElementById('descriptionError').innerText = '';

    // Validate title
    if (title === '') {
        document.getElementById('titleError').innerText = 'Title is required';
        isValid = false;
    }

    // Validate date
    if (date === '') {
        document.getElementById('dateError').innerText = 'Date is required';
        isValid = false;
    }

    // Validate time
    if (time === '') {
        document.getElementById('timeError').innerText = 'Time is required';
        isValid = false;
    }

    // Validate description
    if (description === '') {
        document.getElementById('descriptionError').innerText = 'Description is required';
        isValid = false;
    }

    return isValid;
}
//function to validate edit form
function validateEditForm() {
    const title = document.getElementById('editTitle').value.trim();
    const date = document.getElementById('editDate').value.trim();
    const time = document.getElementById('editTime').value.trim();
    const description = document.getElementById('editDescription').value.trim();

    let isValid = true;

    // Clear previous error messages
    document.getElementById('editTitleError').innerText = '';
    document.getElementById('editDateError').innerText = '';
    document.getElementById('editTimeError').innerText = '';
    document.getElementById('editDescriptionError').innerText = '';

    // Validate title
    if (title === '') {
        document.getElementById('editTitleError').innerText = 'Title is required';
        isValid = false;
    }

    // Validate date
    if (date === '') {
        document.getElementById('editDateError').innerText = 'Date is required';
        isValid = false;
    }

    // Validate time
    if (time === '') {
        document.getElementById('editTimeError').innerText = 'Time is required';
        isValid = false;
    }

    // Validate description
    if (description === '') {
        document.getElementById('editDescriptionError').innerText = 'Description is required';
        isValid = false;
    }

    return isValid;
}
 