$(function() {
    var enemy = $('#vehiculeEnemy')[0];
    enemy.style.top = "15px";
    var start = parseInt(enemy.style.top);
    var interval = setInterval(function() {
	start++;
	enemy.style.top = start.toString() + "px";
	if (start == 600) {
	    clearInterval(interval);
	    enemy.style.display = "none";
	}
    }, 10);
});
