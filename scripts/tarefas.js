//agrupamento de variaveis DOM
let form = document.getElementById('formTarefa');
let itemTarefa = document.querySelector('#tarefasPendentes');
let nomeUsuario = document.getElementById('nomeUsuario');
let userJwt = sessionStorage.getItem("jwt");
let listaPendente = document.getElementById('tarefasPendentes');
let listaTerminada = document.getElementById('tarefasTerminadas');
let inputTarefa = document.getElementById('novaTarefa');
let finalizarBtn = document.getElementById('closeApp')
let btnApagar = document.getElementById("clearTask")
let idEvento;

//onload atualiza lista de tasks e coloca função nos botões.
document.addEventListener('DOMContentLoaded', function () {
    atualizaTasks(userJwt);
    stateBtn();

    // Verifica se token é valido
    if(!userJwt){
        window.location.href = "index.html";
    }else{
        capturaDadosUser()
    }

    // Função Async que captura dados user

    async function capturaDadosUser(){
        let requestInit = {
                headers: {
                "authorization": userJwt
            }
            
        }
    
        let dadosUser = await fetch(`${baseUrl()}/users/getMe`, requestInit);
        let dadosJS = await dadosUser.json(); 
       renderizaDados(dadosJS);
    
    }
    
    function renderizaDados(dados){
        nomeUsuario.innerText = `${dados.firstName} ${dados.lastName}`
    
    }
})


//formulario de adicionar tarefa.
form.addEventListener('submit', function (event) {
    //normalizar variavel
    descTask = normalizarTrim(inputTarefa.value);

    //previnir evento default
    event.preventDefault();
    if (inputTarefa.value.length >= 5) {
        let post = {
            description: descTask,
            completed: false
        }
        let postJson = JSON.stringify(post)
        postaTask(postJson);
    }
})

//fazer função async que atualiza a lista de tarefas e as organiza.
async function atualizaTasks(jwt) {
    //config
    let requestConfig = {
        headers: {
            "authorization": `${jwt}`
        }
    }
    console.log(requestConfig)

    //try/catch
    try {
        let lista = await fetch(`${baseUrl()}/tasks`, requestConfig)
        console.log(lista)
        if (lista.status == 200) {
            let listaResponse = await lista.json();
            attTask(listaResponse);
        } else {
            throw lista
        }
    } catch (error) {
        console.log('caiu no catch')
    }
}

//função que "atualiza task" adiciona uma task com o formato correto no html
function attTask(array) {
    console.log(array)
    for (let i = 0; i < array.length; i++) {
        let tarefa = `
            <li class="nova-tarefa">
                <div class="not-done"></div>
                <div class="descricao">
                    <p class="nome">${array[i].description}</p>
                    <p class="timestamp">Criada em: ${array[i].createdAt}</p>
                   </div>
                   <div class="cancelar" id="clearTask" onclick="apagaTask(${array[i].id})"> Apagar Tarefa</div>
            </li>`
            

        if (array[i].completed === false) {
            listaPendente.innerHTML += tarefa;
            stateBtn()
        } else if (array[i].completed === true) {
            listaTerminada.innerHTML += tarefa;
        }
    }
}

//postar a task

async function postaTask(response) {
    let requestConfig = {
        method: "POST",
        body: response,
        headers: {
            "authorization": `${userJwt}`,
            "content-Type": "application/json"
        }
    }

    try {
        let post = await fetch(`${baseUrl()}/tasks`, requestConfig);
        if (post.status == 201) {
            let postResponse = [await post.json()];
            attTask(postResponse);
            console.log('posta task FOI MERMAO')
        }
    } catch (error) {
        console.log('posta task não foi')
    }
}

//função dos botões (alteram o estado complete da task {PUT})
function stateBtn() {
    let btn = document.querySelectorAll('.not-done');
    btn.forEach(btn => {
        btn.addEventListener('click', function () {
            //trazer função async {PUT} para atualizar post na api
            listaTerminada.append(this.parentNode)
        })
    })
}

// função apagar task
async function apagaTask(idTarefa){
let confirmaDel = confirm("Tem certeza que deseja apagar?")
    if(confirmaDel) {
    
    let requestClear = {
        method: "DELETE",
        headers: {
            "authorization": `${userJwt}`,
        }

    }
    try {
        let clear = await fetch(`${baseUrl()}/tasks/${idTarefa}`, requestClear);
        if (clear.status == 201 || clear.status == 200) {
            let clearResponse = await clear.json();
            location.reload()
            alert(clearResponse)
        }
        
        
    } catch (error) {
        Alert('Erro! Tarefa não apagada')
    }
}
}
// Botão de finalizar sessão
finalizarBtn.addEventListener("click", function(){
    let confirma = confirm("Você tem certeza que quer sair?")
    if(confirma == true){
    userJwt = sessionStorage.clear();
    window.location.href = "index.html"}
})


// adicionar botão para excluir e/ou retornar

// adicionar alteração do nome com a função async getMe (colocar no DOMContentLoaded)

// fazer o botão de finalizar sessão funcionar (limpar os dados no storage)

