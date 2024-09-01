// Get all Works from API
import response from "assert";

let works;
let categories;

try {
    const responseWorks = await fetch('http://localhost:5678/api/works');    
    if (!responseWorks.ok) throw new Error(`Error while fetching works`);    
    works = await responseWorks.json();     
    
    const responseCategories = await fetch('http://localhost:5678/api/categories');
    if (!responseCategories.ok) throw new Error(`Error while fetching categories`);
    categories = await responseCategories.json();
    
}
catch (error) {
    console.error('Error: ', error.message);
}



//Create Filters
const filtersSection = document.querySelector('.filters')

for (let i = 0; i < 4; i++){
    const btnElement = document.createElement('button');
    btnElement.classList.add('filters-btn');
    
    filtersSection.appendChild(btnElement);
}




//Generate Gallery

/**
 * @author Tetart_Marc
 * @param workList a list of elements to display
 * @return void
 * @description This Function take a list of elements and display it in the gallery div
 */
function generateGallery (workList){
    
    const galleryElement = document.querySelector('.gallery');
    
    for (let i = 0; i < works.length; i ++) {
        const item = workList[i];
        console.log(item);
        
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

generateGallery(works);





