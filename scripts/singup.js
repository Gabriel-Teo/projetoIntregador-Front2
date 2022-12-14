//Agrupamento de variaveis de manipulação DOM (pra ficar mais facil)
let form = document.getElementById('formRegistro');
let inputEmail = document.getElementById('inputEmail');
//(FName = Primeiro nome)
let inputFName = document.getElementById('inputFirstName');
//(LName = Sobrenome)
let inputLName = document.getElementById('inputLastName');
//Senha Principal
let inputFPass = document.getElementById('inputPassword');
//Senha Repetida (campo confirmação)
let inputRPass = document.getElementById('inputRPassword');
let btnSubmit = document.getElementById('inputBtn');


//cancela pop-up padrão
document.addEventListener('invalid', function (event) {
    event.preventDefault();
}, true)



//Validações
let fNameValid = false;
let lNameValid = false;
let emailValid = false;
let fPassValid = false;
let rPassValid = false;


function validaTudo() {
    fName = normalizarTrim(inputFName.value);
    lName = normalizarTrim(inputLName.value);
    email = normalizarTrim(normalizarLowerC(inputEmail.value));
    password = normalizarTrim(inputFPass.value);

    //Array de validação
    let validArray = [fNameValid, lNameValid, emailValid, fPassValid, rPassValid];

    //função para ver se todos estão validos
    const allEqual = array => array.every(val => val === true)
    return allEqual(validArray);
}
document.addEventListener("DOMContentLoaded", bloqueiaBtn())
//Botão 'criar conta'
form.addEventListener('submit', function (event) {
    //prevenção do evento default
    event.preventDefault();

    //normalização de values
    ;

    //verifica se estão todos iguais
    if (validaTudo()) {
        //criar objeto de cadastro
        let cadastro = {
            firstName: fName,
            lastName: lName,
            email: email,
            password: password
        }
        let cadastroJson = JSON.stringify(cadastro);
        //chamar function async
        cadastroAsync(cadastroJson);
    } else {
        alert("falta alguma coisa ai mermão (tirar alerts depois!!)")
    }
})

//async function de cadastro
async function cadastroAsync(body) {
    //Config do request
    let requestConfig = {
        method: "POST",
        body: body,
        headers: {
            "content-Type": "application/json"
        }
    }

    //Try/Catch
    try {
        let cadastro = await fetch(`${baseUrl()}/users`, requestConfig)
        console.log(cadastro.status)
        if (cadastro.status == 201) {
            let cadResponse = await cadastro.json();
            cadSucess(cadResponse);
        } else {
            throw cadastro
        }
    } catch (error) {
        cadError(error);
    }
}

//cadastro sucesso
function cadSucess(response) {
    //salvar jwt na session
    sessionStorage.setItem("jwt", response.jwt)
    //Levar para pag de tarefas
    location.href = "tarefas.html"
}

//cadastro Erro
function cadError(error) {
    console.log(error)
    if (error.status == 400 || error.status == 404) {
        alert("usuario ja registrado");
    } else {
        alert("ocorreu um erro inesperado")
    }
}

//validação Primeiro nome
inputFName.addEventListener('keyup', function () {
    // normalizar
    fName = normalizarTrim(inputFName.value);

    //Validação
    if (fName.length < 3) {
        inputFName.classList.remove('acessoPermitido');
        inputFName.classList.add('acessoNegado');
        fNameValid = false;
        bloqueiaBtn();
    } else {
        inputFName.classList.remove('acessoNegado');
        inputFName.classList.add('acessoPermitido');
        fNameValid = true;
        bloqueiaBtn();
    }
})

//validação Sobrenome
inputLName.addEventListener('keyup', function () {
    //normalizar
    lName = normalizarTrim(inputLName.value);

    //validação
    if (lName.length < 3) {
        inputLName.classList.remove('acessoPermitido');
        inputLName.classList.add('acessoNegado');
        lNameValid = false;
        bloqueiaBtn();
    } else {
        inputLName.classList.remove('acessoNegado');
        inputLName.classList.add('acessoPermitido');
        lNameValid = true;
        bloqueiaBtn();
    }
})

//valida e-mail
inputEmail.addEventListener('keyup', function () {
    //normalizar
    email = normalizarTrim(normalizarLowerC(inputEmail.value));

    //validação
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
        inputEmail.classList.remove('acessoNegado');
        inputEmail.classList.add('acessoPermitido');
        emailValid = true;
        bloqueiaBtn();
    } else {
        inputEmail.classList.remove('acessoPermitido');
        inputEmail.classList.add('acessoNegado');
        emailValid = false;
        bloqueiaBtn();
    }
})

//valida senhas
inputFPass.addEventListener('keyup', function () {
    //normalizar
    fPass = normalizarTrim(inputFPass.value);

    //validação
    if (fPass.length < 8) {
        inputFPass.classList.remove('acessoPermitido');
        inputFPass.classList.add('acessoNegado');
        fPassValid = false;
        bloqueiaBtn();
    } else {
        inputFPass.classList.remove('acessoNegado');
        inputFPass.classList.add('acessoPermitido');
        fPassValid = true;
        bloqueiaBtn();
    }

    if (rPass != inputFPass.value || rPass.length < 8) {
        inputRPass.classList.remove('acessoPermitido');
        inputRPass.classList.add('acessoNegado');
        rPassValid = false;
        bloqueiaBtn()
    } else {
        inputRPass.classList.remove('acessoNegado');
        inputRPass.classList.add('acessoPermitido');
        rPassValid = true;
        bloqueiaBtn()
    }
})

//validação senha repetida
inputRPass.addEventListener('keyup', function () {
    //normalizar
    rPass = normalizarTrim(inputRPass.value);

    //validação
    if (rPass != inputFPass.value || rPass.length < 8) {
        inputRPass.classList.remove('acessoPermitido');
        inputRPass.classList.add('acessoNegado');
        rPassValid = false;
        bloqueiaBtn()
    } else {
        inputRPass.classList.remove('acessoNegado');
        inputRPass.classList.add('acessoPermitido');
        rPassValid = true;
        bloqueiaBtn()
    }
})

function bloqueiaBtn() {
    if (validaTudo()) {
        btnSubmit.innerText = 'Acessar'
        btnSubmit.style.backgroundColor = 'orangered'
    } else {
        btnSubmit.innerText = 'Bloqueado'
        btnSubmit.style.backgroundColor = 'gray'
    }
}

