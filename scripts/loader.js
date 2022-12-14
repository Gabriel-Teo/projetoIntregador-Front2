function renderizarSkeletons(quantidade, conteiner) {

  let divleft = document.getElementsByClassName('div-left')
  const conteinerTarefas = document.querySelector(conteiner);

  const skeletons = Array.from({ length: quantidade });

  skeletons.forEach(() => {
    let li = document.createElement("li");
    li.classList.add(`skeleton-conteiner`)
    li.classList.add(`${conteiner.replace(".", "")}`)
    li.setAttribute("id", "skeleton")
    li.innerHTML = `
     <div class="skeleton-card">
       <p class="skeleton-text"></p>
       <p class="skeleton-text"></p>
     </div>
 `;

    conteinerTarefas.appendChild(li);
  });
}

function removerSkeleton(conteiner) {

  const conteinerTarefas = document.querySelector(conteiner);

  let skeletons = document.querySelectorAll(`#${conteiner}`);
  console.log(skeletons)
  for (let i = 0; i < skeletons.length; i++) {
    skeletons[i].parentNode.removeChild(skeletons[i])
  }

}