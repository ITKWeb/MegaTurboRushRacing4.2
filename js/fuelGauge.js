
function FuelGauge (element) {

    this.gauge =element;
    this.fuelIntervalID;
}


FuelGauge.prototype.decreaseFuelBy = function(value){
	this.gauge.value = Math.max(this.gauge.value - value,0);
}

FuelGauge.prototype.getValue = function(){
	return this.gauge.value;
}

FuelGauge.prototype.setValue = function(v){
	this.gauge.value = v;
}


FuelGauge.prototype.stop = function()
{
	clearInterval(this.fuelIntervalID);
}

FuelGauge.prototype.start = function()
{
	var that = this;
	 this.fuelIntervalID = setInterval(function() {

		that.decreaseFuelBy(1);
		},200);
}