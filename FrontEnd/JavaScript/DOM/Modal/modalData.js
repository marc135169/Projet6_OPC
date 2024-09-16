import {getWorks} from "../../DATA/getData.js";
import {deleteWork} from "../../DATA/deleteWork.js";
import {createFigure} from "../createGallery.js";
import {addWorksToAPI} from "../../DATA/addWork.js";

/**
 * @author Tetart_Marc
 * @return void
 * @description Fetches works from the API and generates the library core.
 */
export function updateModalData() {

    getWorks().then((data) => {
        const {works, categories} = data;
        generateLibraryCore(works, categories);
    });
}

/**
 * @description Creates a figure element with an image, figcaption, and a delete button (for modal use).
 * @param {Object} item - The work item containing image URL and title.
 * @param {Function} deleteCallback - A callback function for the delete button.
 * @returns {HTMLElement} - A figure element containing the image, caption, and a delete button.
 */
function createFigureWithDelete(item, deleteCallback) {
    const figureElement = createFigure(item);

    // Création du bouton de suppression
    const divTrashElement = document.createElement('div');
    divTrashElement.classList.add('divTrash');

    const btnTrashElement = document.createElement('button');
    const iTrashElement = document.createElement('i');
    iTrashElement.classList.add('fa-solid', 'fa-trash-can');

    divTrashElement.appendChild(btnTrashElement);
    divTrashElement.appendChild(iTrashElement);

    figureElement.appendChild(divTrashElement);

    // DELETE work
    btnTrashElement.addEventListener('click', () => deleteCallback(item));

    return figureElement;
}


/**
 * @author Tetart_Marc
 * @param {Array} works - All works fetched from API.
 * @param {Array} categories - All categories fetched from API.
 * @return void
 * @description Generates the library core in the modal.
 */
function generateLibraryCore(works, categories) {
    const coreModalElement = document.querySelector('.coreModal');

    const libraryElement = document.createElement('div');
    const buttonAddWorksElement = document.createElement('button');

    coreModalElement.innerHTML = '';

    libraryElement.classList.add('library');
    buttonAddWorksElement.classList.add('addWork');
    buttonAddWorksElement.innerText = 'Ajouter une photo';

    coreModalElement.append(libraryElement);
    coreModalElement.append(buttonAddWorksElement);

    buttonAddWorksElement.addEventListener('click', () => {
        changeModalToAddWork(coreModalElement, categories);
    });

    works.forEach(item => {
        const figureElement = createFigureWithDelete(item, deleteWork);
        libraryElement.appendChild(figureElement);
    });
}

/**
 * @author Tetart_Marc
 * @param {HTMLElement} coreModalElement - The core modal element.
 * @param {Array} categories - All categories fetched from API.
 * @return void
 * @description Generates the add work modal with a form and applies all necessary classes.
 */
function changeModalToAddWork(coreModalElement, categories) {
    coreModalElement.innerHTML = ''; // Clear the modal content

    // Crée un formulaire
    const formElement = document.createElement('form');
    formElement.setAttribute('id', 'addWorkForm');
    formElement.classList.add('addWorkForm'); // Ajoute la classe au formulaire

    // Titre du formulaire
    const modalDivH2Element = document.querySelector('.modal_div_h2');
    modalDivH2Element.innerText = 'Ajout photo';

    const backwardElement = document.querySelector('.backward');
    backwardElement.style.display = 'block';
    backwardElement.addEventListener('click', () => {
        updateModalData();
    });

    const divCoreAddElement = document.createElement('div');
    divCoreAddElement.classList.add('divCoreAddPicture');

    const divAddPictureElement = createPictureInput();
    const divTitleElement = createTitleGroup('Titre', 'title', 'inputTitle', 'text'); // Champ titre
    const divCategoryElement = createCategoryGroup(categories);


    divCoreAddElement.append(divAddPictureElement, divTitleElement, divCategoryElement);


    const validateButton = document.createElement('button');
    validateButton.setAttribute('type', 'submit');
    validateButton.setAttribute('id', 'validateButton');
    validateButton.classList.add('btn_validate');
    validateButton.innerText = 'Valider';
    validateButton.disabled = true;


    formElement.append(divCoreAddElement, validateButton);
    coreModalElement.appendChild(formElement);


    let selectedFile = null;
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        if (selectedFile && title && category) {
            addWorksToAPI(title, category, selectedFile);
        }
    });


    const inputAddPictureElement = document.getElementById('imageInput');
    inputAddPictureElement.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            selectedFile = file;
            displayAddedPhoto(file);
        }
        checkFormValidity();
    });

    document.getElementById('title').addEventListener('input', checkFormValidity);
    document.getElementById('category').addEventListener('change', checkFormValidity);
}

