/**
 * @author Tetart_Marc
 * @param workList a list of elements to display
 * @return void
 * @description This Function take a list of elements and display it in the gallery div
 */
export function generateGallery (workList){

    const galleryElement = document.querySelector('.gallery');
    galleryElement.innerHTML = '';

    for (let i = 0; i < workList.length; i ++) {
        const item = workList[i];

        const figureElement = document.createElement('figure');

        const imgElement = document.createElement('img');
        imgElement.src = item.imageUrl;
        imgElement.alt = item.title;

        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.innerText = item.title;

        galleryElement.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
    }
}
