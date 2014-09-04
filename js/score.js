
function Score (label)
 {

    points = 0;
    scoreLabel = label;
    this.scoreIntervalID;
}


Score.prototype.increment = function(value)
{
	points += value;
    scoreLabel.textContent = "Score: " + Math.floor( points); 
}

Score.prototype.stop = function()
{
	clearInterval(this.scoreIntervalID);
}

Score.prototype.start = function()
{
	var that = this;

	 this.scoreIntervalID = setInterval(function() {
		that.increment(31.7);
		},200);
}

Score.prototype.getScore = function(){
	return Math.floor(points);
}

