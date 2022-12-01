//tirar pop-up do documento
document.addEventListener('invalid', function (event) {
    event.preventDefault();
}, true)



//Validação envia (Fazer)
let btnSubmit = document.getElementById('btnSubmit')



btnSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    if (inputEmail.validity.valid == true && inputPassword.validity.valid == true){
        console.log('foi')
        btnSubmit.innerText = 'FOI'

        // Normalizando as entradas:

    let emailNormalizado = inputEmail.value.trim()
    let senhaNormalizada = inputPassword.value.trim()
    
    let objetoLg = {
        email: emailNormalizado,
        password: senhaNormalizada
    }
    let objetoJs = JSON.stringify(objetoLg)
    
    loginSystem(objetoJs)
    }

})

// Função de ligação API

function loginSystem(objeto){
    let requestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: objeto
    }
    fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login", requestInit)
    .then(
        resposta => {
            return resposta.json()
        }
    )
    .then(
        resposta => {
            loginSucesso(resposta)
        }
    
    )
    .catch(
        erro =>{
            insucesso(erro)
        }
    )

}

function loginSucesso(resposta){
    sessionStorage.setItem("jwt", resposta.jwt)
    window.location.href = "tarefas.html"
    console.log(resposta)

}
function insucesso(resposta){
console.log(resposta)
}


//Validação e-mail
let inputEmail = document.getElementById('inputEmail');
inputEmail.addEventListener('keyup', function () {
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (inputEmail.value.match(validRegex)) {
        inputEmail.classList.remove('acessoNegado')
        inputEmail.classList.add('acessoPermitido');
        inputEmail.validity = true;
    } else {
        inputEmail.classList.remove('acessoPermitido');
        inputEmail.classList.add('acessoNegado');
        inputEmail.validity.valid = false;
    }

})

//Validação password
let inputPassword = document.getElementById('inputPassword');
inputPassword.addEventListener('keyup', function () {
    
    if (inputPassword.value.length < 8) {
        inputPassword.classList.remove('acessoPermitido');
        inputPassword.classList.add('acessoNegado');
        inputPassword.validity = false
    } else {
        inputPassword.classList.remove('acessoNegado');
        inputPassword.classList.add('acessoPermitido');
        inputPassword.validity = true
    }
    console.log(inputPassword.validity)
})

