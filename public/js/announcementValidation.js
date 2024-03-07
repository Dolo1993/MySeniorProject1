// populate the update form
document.querySelectorAll('.toggle-update-form').forEach(button => {
    button.addEventListener('click', () => {
        // Get the corresponding update form
        const updateForm = button.nextElementSibling;
        // Toggle the visibility of the update form
        updateForm.style.display = updateForm.style.display === 'none' ? 'block' : 'none';
    });
});

// validation for titleand content
const createForm = document.getElementById('create-form');
const createTitleInput = document.getElementById('create-title');
const createContentInput = document.getElementById('create-content');
const createTitleError = document.getElementById('create-title-error');
const createContentError = document.getElementById('create-content-error');

createForm.addEventListener('submit', function(event) {
    let isValid = true;
    createTitleError.textContent = '';
    createContentError.textContent = '';

    if (!createTitleInput.value) {
        createTitleError.textContent = 'Title is required';
        isValid = false;
    }

    if (!createContentInput.value) {
        createContentError.textContent = 'Content is required';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();  
    }
});