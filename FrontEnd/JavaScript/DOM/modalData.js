import {getWorks} from "../data.js";
import {deleteWork} from "../deleteWork.js";



export function addDataToModal(){
    
    getWorks().then((data) => {
        const { works, categories } = data;
        generateLibraryCore(works, categories);
    });    
}



function generateLibraryCore(works, categories){
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
        updateToAddWork(coreModalElement, categories);
    })
    
    for (let i = 0; i < works.length; i ++) {
        const item = works[i];
       
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const divTrashElement = document.createElement('div');
        const btnTrashElement = document.createElement('button');
        const iTrashElement = document.createElement('i');

        imgElement.src = item.imageUrl;
        imgElement.alt = item.title;        
        
        divTrashElement.classList.add('divTrash');
        iTrashElement.classList.add('fa-solid', 'fa-trash-can')
        

        
        buttonAddWorksElement.innerText = 'Ajouter une photo';

        
        libraryElement.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(divTrashElement);
        divTrashElement.appendChild(btnTrashElement);
        divTrashElement.appendChild(iTrashElement);
        
        //DELETE WORK
        btnTrashElement.addEventListener('click', e => {
            deleteWork(item);
        })
    }    
}

function updateToAddWork(coreModalElement, categories){
    coreModalElement.innerHTML = '';
    
    const modalDivH2Element = document.querySelector('.modal_div_h2');
    const backwardElement = document.querySelector('.backward');    
    modalDivH2Element.innerText = 'Ajout photo';
    backwardElement.style.display = 'block';
    
    const divCoreAddElement = document.createElement('div');
    const divAddPictureElement = document.createElement('div');
    const divIconPictureElement = document.createElement('div');
    const iElement = document.createElement('i');    
    
    
    const buttonAddPictureElement = document.createElement('button');    
    
    const pElement = document.createElement('p');
    
    const divTitleElement = document.createElement('div');
    const pTitleElement = document.createElement('p');
    const inputTitleElement = document.createElement('input');
    
    const divCategoryElement = document.createElement('div');
    const pCategoryElement = document.createElement('p');
    const inputCategoryElement = document.createElement('select');  
    
    const validateButton = document.createElement('button');

    const inputAddPictureElement = document.createElement('input');
    inputAddPictureElement.type = 'file';
    inputAddPictureElement.accept = 'image/*';
    inputAddPictureElement.style.display = 'none';

    coreModalElement.append(divCoreAddElement);
    divCoreAddElement.append(divAddPictureElement);
    divAddPictureElement.appendChild(divIconPictureElement);
    divIconPictureElement.appendChild(iElement);
    divAddPictureElement.appendChild(buttonAddPictureElement);
    divAddPictureElement.appendChild(inputAddPictureElement);
    divAddPictureElement.appendChild(pElement);

    divCoreAddElement.append(divTitleElement);
    divTitleElement.appendChild(pTitleElement);
    divTitleElement.appendChild(inputTitleElement);

    divCoreAddElement.append(divCategoryElement);
    divCategoryElement.appendChild(pCategoryElement);
    divCategoryElement.appendChild(inputCategoryElement);

    coreModalElement.appendChild(validateButton)

    divAddPictureElement.classList.add('divAddPicture');
    divCoreAddElement.classList.add('divCoreAddPicture');
    divIconPictureElement.classList.add('divAddPicture_div');
    iElement.classList.add('div_i', 'fa-regular', 'fa-image');
    buttonAddPictureElement.classList.add('btn_add');
    

    divTitleElement.classList.add('divTitle');
    pTitleElement.classList.add('pTitle');
    inputTitleElement.classList.add('inputTitle');

    divCategoryElement.classList.add('divCat');
    pCategoryElement.classList.add('pCat');
    inputCategoryElement.classList.add('inputCat');
    
    buttonAddPictureElement.innerText = '+ Ajouter photo';   
    
    
    pElement.innerText = 'jpg, png : 4mo max';
    pTitleElement.innerText = 'Titre';
    pCategoryElement.innerText = 'Catégorie';
    

    validateButton.classList.add('btn_validate');
    validateButton.innerText = 'Valider'
    
    backwardElement.addEventListener('click', () => {
        addDataToModal();
    })

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.name;
        inputCategoryElement.appendChild(option);
    });

    buttonAddPictureElement.addEventListener('click', () => {
        inputAddPictureElement.click();
    });

    
    let selectedFile = null;
    inputAddPictureElement.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            selectedFile = file;
            displayAddedPhoto(file);
        } else {
            buttonAddPictureElement.innerText = '+ Ajouter photo';
        }
    });

    validateButton.addEventListener('click', () => {
        const title = inputTitleElement.value.trim();
        const categoryId = inputCategoryElement.value;

        if (!title || !selectedFile || !categoryId) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        const token = sessionStorage.getItem('authToken');        
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', selectedFile);
        formData.append('category', categoryId);

        
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            })
            .then(data => {
                console.log("Succès :", data);
                addDataToModal();
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
    });   
}


function displayAddedPhoto(file) {
    const divAddPictureElement = document.querySelector('.divAddPicture');
    divAddPictureElement.innerHTML = "";
    
    const divAddedImgElement = document.createElement('div');
    divAddedImgElement.classList.add('divAddedImg');
    divAddPictureElement.appendChild(divAddedImgElement);
    
    const imgElement = document.createElement('img');

    const reader = new FileReader();
    reader.onload = function(e) {
        imgElement.src = e.target.result;
        imgElement.alt = file.name;        
    };

    reader.readAsDataURL(file);    
    
    divAddedImgElement.appendChild(imgElement);

}
