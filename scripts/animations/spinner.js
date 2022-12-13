function ligaSpinner(){
    let acrecenta = document.createElement("div");
    acrecenta.classList.add("loader");
    let btn = document.getElementById("btnSubmit");
    btn.innerText = ""
    btn.appendChild(acrecenta);
}

function desligaSpinner(){
setTimeout(() => {
    let spinner = document.querySelector(".loader");
    let btn = document.getElementById("btnSubmit");
    btn.removeChild(spinner)
    btn.innerText = "Acessar"
    
}, 2000);
    

}