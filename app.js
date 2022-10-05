/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getBulletins } from './fetch-utils.js';
import { renderBulletin } from './bulletin-editor/render-utils.js';

/* Get DOM Elements */
const bulletinList = document.getElementById('bulletin-list');
const errorDisplay = document.getElementById('error-display');
/* State */
let error = null;
let bulletins = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getBulletins();
    error = response.error;
    bulletins = response.data;

    if (error) {
        displayError();
    }
    if (bulletins) {
        displayBulletins();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayBulletins() {
    bulletinList.innerHTML = '';

    for (const bulletin of bulletins) {
        const bulletinEl = renderBulletin(bulletin);
        bulletinList.append(bulletinEl);
    }
}
