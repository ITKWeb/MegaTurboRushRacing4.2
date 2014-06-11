
function Score (label)
 {

    points = 0;
    scoreLabel = label;
    this.scoreIntervalID;
}


Score.prototype.increment = function(value)
{
	points += value;
    scoreLabel.textContent = "SCORE: " + points; 
}

Score.prototype.stop = function()
{
	clearInterval(this.scoreIntervalID);
}

Score.prototype.start = function()
{
	var that = this;

	 this.scoreIntervalID = setInterval(function() {
		that.increment(100);
		},200);
}

