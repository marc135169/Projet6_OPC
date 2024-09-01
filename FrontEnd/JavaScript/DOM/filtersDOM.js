/**
 * @author Tetart_Marc
 * @param categories all categories fetch from API
 * @return void
 * @description create all filters buttons
 */
export function createFilters(categories){
    const filtersSection = document.querySelector('.filters')

    const btnElement = document.createElement('button');
    btnElement.classList.add('filters-btn');
    btnElement.innerText = 'Tous';
    filtersSection.appendChild(btnElement);

    categories.forEach(category => {
        const btnElement = document.createElement('button');
        btnElement.classList.add('filters-btn');
        btnElement.innerText = category.name;
        filtersSection.appendChild(btnElement);
    });
}