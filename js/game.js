$(function() {
    var enemy = $('#vehiculeEnemy')[0];
    enemy.style.top = "0px";
    var start = parseInt(enemy.style.top);
    var interval = setInterval(function() {
	start++;
	collision_ui(enemy);
	enemy.style.top = start.toString() + "px";
	if (start == window.innerHeight) {
	    clearInterval(interval);
	    enemy.style.display = "none";
	}
    }, timeInterval);
});

function collision_ui(enemy){
    enemy.style.top;

}
