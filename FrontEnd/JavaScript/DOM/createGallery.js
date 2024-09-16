/**
 * @description Creates a figure element with an image and figcaption inside.
 * @param {Object} item - The work item containing image URL and title.
 * @returns {HTMLElement} - A figure element containing the image and caption.
 */
export function createFigure(item) {
    const figureElement = document.createElement('figure');

    const imgElement = document.createElement('img');
    imgElement.src = item.imageUrl;
    imgElement.alt = item.title;

    const figcaptionElement = document.createElement('figcaption');
    figcaptionElement.innerText = item.title;

    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);

    return figureElement;
}

/**
 * @author Tetart_Marc
 * @description This function takes a list of works and displays them in the gallery.
 * @param {Array} workList - The list of work items to display.
 * @returns {void}
 */
export function generateGallery(workList) {
    const galleryElement = document.querySelector('.gallery');
    galleryElement.innerHTML = '';

    workList.forEach(item => {
        const figureElement = createFigure(item);
        galleryElement.appendChild(figureElement);
    });
}
