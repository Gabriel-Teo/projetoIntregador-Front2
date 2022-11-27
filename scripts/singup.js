 document.addEventListener('invalid', function (event) {
     event.preventDefault();
 }, true)

//array de inputs para validação
let input = document.querySelectorAll('input');
console.log(input)

//Botão 'criar conta'
let form = document.getElementById('formRegistro')

form.addEventListener('submit', function (event) {
    let btn = document.getElementById('inputBtn')
    let validArray = [];
    const allEqual = array => array.every(val => val === 'acessoPermitido');
    event.preventDefault();
    for (let i = 0; i < input.length ; i++){
        validArray.push(input[i].className)
    }

    if (allEqual(validArray)){
        console.log('paramos aqui');
        //fazr botão ficar bloq
        form.submit();
    } else {
        console.log('opa não foi');
        //fazr botão ficar bloq
    }
})

//validação Primeiro nome
//(FName = Primeiro nome)
let inputFName = document.getElementById('inputFirstName');
inputFName.addEventListener('keyup', function () {
    if (inputFName.value.length < 3) {
        inputFName.classList.remove('acessoPermitido');
        inputFName.classList.add('acessoNegado');
    } else {
        inputFName.classList.remove('acessoNegado');
        inputFName.classList.add('acessoPermitido');
    }
    
})

//validação Sobrenome
//(LName = Sobrenome)
let inputLName = document.getElementById('inputLastName');
inputLName.addEventListener('keyup', function () {
    if (inputLName.value.length < 3) {
        inputLName.classList.remove('acessoPermitido');
        inputLName.classList.add('acessoNegado');
    } else {
        inputLName.classList.remove('acessoNegado');
        inputLName.classList.add('acessoPermitido');
    }
})

//valida e-mail
let inputEmail = document.getElementById('inputEmail');
inputEmail.addEventListener('keyup', function () {
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (inputEmail.value.match(validRegex)) {
        inputEmail.classList.remove('acessoNegado');
        inputEmail.classList.add('acessoPermitido');
    } else {
        inputEmail.classList.remove('acessoPermitido');
        inputEmail.classList.add('acessoNegado');
    }
})

//valida senhas
//Senha Principal
let inputFPass = document.getElementById('inputPassword')
inputFPass.addEventListener('keyup', function () {
    if (inputFPass.value.length < 8) {
        inputFPass.classList.remove('acessoPermitido');
        inputFPass.classList.add('acessoNegado');
    } else {
        inputFPass.classList.remove('acessoNegado');
        inputFPass.classList.add('acessoPermitido');
    }
})

//validação senha repetida
let inputRPass = document.getElementById('inputRPassword')
inputRPass.addEventListener('keyup', function () {
    if (inputRPass.value != inputFPass.value || inputRPass.value.length < 8) {
        inputRPass.classList.remove('acessoPermitido');
        inputRPass.classList.add('acessoNegado');
    } else {
        inputRPass.classList.remove('acessoNegado');
        inputRPass.classList.add('acessoPermitido');
    }
})