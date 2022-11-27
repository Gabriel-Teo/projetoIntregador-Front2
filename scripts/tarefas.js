//necessario API para dar continuidade.
//pegar nome usuario
let nomeUsuario = document.getElementById('nomeUsuario')
nomeUsuario.innerText = 'teste'

//botão envia pra api
//POR ENQUANTO MANIPULAÇÃO DE DOM BASICA PARA TESTAR
let form = document.getElementById('formTarefa')
form.addEventListener('submit', function(event){
    const date = new Date().toLocaleDateString();
    let parent = document.getElementById('tarefasPendentes')
    let inputTarefa = document.getElementById('novaTarefa')
    let tarefa = `
    <li class="tarefa">
    <div class="not-done"></div>
    <div class="descricao">
      <p class="nome">${inputTarefa.value}</p>
      <p class="timestamp">Criada em: ${date}</p>
    </div>`
    event.preventDefault();
    if (inputTarefa.value.length >= 5) {
        parent.innerHTML += tarefa;
    }
})