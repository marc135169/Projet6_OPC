import {addButtonModifier} from "./DOM/updateUI.js";
import {changeLoginLogout} from "./DOM/updateUI.js";
import {displayElement} from "./DOM/updateUI.js";
import {hideElement} from "./DOM/updateUI.js";

const loginSectionElement = document.querySelector('.login');
const filtersSectionElement = document.querySelector('.filters');
const mainElement = document.querySelector('main');


const loginDivElement = document.querySelector('form');
const errorTooltip = document.createElement('div');
errorTooltip.classList.add('error-tooltip');
errorTooltip.style.display = 'none';
errorTooltip.style.position = 'absolute';
errorTooltip.style.color = 'red';
loginDivElement.appendChild(errorTooltip);


document.querySelector('.login').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('password').value;

        // a demander au mentor
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);             
            sessionStorage.setItem('authToken', data.token);
            
            displayElement(mainElement);
            hideElement(loginSectionElement);
            hideElement(filtersSectionElement);            
            addButtonModifier();
            changeLoginLogout();  
            
        } else {
            console.error('connexion error');
            errorTooltip.textContent = 'Erreur de serveur / Login incorrect.';
            errorTooltip.style.display = 'block';
        }    
    });

