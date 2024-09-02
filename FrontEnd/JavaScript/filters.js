import {generateGallery} from './DOM/galleryDOM.js'

/**
 * @author Tetart_Marc
 * @description create event listener for each filter's button
 */
export function createEventListener(categories, works)  {    
    const allFilterBtn = document.querySelectorAll('.filters-btn');
    console.log('Number of filter\'s buttons:', allFilterBtn.length);
    allFilterBtn.forEach(filterBtn => {
        filterBtn.addEventListener('click', () => {
            let categoryChooseID = filterBtn.id;           
            console.log(filterBtn.id);
            filterByCategory(categoryChooseID,categories, works);
        });
    });
}

/**
 * @author Tetart_Marc
 * @param categoryChooseID the ID of button selected, that is a !string!
 * @param categories all my categories directly from fetch API
 * @param works all my Works directly from fetch API
 * @description Filter works with categorie and Regenerate the gallery
 */
function filterByCategory(categoryChooseID, categories, works) {
    
    let filteredWorks;
    
    //change string to int for compare correctly, j'ai m'y du temps a comprendre
    const categoryID = parseInt(categoryChooseID, 10);
    
    if (categoryChooseID === "") {        
        filteredWorks = works;
    } else {        
        filteredWorks = works.filter(work => work.categoryId === categoryID);
    }

    console.log('Filtered works:', filteredWorks);
    generateGallery(filteredWorks);
}