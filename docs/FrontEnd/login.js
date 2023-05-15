// login 

const formulaireLogin = document.querySelector('.loginForm');
const modalTop = document.querySelector('.userModal');
let CallApiLogin = function login(event) {
    event.preventDefault()

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
        .then(response => {
            if (response.ok) {
                response.json().then((result) => {
                    console.log('token = ', result)
                    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
                    localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4")
                    window.location.href = 'userEdit.html'


                })
            } else {
                alert('Mot de passe ou identifiant incorrect')
            }
        })


};
formulaireLogin.addEventListener('submit', CallApiLogin);



