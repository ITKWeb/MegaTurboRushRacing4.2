$(function(){
    //var voiture = document.getElementById("voiture");
    var voiture = $("#voiture")[0];
    voiture.style.left = "300px";
});

    var CODE_TOUCHE_GAUCHE = 37; //Keycode pour la touche gauche
    var CODE_TOUCHE_DROITE = 39; //Keycode pour la touche droite
    var pos = 5;

/*var onKeyLeft = function(event) {
    if ( event.keyCode == CODE_TOUCHE_GAUCHE ) {
        ALLER_GAUCHE= true;
    } else if ( event.keyCode == CODE_TOUCHE_DROITE ) {
        ALLER_DROITE = true;
        alert("droite!!");
    }
}
 
var onKeyUp = function(event) {
    if ( event.keyCode == CODE_TOUCHE_GAUCHE ) {
        ALLER_GAUCHE = false;
    } else if ( event.keyCode == CODE_TOUCHE_DROITE ) {
        ALLER_DROITE = false;
    }
}
*/

function MouvementPlayer(keyCode){
    if(keyCode == CODE_TOUCHE_GAUCHE){
        calc = parseInt(voiture.style.left) - pos;
        
    }
    else if(keyCode == CODE_TOUCHE_DROITE){
        calc = parseInt(voiture.style.left) + pos;
    }
    voiture.style.left = calc.toString() + "px";
}

window.onkeydown = function(e){
    MouvementPlayer(e.keyCode);
}