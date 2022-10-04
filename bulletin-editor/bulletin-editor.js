import '../auth/user.js';
import { createBulletin } from '../fetch-utils.js';

const bulletinForm = document.getElementById('bulletin-form');
const errorDisplay = document.getElementById('error-display');

let error = null;

// Events

bulletinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(bulletinForm);

    const bulletin = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        contact: formData.get('contact'),
    };

    const response = await createBulletin(bulletin);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

//  Display functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
