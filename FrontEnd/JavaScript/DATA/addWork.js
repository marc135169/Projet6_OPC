import {getWorks} from "./getData.js";
import {generateGallery} from "../DOM/createGallery.js";
import {hideElement} from "../DOM/updateUI.js";

/**
 * @author Tetart_Marc *
 * @return void
 * @param {String} title - The title of the work.
 * @param {String} categoryId - The id of the category.
 * @param {File} selectedFile - The selected file.
 * @description Sends a POST request to the API to add a work.
 * It first checks if the token is present in the sessionStorage. 
 * If the token is not present, it logs an error message and returns.
 * Then, it sends a POST request to the API to add a work.
 */
export function addWorksToAPI(title, categoryId, selectedFile) {   
    

    if (!title || !selectedFile || !categoryId) {
        alert("Veuillez remplir tous les champs.");
        return;
    }
    
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        console.error('Token non trouvé');
        return;
    }

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
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi');                
            }
            return response.json();
        })
        .then(data => {
            console.log("Succès :", data);
            const bgModalElement = document.querySelector('.bg_modal');            
            getWorks().then((data) => {
                const {works, categories} = data;
                generateGallery(works);
                hideElement(bgModalElement);
            });
        })
        .catch(error => {
            console.error("Erreur :", error);
            alert('Une erreur est survenue lors de l\'envoi du fichier.');
        });
}