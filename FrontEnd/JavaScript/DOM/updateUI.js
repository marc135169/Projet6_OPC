import {updateModalData} from "./Modal/modalData.js";
import {getWorks} from "../DATA/getData.js";
import {generateGallery} from "./createGallery.js";
import {createEventListener} from "../filters.js";

const loginNavElement = document.querySelector('.site_login');
const loginSectionElement = document.querySelector('.login');
const filtersSectionElement = document.querySelector('.filters');
const mainElement = document.querySelector('main');
const bgModalElement = document.querySelector('.bg_modal');
const xElement = document.querySelector('.exitX');

/**
 * @author Tetart_Marc
 * @return void
 * @description Adds a button to the portfolio H2 element that allows the user to modify the portfolio.
 * Also adds a listener to the button that calls the UpdateModalData function. 
 */
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
        const errorDivElement = document.querySelector('.error-tooltip');
        hideElement(errorDivElement);
        hideElement(mainElement);
        
        displayElement(loginSectionElement);

    } else if (loginNavElement.innerText === 'logout') {
        const divModifButtonElement = document.querySelector('.buttonDivModifier');

        hideElement(loginSectionElement);
        hideElement(divModifButtonElement);

        displayElement(mainElement);
        displayElement(filtersSectionElement);

        changeLoginLogout();

        getWorks().then((data) => {
            const { works, categories } = data;
            generateGallery(works);
            createEventListener(categories, works);
        });
    }
});

/**
 * @author Tetart_Marc
 * @return void
 * @description Changes the login and logout text.
 */
export function changeLoginLogout() {
    if (loginNavElement.innerText === 'login') {
        loginNavElement.innerText = 'logout';
    } else {
        loginNavElement.innerText = 'login';
        sessionStorage.removeItem('authToken');        
    }
}

/**
 * @author Tetart_Marc
 * @param elementToDisplay the element to display
 * @return void
 * @description Displays the elementToDisplay.
 * If the elementToDisplay is not found, it logs an error message.
 */
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

/**
 * @author Tetart_Marc
 * @param elementToHide
 * @return void
 * @description Hides the elementToHide.
 */
export function hideElement(elementToHide) {
    elementToHide.style.display = 'none';
}

/**
 * @author Tetart_Marc
 * @param element
 * @return void
 * @description Adds a click listener to the element. 
 */
function setListener(element) {
    if (element.className === 'buttonDivModifier') {
    }
    element.addEventListener('click', () => {

        updateModalData();        
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
    const backwardElement = document.querySelector('.backward');
    backwardElement.style.display = 'none';
    hideElement(bgModalElement);
    const modalH2Element = document.querySelector('.modal_div_h2');
    modalH2Element.innerText = 'Galerie Photo';
})

