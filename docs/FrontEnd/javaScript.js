


fetch('http://localhost:5678/api/works')
    .then(response => (response.json()))
    // les datas sont appelées donc on peut en faire quelque chose de ces datas ( datas = infos récupérer depuis l'API), (ci-dessous) ::
    .then((data) => {
        console.table(data);
        const gallery = document.querySelector(".gallery");
        // création plusieurs DIV

        for (let i = 0; i < 11; i++) {
            let divGallery = document.createElement("div");
            gallery.appendChild(divGallery);

            // réunir les infos du data dans la let galerie, puis ajouter le contenu dans les DIV
            for (let galerie of data) {
                console.log(galerie);
                divGallery.innerHTML = galerie.title;
                let pictures = document.createElement("img");
                divGallery.appendChild(pictures);
                pictures.src = galerie.imageUrl;
            }
        }
    });


fetch('http://localhost:5678/api/categories')
    .then(response => (response.json()))
    .then(response2 => console.table(response2))




// Filtres changement background et couleur au clic

// onclick = au moment du click il prend en compte les onclick en dernier de la liste ci-dessous 
function changeApparence(onclick) {
    let onclicks = document.querySelectorAll(".filtersColor ");
    // on les selectionnent tous puis grâce au :  remove("onClickClicked")  automatiquement à chaque fois qu'on clique autre part
    //  initialement la classe se retire. Et ensuite, bien  mettre la classe de couleur de base sans clique des filtres : ("colorFilters")
    for (let i = 0; i < onclicks.length; i++) {
        onclicks[i].classList.remove("onclickClicked");
        onclicks[i].classList.add("colorFilters");
    }
    // Au moment du clique, prend en compte le paramètre de la fonction (onclick) donc comme indiqué ci-dessous on ajoute la classe 
    // ("onclickClicked") Sans oublier de retirer en même temps la classe : ("colorFilters") pour bien remplacer les couleurs !
    onclick.classList.add("onclickClicked");
    onclick.classList.remove("colorFilters");
}







