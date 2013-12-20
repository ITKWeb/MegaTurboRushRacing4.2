$(function() {
    var enemy = $('#vehiculeEnemy')[0];
    enemy.style.top = "0px";
    enemy.style.left = "300px";
    var start = parseInt(enemy.style.top);
    var voiture = document.getElementById('voiture');
    // voiture.style.top = "300px";
    // voiture.style.left = "0px";
    var interval = setInterval(function() {
	start++;
	collision_ui(voiture, enemy);
	enemy.style.top = start.toString() + "px";
	if (start == window.innerHeight) {
	    clearInterval(interval);
	    enemy.style.display = "none";
	}
    }, timeInterval);
});

function collision_ui(voiture, enemy){
    var point_enemy_x = parseInt(enemy.style.left);
    var point_enemy_y = parseInt(enemy.style.top);

    var point_voiture_x = parseInt(voiture.style.left);
    var point_voiture_y = parseInt(voiture.style.top);


    // console.log("point_voiture_x = " + point_voiture_x.toString());    
    // console.log("point_voiture_y = " + point_voiture_y.toString());
    // console.log("point_enemy_x = " + point_enemy_x.toString());
    // console.log("point_enemy_y = " + point_enemy_y.toString());

    if (((point_voiture_x > point_enemy_x) && (point_voiture_x < (point_enemy_x + carWidth))))
	{
	    if (((point_voiture_y > point_enemy_y) && (point_voiture_y < (point_enemy_y + carHeight)))) {
    		alert("Collision !");
		window.location = "index.html";
	    }
	}
    else{

	    if(((point_enemy_x < (point_voiture_x + carWidth)) && ((point_voiture_x + carWidth) < (point_enemy_x + carWidth)))) {
		if (((point_enemy_y < point_voiture_y) && (point_voiture_y < (point_enemy_y + carHeight)))) {
		alert("Collisition à droite !!!!");
		    window.location = "index.html";   
	       }
	    }
	}

}
