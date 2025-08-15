document.addEventListener("DOMContentLoaded",start)
var visible=true;
function add_alert(alert_msg){
        if(visible){
        visible=false;
        var adv=document.createElement("div");
        adv.classList.add("alert_msg");
        adv.textContent=alert_msg;
        document.querySelector(".glissant-d").appendChild(adv);
        setTimeout(function wait(){
            adv.remove();
            visible=true;
        },3000);
        }
}
function Pwd(id){
    //expression reguliere pour que mot de passe soit contenir majuscule, minuscule, chiffre, caractère spécial et 8 caractères minimum.
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(document.getElementById(id).value);
}
function start(){
    var slide=document.querySelector(".slider");
    document.querySelector("#sign").addEventListener("click",function glisser_left(){
        slide.classList.remove("move-right");
        slide.classList.add("move-left");
    });
    document.querySelector("#log").addEventListener("click",function glisser_right(){
        slide.classList.remove("move-left");
        slide.classList.add("move-right");
    })
    document.querySelector(".sign-up").addEventListener("submit",function form(e){
        var inputs=document.querySelectorAll(".sign-up input");        
        var valid=true;
        for(var input of inputs){
            if(input.value===""){
                e.preventDefault();
                add_alert("⚠ Tous les champs sont obligatoires");
                input.classList.add("alert");
                input.focus();
                //attendre une seconde pour elever alert afin qu'elle peut etre generer en cas d'une autre erreur
                setTimeout(function wait(){
                    input.classList.remove("alert");
                },1100)
                break;
            }
            switch(input.id){
                case "name":
                    if(!(/^[a-zA-Z]+$/.test(input.value))){
                        e.preventDefault();
                        add_alert("Username sans symboles");
                        input.classList.add("alert");
                        input.focus();
                        setTimeout(function wait(){
                        input.classList.remove("alert");
                        },1100)
                        valid=false;
                }
                    break;
                case "mdp1":
                    if(!Pwd(input.id)){
                        e.preventDefault();
                        add_alert("⚠ Le mot de passe doit contenir majuscule, minuscule, chiffre, caractère spécial et 8 caractères minimum.");
                        input.classList.add("alert");
                        input.focus();
                        setTimeout(function wait(){
                        input.classList.remove("alert");
                        },1100)
                        valid=false;
                    }
                    break;
                case "cpwd":
                    if((document.getElementById("cpwd").value)!=(document.getElementById("mdp1").value)){
                        e.preventDefault();
                        add_alert("Merci de confirmez Votre mot de passe");
                        input.classList.add("alert");
                        input.focus();
                        setTimeout(function wait(){
                        input.classList.remove("alert");
                        },1100)
                        valid=false;
                    }
                default: break;
            }
            if(!valid)
                break;
        }
    })
    document.querySelector(".login").addEventListener("submit",function signin(e){
        //rien a faire
    })
}