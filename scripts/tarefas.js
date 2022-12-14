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

    // Verifica se token é valido
    if (!userJwt) {
        window.location.href = "index.html";
    } else {
        renderizarSkeletons(5, ".tarefas-pendentes")
        capturaDadosUser()
    }

    // Função Async que captura dados user

    async function capturaDadosUser() {
        let requestInit = {
            headers: {
                "authorization": userJwt
            }

        }

        let dadosUser = await fetch(`${baseUrl()}/users/getMe`, requestInit);
        let dadosJS = await dadosUser.json();
        renderizaDados(dadosJS);

    }

    function renderizaDados(dados) {
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
    try{
        
   
        
        let lista = await fetch(`${baseUrl()}/tasks`, requestConfig)
        console.log(lista.status)
        if (lista.status == 200) {
            let listaResponse = await lista.json();
            removerSkeleton(".tarefas-pendentes")
            renderizaTasks(listaResponse);
        
        // } else {
            throw lista
        }
    } catch (error) {
        console.log('catch attTasks')
    }
}

//função que "renderiza task" adiciona uma task com o formato correto no html
function renderizaTasks(array) {
    
    for (let i = 0; i < array.length; i++) {
        let btnDiv = document.createElement("div")
        btnDiv.classList.add("not-done")
        let li = document.createElement("li")
        li.classList.add("nova-tarefa")
        li.id = array[i].id
        li.innerHTML =
            `
                <div class="descricao">
                    <p class="nome">${array[i].description}</p>
                    <p class="timestamp">Criada em: ${array[i].createdAt}</p>
                </div>
                <div class="cancelar" id="clearTask" onclick="apagaTask(${array[i].id})"> Apagar Tarefa</div>
            </li>`

        li.insertBefore(btnDiv, li.firstChild);
        btnDiv.onclick = stateBtn(li.firstChild, array[i].completed);

        if (array[i].completed === false) {
            listaPendente.appendChild(li);
        } else if (array[i].completed === true) {
            listaTerminada.appendChild(li);
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
            renderizaTasks(postResponse);
            console.log('posta task FOI MERMAO')
        }
    } catch (error) {
        console.log('posta task não foi')
    }
}

//função dos botões (alteram o estado complete da task {PUT})
function stateBtn(li, status) {
    // let btn = document.querySelectorAll('.stateBtn');
    // btn.forEach(btn => {
        console.log(li);
    li.addEventListener('click', function () {

        let parentNode = this.parentNode;
        let id = parentNode.id;
        
        console.log('abaixo');
        console.log(id)
        console.log(status)
        //Corpo da requisição que vai para a API.
        let body = {
            "completed": !status
        }
        let bodyJson = JSON.stringify(body)
        // manipula o local do DOM
        if (status) {
            this.classList.remove("not-done")
            this.classList.add("done")

            parentNode.parentNode.removeChild(parentNode);
        } else {
            this.classList.remove("done")
            this.classList.add("not-done")
            parentNode.parentNode.removeChild(parentNode);
        }
        changeStatus(bodyJson, id)
        //trazer função async {PUT} para atualizar post na api

    })
    // })
    //trazer função async {PUT} para atualizar post na api
    //fazer confirmação (status 200)

}

//função statusTask
async function changeStatus(body, id) {
    let requestConfig = {
        method: "PUT",
        body: body,
        headers: {
            "authorization": `${userJwt}`,
            "content-Type": "application/json"
        }
    }

    try {
        let update = await fetch(`${baseUrl()}/tasks/${id}`, requestConfig)
        if (update.status == 200) {
            let updateJson = [await update.json()]
            console.log(updateJson)
            renderizaTasks(updateJson)
        } else {
            throw update;
        }
    } catch (error) {
        alert('catch do changeStatus')
    }
}

// função apagar task

async function apagaTask(idTarefa){
    let confirmaDel = confirm("Tem certeza que deseja apagar?")
        if(confirmaDel) {
    let btnApagar = document.getElementById("clearTask")
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
    window.location.href = "index.html"
}
})


// adicionar botão para excluir e/ou retornar


// adicionar alteração do nome com a função async getMe (colocar no DOMContentLoaded)

// fazer o botão de finalizar sessão funcionar (limpar os dados no storage)

// adicionar de maneira inteligente o PUT editando a task "postaTask"