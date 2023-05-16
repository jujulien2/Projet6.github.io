// modal ouverture : 

let modal = null
const openModal = function (e) {

    e.preventDefault()
    const mymodalOne = document.querySelector('#modal1')
    const modalWrapper = document.querySelector('.modalWrapper')
    const closeCross = document.querySelector('.closeCross')
    mymodalOne.style.display = null
    mymodalOne.removeAttribute('aria-hidden')
    modal = mymodalOne
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