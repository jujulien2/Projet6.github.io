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
    imgOfEachContent.src = item.imageUrl
    divOfEachContent.innerHTML = 'éditer'
    containModal.appendChild(divOfEachContent);
    divOfEachContent.appendChild(imgOfEachContent);
    divOfEachContent.appendChild(trashIcone);
    divOfEachContent.appendChild(moveIcone);

}
let token = localStorage.getItem('token');
console.log(token);

// suppression travaux : 

fetch('http://localhost:5678/api/works/${id}', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }

})
    .then(response => console.log(response));


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


