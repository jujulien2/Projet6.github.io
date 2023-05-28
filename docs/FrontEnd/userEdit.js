// modal ouverture : 

let modal = null
const openModal = function (e) {

    e.preventDefault()
    const myModalOne = document.querySelector('#modal1')
    const modalWrapper = document.querySelector('.modalWrapper')
    const closeCross = document.querySelector('.closeCross')
    myModalOne.style.display = null
    myModalOne.removeAttribute('aria-hidden')
    myModalOne.setAttribute('aria-modal', true)

    modal = myModalOne
    modal.addEventListener('click', closeModal)
    closeCross.addEventListener('click', closeModal)
    modalWrapper.addEventListener('click', stopPropagation)
}
// fermer la modal 
const closeModal = function (e) {
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', true)
    modal.removeEventListener('click', closeModal)
    modal.removeAttribute('aria-modal')

}


const modalOne = document.querySelector('.modalBesideFilters');
modalOne.addEventListener('click', openModal)


// ajout de la fonction 
// empêche l'evenement de se propager sur la div ciblée ( en loccurence "modalWrapper") pour pouoir cliquer dans la modal sans qu'elle se ferme
const stopPropagation = function (e) {
    e.stopPropagation()
}


fetch('http://localhost:5678/api/works')
    .then(response => (response.json()))
    .then((data) => {
        data.forEach(displayModal);
    })
const displayModal = function (item) {
    const containModal = document.querySelector('.containModal')
    let divOfEachContent = document.createElement('div')
    let imgOfEachContent = document.createElement('img')
    let trashIcone = document.createElement('i')
    let moveIcone = document.createElement('i')
    moveIcone.classList.add('fa-solid', 'fa-arrows-up-down-left-right', 'moveIcone')
    trashIcone.classList.add('fa-regular', 'fa-trash-can', 'trashIcone')
    trashIcone.setAttribute('data-image-id', item.id);
    imgOfEachContent.src = item.imageUrl
    divOfEachContent.innerHTML = 'éditer'
    containModal.appendChild(divOfEachContent);
    divOfEachContent.appendChild(imgOfEachContent);
    divOfEachContent.appendChild(trashIcone);
    divOfEachContent.appendChild(moveIcone);

}





// selection des petites poubelles
let token = localStorage.getItem('token');
function deleteImage(imageId, trashIcone) {


    console.log(imageId);
    fetch('http://localhost:5678/api/works/' + imageId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }

    })
        .then(response => {
            // Vérifiez la réponse et effectuez les actions nécessaires
            if (response.ok) {
                // Suppression réussie
                console.log('Image supprimée avec succès');
                // Supprimez également l'élément HTML correspondant à l'image
                trashIcone.parentNode.remove(); // Supprime le conteneur div parent de l'icône de corbeille
                trashIcone.remove()
                createWorks();
            } else {
                // Gestion des erreurs en cas d'échec de suppression
                console.log('Erreur lors de la suppression de l\'image');
            }
        })
        .catch(error => {
            console.log('Erreur lors de la suppression de l\'image:', error);
        });

}


const containModal = document.querySelector('.containModal');

containModal.addEventListener('click', function (event) {
    if (event.target.matches('.trashIcone')) {
        // L'icône de corbeille a été cliquée
        const trashIcone = event.target;
        const imageId = trashIcone.getAttribute('data-image-id');
        console.log(imageId);
        console.log(trashIcone);
        deleteImage(imageId, trashIcone)

    }
});






// affichage modal2 add photo : 
let displayModalAddImg = function () {
    const myModalOne = document.querySelector('#modal1')
    const myModalTwo = document.querySelector('.modal2')
    myModalTwo.addEventListener('click', closeModalTwo)
    myModalOne.style.display = 'none'
    myModalTwo.style.display = null
    const modalAddImgWrapper = document.querySelector('.modalAddImgWrapper')
    modalAddImgWrapper.addEventListener('click', stopPropagation)


}

const addPictureButton = document.querySelector('.addPictureButton');
addPictureButton.addEventListener('click', displayModalAddImg)

// gerer la fermrute et le click de la modal2 : 
let closeModalTwo = function () {
    const myModalTwo = document.querySelector('.modal2')
    const modalAddImgWrapper = document.querySelector('.modalAddImgWrapper')
    myModalTwo.style.display = 'none'
    modalAddImgWrapper.addEventListener('click', stopPropagation)
}

const closeCross2 = document.querySelector('.closeCross2')
closeCross2.addEventListener('click', closeModalTwo)

// affichage categories dans le select déroulabt 
// rappel du fecth category
fetch('http://localhost:5678/api/categories')
    .then(response => (response.json()))
    .then((categories) => {
        categories.forEach(selectCategory)
        console.log(categories);
    })

const selectCategory = function (el) {
    let eachOption = document.createElement('option')
    const categoryNewImg = document.querySelector('#categoryNewImg')
    categoryNewImg.appendChild(eachOption)
    eachOption.innerHTML = el.name
}
// input pour charger la nouvelle image


let inputFile = document.querySelector('#addPicture')
inputFile.addEventListener('change', displayNewImg)

function displayNewImg() {
    let positionNewImgWrapper = document.querySelector('.positionNewImgWrapper')
    positionNewImgWrapper.style.display = null
    const preview = document.querySelector('#positionNewImg');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        preview.src = reader.result;
    });
    if (file) {
        reader.readAsDataURL(file);
    }
}


// bouton valider green class
const title = document.getElementById("titleInput")
const image = document.getElementById("addPicture")
const category = document.getElementById("categoryNewImg")
const buttonValidation = document.querySelector('.validateButton')
function checkInputsFilled() {
    if (title.value && image.files[0] && category.value) {
        buttonValidation.classList.add('clickedFilters')
    } else {
        buttonValidation.classList.remove('clickedFilters')
    }
}

title.addEventListener("input", checkInputsFilled)
category.addEventListener('input', checkInputsFilled);
image.addEventListener('change', checkInputsFilled);

// retire le token du localstorage au logout :
let logoutToken = document.getElementById('logout');
logoutToken.addEventListener('click', function () {
    localStorage.removeItem('token')
})


// Envoie nouveau travail : 


function SendNewWork() {
    const titleValue = document.getElementById("titleInput").value
    const imageValue = document.getElementById("addPicture").value
    const categoryValue = document.getElementById("categoryNewImg").value

    console.log(titleValue);
    console.log(imageValue);
    console.log(categoryValue);



    const formData = new FormData();
    formData.append('title', titleValue);
    formData.append('image', imageValue);
    formData.append('category', categoryValue);



    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData

    }).then(response => response.json())
        .then(data => {
            console.log('r');
        })
        .catch(error => {
            console.error('erreur');
        })

}
buttonValidation.addEventListener('click', SendNewWork)


