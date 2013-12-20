$(function(){
    var voiture = $("#voiture")[0];
    voiture.style.left = "100px" ;
    voiture.style.bottom = "20px";
});

    var CODE_TOUCHE_GAUCHE = 37; //Keycode pour la touche gauche
    var CODE_TOUCHE_DROITE = 39; //Keycode pour la touche droite
    var CODE_TOUCHE_HAUT = 38; //Keycode pour la touche haut
    var CODE_TOUCHE_BAS = 40; //Keycode pour la touche bas
    var move = 10; //Nombre de pixels que l'on déplace la voiture
    var horizontalCalc;
    var road = 900;

function MouvementPlayer(keyCode){
        if(keyCode == CODE_TOUCHE_GAUCHE){
            if(parseInt(voiture.style.left)-20 >= 0){
                horizontalCalc = parseInt(voiture.style.left) - move;
            }
        }
        else if(keyCode == CODE_TOUCHE_DROITE){
            if(parseInt(voiture.style.left)+20 <= 579){
                horizontalCalc = parseInt(voiture.style.left) + move;
            }
        }
        
        voiture.style.left = horizontalCalc.toString() + "px";

        /*if(keyCode == CODE_TOUCHE_HAUT){
            verticalCalc = parseInt(voiture.style.bottom) + move; 
        }
        else if(keyCode == CODE_TOUCHE_BAS){
            verticalCalc = parseInt(voiture.style.bottom) - move;
        }
        voiture.style.bottom = verticalCalc.toString() + "px"; DEPLACEMENT VERTICAL*/
}

window.onkeydown = function(e){
    MouvementPlayer(e.keyCode);
}