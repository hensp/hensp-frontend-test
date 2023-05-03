


// FUNCION PARA DESPLEGAR EL MENU LATERAL DEL HEADER

function dysplayMenu () {
    let menuContainer = document.querySelector(".container2");
    let menuIcon = document.querySelector(".icon-menu");
    menuIcon.addEventListener("click",function(){
        if(menuContainer.classList.contains("extend")){
            menuContainer.classList.remove("extend");
        }else{
            menuContainer.classList.add("extend");
        }
        
    })
};
dysplayMenu();