

fetch('http://localhost:5678/api/works')
    .then(response => (response.json()))
    .then(response2 => console.table(response2))

fetch('http://localhost:5678/api/categories')
    .then(response => (response.json()))
    .then(response2 => console.table(response2))

// Filtres theme au clic
let filters = document.querySelectorAll(".filters div");

for (let i = 0; i < filters.length; i++) {
    filters[i].classList.add("colorGreen");
    filters[i].addEventListener('click', function () {
        filters[i].classList.replace("colorGreen", "colorWhite");


    });
};


// filtre fonctionnalité

