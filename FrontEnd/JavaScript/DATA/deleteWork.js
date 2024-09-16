import {updateModalData} from "../DOM/Modal/modalData.js";
import {getWorks} from "./getData.js";
import {generateGallery} from "../DOM/createGallery.js";
import {createEventListener} from "../filters.js";

/**
 * @author Tetart_Marc
 * @param item
 * @return void
 * @description Deletes a work.
 * It first checks if the token is present in the sessionStorage.
 * If the token is not present, it logs an error message.
 * Then, it sends a DELETE request to the API to delete the work.
 */
export function deleteWork(item) {
    const token = sessionStorage.getItem('authToken');
    let itemID = +item.id;
    console.log(itemID);

    //demande au mentor s'il y a vraiment l'utilité
    if (!token) {
        console.error('Token non trouvé');
        return;
    }

    
    fetch(`http://localhost:5678/api/works/${itemID}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "accept": "*/*"
        }
    })
        .then(response => {
            if (response.ok) {
                console.log(`Élément ${itemID} supprimé avec succès.`);                
                updateModalData();
                getWorks().then((data) => {
                    const { works, categories } = data;
                    generateGallery(works);                    
                    createEventListener(categories, works);
                });
                
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
}
