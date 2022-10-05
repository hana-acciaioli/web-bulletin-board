import '../auth/user.js';
import { createBulletin, uploadImage } from '../fetch-utils.js';

const bulletinForm = document.getElementById('bulletin-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

let error = null;

// Events

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/preview.png';
    }
});

bulletinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(bulletinForm);
    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `bulletin_board/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('images', imagePath, imageFile);

    const bulletin = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        contact: formData.get('contact'),
        image_url: url,
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
