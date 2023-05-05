



// fonction qui créer les divs pour en afficher ensuite leurs contenues



let createDiv = function (items) {
    const divOfProjects = document.createElement('div');
    const imageDiv = document.createElement('img');
    const gallery = document.querySelector('.gallery');
    divOfProjects.innerHTML = items.title;
    imageDiv.src = items.imageUrl;
    gallery.appendChild(divOfProjects);
    divOfProjects.appendChild(imageDiv);
}
// fonction qui créer les divs filtres et ajoute l'événement click

let filtersDiv = function (filtre) {
    const divOfFilters = document.createElement('div');
    const theFilters = document.querySelector('.filters');
    theFilters.appendChild(divOfFilters);
    divOfFilters.innerHTML = filtre.name;
    divOfFilters.classList.add('styleFilters');
    divOfFilters.classList.add("colorFilters");

};



// Les appels API avec les fonctions des filtres et divs avec forEach
fetch('http://localhost:5678/api/works')
    .then(response => (response.json()))
    .then((data) => {
        data.forEach(createDiv);



        fetch('http://localhost:5678/api/categories')
            .then(response => (response.json()))
            .then((categories) => {
                categories.forEach(filtersDiv);

            });

    });




// login 
function loginEventListenner() {
    const formulaireLogin = document.querySelector('.loginForm')
    formulaireLogin.addEventListener('submit', function (event) {
        event.preventDefault();
        // Création de l'objet du nouvel avis.
        const identifiant = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        }
        const chargeutile = JSON.stringify(identifiant);
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': "application/Json",
                "content-Type": "application/Json"
            },
            body: chargeutile
        });
    })
}










// affiche page login cliquant sur 'login' : 
const login = document.querySelector("#logButton");
const loginPage = document.querySelector('.loginPage');
login.addEventListener('click', function () {
    loginPage.classList.replace('hidden', 'show')

})
// back à l'accueil sur le boutons 'projets' : 
const project = document.querySelector('#project');
project.addEventListener('click', function () {
    loginPage.classList.replace('show', 'hidden')
})





// divOfFilters.addEventListener('click', function changeApparence(onclick) {

//     divOfFilters.classList.add("onclickClicked");
//     divOfFilters.classList.remove("colorFilters");

//     onclick.classList.remove("onclickClicked");
//     onclick.classList.add("colorFilters");

// })