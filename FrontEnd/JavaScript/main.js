// Get all Works from API
let works;
let categories;

try {
    const responseWorks = await fetch('http://localhost:5678/api/works');    
    works = await responseWorks.json(); 
    //console.log(works); 
    
    const responseCategories = await fetch('http://localhost:5678/api/categories');
    categories = await responseCategories.json();
    //console.log(categories);
}
catch (error) {
    throw new Error(error);
}

//Generate Gallery

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





