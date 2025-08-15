document.addEventListener("DOMContentLoaded",load);
function load(){
    function nrml(input){
        document.getElementById("d1").classList.add("faute");
        input.addEventListener("input",function reintialiser(){
            document.getElementById("d1").classList.remove("faute");
            document.getElementById("d1").textContent="Merci de remplir ce Formulaire";
        });
    }
    function verif_fullname(id){
        return /^[a-zA-z]+$/.test(document.getElementById(id).value.trim());
    }

    function verif_tel(id){
        return /^\d+$/.test(document.getElementById(id).value) && (document.getElementById(id).value).length===8 ;
    }

    function verif_age(id){
        var today=new Date();
        var dtn=new Date(document.getElementById(id).value);
        var age=today.getFullYear()-dtn.getFullYear();
        var age_mois=today.getMonth()-dtn.getMonth();
        var age_jour=today.getDate()-dtn.getDate();
        if(age_mois<0 || (age_mois===0 && age_jour<0))   
            age--;
        return age>=18; 
    }
    function Pwd(id){
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(document.getElementById(id).value);
    }
    document.querySelector("form").addEventListener("submit",function(e){
        var inputs=document.querySelectorAll("input");
        var valid=true;
        for(var input of inputs){
            if(input.value.trim()===""){
                e.preventDefault();
                input.focus();
                document.querySelector("div.d").textContent="Tous les champs sont obligatoires";
                nrml(input);
                break;
            }
            switch(input.id){
                case "nom": 
                    if(!verif_fullname("nom")){
                        e.preventDefault();
                        document.querySelector("div.d").textContent="Nom ne doit pas contenir des symbole!";
                        input.focus();
                        valid=false;
                        nrml(input);
                    }
                    break;
                case "prenom":
                    if(!verif_fullname("prenom")){
                        e.preventDefault();
                        document.querySelector("div.d").textContent="Pas de symbole dans Prenom seulement des caractéres !";
                        input.focus();
                        valid=false;
                        nrml(input);
                    }
                    break;
                case "num":
                    if(!verif_tel("num")){
                        e.preventDefault();
                        document.querySelector("div.d").textContent="CIN contient 8 chiffres !";
                        input.focus();
                        valid=false;
                        nrml(input);
                    }
                    break;
                case "date":
                    if(!verif_age("date")){
                        e.preventDefault();
                        valid=false;
                        document.querySelector("div.d").textContent="Vous devez etre +18 !";
                        input.focus();
                        nrml(input);
                    }
                    break;
                case "mdp":
                    if(!Pwd("mdp")){
                        e.preventDefault();
                        valid=false;
                        document.querySelector("div.d").textContent="Votre mot de passe doit etre long et contenir des caractéres majuscules, des symboles et des chiffres ";
                        input.focus();
                        nrml(input);
                    }
                    break;
                case "cmdp":
                    if((document.getElementById("cmdp").value)!=(document.getElementById("mdp").value)){
                    e.preventDefault();
                    input.focus();
                    valid=false;
                    document.querySelector("div.d").textContent="Confirmez votre MDP";
                    nrml(input);
                    }
                    break;
                default: break;
            }
            if(!valid)
                break;
        }
    })
}
