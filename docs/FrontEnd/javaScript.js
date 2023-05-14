







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
                const eachFilters = Array.from(theFilters.children)

                for (let eachFilter of eachFilters) {


                    eachFilter.addEventListener('click', function () {
                        let idFilter = this.id;

                        const galleryChildren = Array.from(gallery.children);
                        gallery.innerHTML = '';

                        let newArrayChildren = galleryChildren.filter(childrenFiltered => childrenFiltered.id === idFilter);

                        for (let imageChild of newArrayChildren) {
                            gallery.appendChild(imageChild);
                        }
                    });
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


// modal 
const modalOne = document.querySelector('.modalUnderImg');
let modal = null
const openModal = function (e) {
    e.preventDefault()
    const mymodalOne = document.querySelector('#modal1')
    mymodalOne.style.display = null
    mymodalOne.removeAttribute('aria-hidden')
    modal = mymodalOne
    modal.addEventListener('click', closeModal)
}
const closeModal = function (e) {
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', true)
    modal.removeEventListener('click', closeModal)
}
modalOne.addEventListener('click', openModal)









