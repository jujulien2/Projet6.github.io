






fetch('http://localhost:5678/api/works')
    .then(response => (response.json()))
    // les datas sont appelées donc on peut en faire quelque chose de ces datas ( datas = infos récupérer depuis l'API), (ci-dessous) ::
    .then((data) => {
        const gallery = document.querySelector('.gallery');
        data.forEach(items => {
            const divOfProjects = document.createElement('div');
            const imageDiv = document.createElement('img');
            divOfProjects.innerHTML = items.title;
            imageDiv.src = items.imageUrl;
            gallery.appendChild(divOfProjects);
            divOfProjects.appendChild(imageDiv);
        });
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







