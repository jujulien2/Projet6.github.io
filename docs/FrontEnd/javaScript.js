


const works = fetch('http://localhost:5678/api/works')
    .then(response => (response.json()))
    .then((data) => {
        console.log(data);
        const gallery = document.querySelector(".gallery");

        for (let i = 0; i < 11; i++) {
            let divGallery = document.createElement("div");
            gallery.appendChild(divGallery);


            for (let galerie of data) {
                console.log(galerie);
                divGallery.innerHTML = galerie.title;
                let pictures = document.createElement("img");
                divGallery.appendChild(pictures);
                pictures.src = galerie.imageUrl;

            }

        }


    })


const categories = fetch('http://localhost:5678/api/categories')
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
