import {addDataToModal} from "./modalData.js";

const loginNavElement = document.querySelector('.site_login');
const loginSectionElement = document.querySelector('.login');
const filtersSectionElement = document.querySelector('.filters');
const mainElement = document.querySelector('main');
const bgModalElement = document.querySelector('.bg_modal');
const xElement = document.querySelector('.exitX');


export function addButtonModifier() {

    const portfolioH2Element = document.querySelector('#portfolio h2');

    const modifButton = document.createElement("button");
    const divButton = document.createElement("div");
    const iconElement = document.createElement("i");

    divButton.classList.add("buttonDivModifier");
    modifButton.innerText = 'modifier'
    iconElement.classList.add('fa-regular', 'fa-pen-to-square');


    portfolioH2Element.insertAdjacentElement('afterend', divButton);
    divButton.appendChild(iconElement);
    divButton.appendChild(modifButton);

    setListener(divButton);
}

loginNavElement.addEventListener('click', () => {
    if (loginNavElement.innerText === 'login') {
        hideElement(mainElement);

        displayElement(loginSectionElement);

    } else if (loginNavElement.innerText === 'logout') {
        const divModifButtonElement = document.querySelector('.buttonDivModifier');

        hideElement(loginSectionElement);
        hideElement(divModifButtonElement);

        displayElement(mainElement);
        displayElement(filtersSectionElement);

        changeLoginLogout();
    }
});

export function changeLoginLogout() {
    if (loginNavElement.innerText === 'login') {
        loginNavElement.innerText = 'logout';
    } else {
        loginNavElement.innerText = 'login';
    }
}

export function displayElement(elementToDisplay) {

    switch (elementToDisplay) {
        case bgModalElement:
            elementToDisplay.style.display = 'flex';
            break;
        case loginSectionElement:
            elementToDisplay.style.display = 'flex';
            break;
        case filtersSectionElement:
            elementToDisplay.style.display = 'flex';
            break;
        case mainElement:
            elementToDisplay.style.display = 'block';
            break;
        default:
            console.log('element not found');
    }
}

export function hideElement(elementToHide) {
    elementToHide.style.display = 'none';
}


function setListener(element) {
    if (element.className === 'buttonDivModifier') {
    }
    element.addEventListener('click', () => {

        addDataToModal();        
        displayElement(bgModalElement);
    })
}

//Modal
bgModalElement.addEventListener('click', (event) => {
    if (event.target === bgModalElement) {
        hideElement(bgModalElement);
        const modalH2Element = document.querySelector('.modal_div_h2');
        modalH2Element.innerText = 'Galerie Photo';
        
    }
})

xElement.addEventListener('click', () => {
    hideElement(bgModalElement);
    const modalH2Element = document.querySelector('.modal_div_h2');
    modalH2Element.innerText = 'Galerie Photo';
})