/**
 * @author Tetart_Marc
 * @param {String} labelText - The label text.
 * @param {String} inputId - The input ID.
 * @param {String} inputClass - The input class.
 * @param {String} inputType - The input type.
 * @return {HTMLElement} - The title group element.
 * @description Creates a text field with a label and appropriate CSS classes.
 */
function createTitleGroup(labelText, inputId, inputClass, inputType) {
    const divElement = document.createElement('div');
    divElement.classList.add('divTitle');

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', inputId);
    labelElement.innerText = labelText;

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', inputType);
    inputElement.setAttribute('id', inputId);
    inputElement.setAttribute('class', inputClass);
    inputElement.required = true;

    const pErrorElement = document.createElement('p'); // Ajout d'un élément pour afficher les erreurs
    pErrorElement.setAttribute('id', 'titleError');
    pErrorElement.style.color = 'red';
    pErrorElement.style.marginTop = '5px';
    pErrorElement.style.fontSize = '12px';
    pErrorElement.style.display = 'none';

    divElement.append(labelElement, inputElement, pErrorElement);
    return divElement;
}

/**
 * @author Tetart_Marc
 * @param {Array} categories - All categories fetched from API.
 * @return {HTMLElement} - The category group element.
 * @description Creates the category selection field with the appropriate CSS classes.
 */
function createCategoryGroup(categories) {
    const divElement = document.createElement('div');
    divElement.classList.add('divCat');

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', 'category');
    labelElement.innerText = 'Catégorie';

    const selectElement = document.createElement('select');
    selectElement.setAttribute('id', 'category');
    selectElement.setAttribute('class', 'inputCat');
    selectElement.required = true;

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.name;
        selectElement.appendChild(option);
    });

    divElement.append(labelElement, selectElement);
    return divElement;
}

/**
 * @author Tetart_Marc
 * @return {HTMLElement} - The picture input element.
 * @description Creates the photo addition field with the appropriate CSS classes.
 */
function createPictureInput() {
    const divAddPictureElement = document.createElement('div');
    divAddPictureElement.classList.add('divAddPicture');

    const divIconPictureElement = document.createElement('div');
    divIconPictureElement.classList.add('divAddPicture_div');

    const iElement = document.createElement('i');
    iElement.classList.add('div_i', 'fa-regular', 'fa-image');

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', 'imageInput');
    labelElement.classList.add('btn_add');
    labelElement.innerText = '+ Ajouter photo';

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'file');
    inputElement.setAttribute('id', 'imageInput');
    inputElement.setAttribute('accept', 'image/*');
    inputElement.required = true;

    const pElement = document.createElement('p');
    pElement.innerText = 'jpg, png : 4mo max';


    divIconPictureElement.appendChild(iElement);
    divAddPictureElement.append(divIconPictureElement, labelElement, inputElement, pElement);

    return divAddPictureElement;
}

/**
 * @author Tetart_Marc
 * @param {File} file - The selected file.
 * @return void
 * @description Displays the added photo with the appropriate classes.
 */
function displayAddedPhoto(file) {
    const divAddPictureElement = document.querySelector('.divAddPicture');
    divAddPictureElement.innerHTML = '';

    const divAddedImgElement = document.createElement('div');
    divAddedImgElement.classList.add('divAddedImg');

    const imgElement = document.createElement('img');
    const reader = new FileReader();

    reader.onload = function (e) {
        imgElement.src = e.target.result;
        imgElement.alt = file.name;
    };

    reader.readAsDataURL(file);
    divAddedImgElement.appendChild(imgElement);
    divAddPictureElement.appendChild(divAddedImgElement);
}

/**
 * @author Tetart_Marc
 * @param {File} selectedFile - The selected file.
 * @return void
 */
function checkFormValidity() {
    const titleFilled = document.getElementById('title').value.trim();
    const categoryFilled = document.getElementById('category').value.trim() !== '';
    const imgFilled = document.querySelector('.divAddPicture img') !== null;

    const inputTitleElement = document.getElementById('title');

     const titleRegex = /^[a-zA-Z0-9 \-]{3,20}$/;
    /*const titleRegex = new RegExp('^[a-zA-Z0-9 \\-]{3,50}$');*/


    const titleValid = titleRegex.test(titleFilled);

    const titleError = document.getElementById('titleError');
    
    if (!titleValid && titleFilled.length > 0) {
        titleError.innerText = '3 characters minimum, 20 characters maximum, no special characters except -';
        titleError.style.display = 'block';
        inputTitleElement.style.border = '1px solid red';        
    } else {
        titleError.style.display = 'none';
        inputTitleElement.style.border = 'none';
    }
    
    const validateButton = document.getElementById('validateButton');
    if (titleValid && categoryFilled && imgFilled) {
        validateButton.disabled = false;
        validateButton.classList.add('active');
    } else {
        validateButton.disabled = true;
        validateButton.classList.remove('active');
    }
}