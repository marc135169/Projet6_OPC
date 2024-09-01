/**
 * @author Tetart_Marc
 * @return {Promise<{works: Array, categories: Array}>}
 * @description Fetch all elements from the API
 */
export async function getWorks() {
    let works;
    let categories;

    try {
        const responseWorks = await fetch('http://localhost:5678/api/works');
        if (!responseWorks.ok) throw new Error(`Error while fetching works`);
        works = await responseWorks.json();

        const responseCategories = await fetch('http://localhost:5678/api/categories');
        if (!responseCategories.ok) console.error(`Error while fetching categories`);
        categories = await responseCategories.json();

        return {works, categories};
    }
    catch (error) {
        console.error('Error: ', error.message);
    }
}