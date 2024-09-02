

export function addButtonModifier(){    
    
    const portfolioH2Element = document.querySelector('#portfolio h2');
    
    const modifButton = document.createElement("button");
    const divButton = document.createElement("div");
    const iconElement = document.createElement("i");

    modifButton.innerText = 'modifier'
    iconElement.classList.add('fa-regular', 'fa-pen-to-square');
    

    portfolioH2Element.insertAdjacentElement('afterend', divButton);
    divButton.appendChild(iconElement);
    divButton.appendChild(modifButton);
    
}
