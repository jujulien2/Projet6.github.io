// login 

const formulaireLogin = document.querySelector('.loginForm');



let CallApiLogin = function login(event) {
    event.preventDefault()

    const identifiant = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    }
    const chargeUtile = JSON.stringify(identifiant);
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/Json"
        },
        body: chargeUtile
    })
        .then(response => {
            if (response.ok) {
                response.json().then((result) => {
                    console.log(result.token);
                    const myToken = result.token
                    localStorage.setItem('token', myToken)

                    window.location.href = 'userEdit.html'

                })
            } else {
                alert('Mot de passe ou identifiant incorrect')
            }
        })
};




formulaireLogin.addEventListener('submit', CallApiLogin);



