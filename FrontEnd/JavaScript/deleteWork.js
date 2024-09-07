import {addDataToModal} from "./DOM/modalData.js";

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
                addDataToModal();
            } else {
                throw new Error('Erreur lors de la suppression');
            }
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
}
