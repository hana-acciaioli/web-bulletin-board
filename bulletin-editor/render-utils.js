export function renderBulletin(bulletin) {
    const li = document.createElement('li');

    const h3 = document.createElement('h3');
    h3.textContent = bulletin.title;

    const categoryEl = document.createElement('span');
    categoryEl.classList.add('category');
    categoryEl.textContent = bulletin.category;

    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = bulletin.description;

    const contactEl = document.createElement('p');
    contactEl.textContent = bulletin.contact;

    li.append(h3, categoryEl, descriptionEl, contactEl);

    return li;
}
