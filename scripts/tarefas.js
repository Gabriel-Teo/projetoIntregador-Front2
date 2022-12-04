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

//mover entre listas
let itemTarefa = document.querySelector('#tarefasPendentes')
itemTarefa.addEventListener('click', function(event){
    let btn = event.btn.closest('.not-done');
    if (btn) {
        console.log('foi')
    }
})

// const listone = document.querySelector("#list");
// const listwo = document.querySelector("#list2");
// const li = listone.querySelectorAll("li");

// function MoveLi(){
//   listwo.append(this);
//   this.removeEventListener("click", MoveLi);
// }
// li.forEach( (el) => {
//   el.addEventListener("click", MoveLi);
// });