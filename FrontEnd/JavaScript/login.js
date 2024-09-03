import {addButtonModifier} from "./DOM/modifButtonDOM.js";

const loginNavElement = document.querySelector('.site_login');
const loginSectionElement = document.querySelector('.login');
const filtersSectionElement = document.querySelector('.filters');
const mainElement = document.querySelector('main');


loginNavElement.addEventListener('click', () => {  
    console.log(loginNavElement.innerText);
    if (loginNavElement.innerText === 'login') {
        loginNavElement.innerText = 'logout'
        mainElement.style.display = 'none';
        loginSectionElement.style.display = 'flex';
    }else if(loginNavElement.innerText === 'logout') {
        loginNavElement.innerText = 'login'
        loginSectionElement.style.display = 'none';        
        mainElement.style.display = 'block';
        filtersSectionElement.style.display = 'flex';
        changeLoginLogout();
    }
});

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
            mainElement.style.display = 'block';
            loginSectionElement.style.display = 'none';
            filtersSectionElement.style.display = 'none';
            addButtonModifier();
            
        } else {
            console.error('connexion error');           
        }    
    });


function changeLoginLogout(){
    const divButtonElement = document.querySelector('.buttonDivModifier');
    divButtonElement.innerHTML = '';
}