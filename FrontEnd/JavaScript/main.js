import {getWorks} from './DATA/getData.js'
import {generateGallery} from './DOM/createGallery.js'
import {createFilters} from './DOM/createFilters.js'
import {createEventListener} from './filters.js'

/**
 * @author Tetart_Marc
 * @return void
 * @description Fetches works and categories from the API, generates the gallery and filters, and adds event listeners.
 */
getWorks().then((data) => {
    const { works, categories } = data;
    console.log('Works:', works);
    console.log('Categories:', categories);
    generateGallery(works);
    createFilters(categories);
    createEventListener(categories, works);
});
















