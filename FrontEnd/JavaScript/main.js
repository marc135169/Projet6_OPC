import {getWorks} from './data.js'
import {generateGallery} from './DOM/galleryDOM.js'
import {createFilters} from './DOM/filtersDOM.js'

getWorks().then((data) => {
    const { works, categories } = data;
    console.log('Works:', works);
    console.log('Categories:', categories);
    generateGallery(works);
    createFilters(categories);
});
















