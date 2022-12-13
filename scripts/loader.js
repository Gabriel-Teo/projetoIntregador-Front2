function renderizarSkeletons(quantidade, conteiner) {

 const conteinerTarefas = document.querySelector(conteiner);
 
  const skeletons = Array.from({ length: quantidade});
 
 skeletons.forEach(() => {
   
   const template = `
   <li class="skeleton-conteiner ${conteiner.replace(".", "")}-child">
     <div class="skeleton-card">
       <p class="skeleton-text"></p>
       <p class="skeleton-text"></p>
     </div>
   </li>
 `;
 
   conteinerTarefas.innerHTML += template;
 });
}

function removerSkeleton(conteiner) {

    const conteinerTarefas = document.querySelector(conteiner);
    
    const skeletons = document.querySelectorAll(`${conteiner}-child`);
    
    skeletons.forEach((skeleton) => conteinerTarefas.removeChild(skeleton));
   }