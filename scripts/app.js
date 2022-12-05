//Variaveis DOM (agrupamento aqui para ficar mais facil e menos confuso)
let btnSubmit = document.getElementById('btnSubmit');
let inputEmail = document.getElementById('inputEmail');
let inputPassword = document.getElementById('inputPassword');

//tirar pop-up do documento
document.addEventListener('invalid', function (event) {
    event.preventDefault();
}, true)

//validação (remake)
let emailValid = false;
let passwordValid = false;

//Validação envia
btnSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    if (emailValid == true && passwordValid == true) {
        // Normalizando as entradas:
        let emailNormalizado = inputEmail.value.trim()
        let emailNormalizado2 = emailNormalizado.toLowerCase()
        let senhaNormalizada = inputPassword.value.trim()
        // Criando obj de login
        let objetoLg = {
            email: emailNormalizado2,
            password: senhaNormalizada
        }
        // Transformando o objeto login em json
        let objetoJs = JSON.stringify(objetoLg)
        //função login
        loginSystem(objetoJs)
    } else {
        alert('valida as coisa ai (trocar alerts por css)')
    }
})

// Função de login na API
function loginSystem(objeto) {
    let requestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: objeto
    }
    fetch(`${baseUrl()}/users/login`, requestInit)
        .then(
            resposta => {
                if (resposta.status == 200 || resposta.status == 201) {
                    return resposta.json()
                } else {
                    throw resposta;
                }
            }
        )
        .then(
            resposta => {
                loginSucesso(resposta)
            }
        )
        .catch(
            erro => {
                insucesso(erro)
            }
        )
}

//sucesso login
function loginSucesso(resposta) {
    sessionStorage.setItem("jwt", resposta.jwt)
    window.location.href = "tarefas.html"
    console.log(resposta)
}
//falha login
function insucesso(resposta) {
    if (resposta.status == 400 || resposta.status == 404) {
        alert("Login e/ou senha incorreto")
    } else {
        alert("Servidor fora do ar")
    }
    console.log(resposta)
}

//Validação e-mail
inputEmail.addEventListener('keyup', function () {
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (inputEmail.value.match(validRegex)) {
        inputEmail.classList.remove('acessoNegado')
        inputEmail.classList.add('acessoPermitido');
        emailValid = true;
    } else {
        inputEmail.classList.remove('acessoPermitido');
        inputEmail.classList.add('acessoNegado');
        emailValid = false;
    }
})

//Validação password
inputPassword.addEventListener('keyup', function () {

    if (inputPassword.value.length < 8) {
        inputPassword.classList.remove('acessoPermitido');
        inputPassword.classList.add('acessoNegado');
        passwordValid = false
    } else {
        inputPassword.classList.remove('acessoNegado');
        inputPassword.classList.add('acessoPermitido');
        passwordValid = true
    }
    console.log(inputPassword.validity)
})

