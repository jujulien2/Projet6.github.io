







let divOfProjects = document.createElement('div');
let imageDiv = document.createElement('img');
const gallery = document.querySelector('.gallery');


// fonction qui créer les divs pour en afficher ensuite leurs contenues
let createDiv = function (items) {
    divOfProjects = document.createElement('div');
    imageDiv = document.createElement('img');
    divOfProjects.innerHTML = items.title;
    divOfProjects.classList.add('active');
    divOfProjects.id = items.categoryId;
    imageDiv.src = items.imageUrl;
    gallery.appendChild(divOfProjects);
    divOfProjects.appendChild(imageDiv);
}
// fonction qui créer les divs filtres et ajoute l'événement click
const theFilters = document.querySelector('.filters');
let divOfFilters = document.createElement('div');
let filters = document.createElement('div');
let filtersDiv = function (filtre) {
    let filters = document.createElement('div');
    theFilters.appendChild(filters);
    filters.innerHTML = filtre.name;
    filters.id = filtre.id;
    filters.classList.add("colorFilters");
    filters.classList.add("styleFilters");
    filters.addEventListener('click', () => {

        // changement apparence filtres 
        if (Array.from(filters.classList).includes('colorFilters')) {
            filters.classList.remove('colorFilters')
            filters.classList.add('clickedFilters')
        }
    })

};
let previousElement = null;
theFilters.addEventListener('click', function (e) {

    if (previousElement) {
        previousElement.classList.replace('clickedFilters', 'colorFilters')

    }
    previousElement = e.target

});

// changement apparence filtres 




// Les appels API avec les fonctions des filtres et divs avec forEach
fetch('http://localhost:5678/api/works')
    .then(response => (response.json()))
    .then((data) => {
        data.forEach(createDiv);



        fetch('http://localhost:5678/api/categories')
            .then(response => (response.json()))
            .then((categories) => {

                categories.forEach(filtersDiv);
                const eachFilters = theFilters.children
                for (let eachfilter of eachFilters) {
                    eachfilter.addEventListener('click', function (e) {

                        let idFilter = this.id
                        const galleryChildren = Array.from(gallery.children)
                        for (let imagesOfChildren of galleryChildren) {
                            imagesOfChildren.classList.replace('active', 'inactive');
                            if (imagesOfChildren.id == idFilter || e.target == document.querySelector('.filters div')) {
                                imagesOfChildren.classList.replace('inactive', 'active');
                            }
                        }
                    })
                }
            });
    });
const filterALL = document.querySelector('.all');
filterALL.classList.add("colorFilters");
filterALL.addEventListener('click', () => {
    if (Array.from(filterALL.classList).includes('colorFilters')) {
        filterALL.classList.remove('colorFilters')
        filterALL.classList.add('clickedFilters')
    }
})



let CallApiLogin = function login(event) {
    event.preventDefault();
    const identifiant = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    }
    const chargeUtile = JSON.stringify(identifiant);
    let LoginAPI = fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            "content-Type": "application/Json"
        },
        body: chargeUtile
    })
        .then(response => (response.json()))
        .then((result) => {
            console.log(result)

        })

}


// login 
const formulaireLogin = document.querySelector('.loginForm')
formulaireLogin.addEventListener('submit', CallApiLogin)





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




