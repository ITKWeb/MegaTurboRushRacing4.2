function FuelFactory(theMap)
{
	this.fuels = new Array();
	this.fuelCounter = 0;
	this.map = theMap;
}

FuelFactory.prototype.createFuel = function()
{
	//On créé le nom
	var fuelName = "fuel" + (this.fuelCounter++);
	
	//On créé la div
	var div = document.createElement('div');
	div.setAttribute("id",fuelName);
	div.classList.add('fuel');
	//div.style.display = 'none';
		
	//On ajoute la div au terrain de jeu
	this.map.appendChild(div);

	//On créé l'objet ennemy
	fuel = new Fuel(div,this);

	//On l'ajoute au tableau des ennemies
	this.fuels.push(fuel);

	return fuel;
}

FuelFactory.prototype.executeOnFuels = function(oneFunction)
{
		this.fuels.forEach(function (val, index, theArray) {
   		 oneFunction(val);
		});
}

FuelFactory.prototype.removeFuel = function(myFuel)
{
	//On delete la div
	myFuel.element.parentNode.removeChild(myFuel.getElement());

	//On delete l'ennemy du tableau
	var index  = this.fuels.indexOf(myFuel);
	this.fuels.splice(index, 1);
}


function Fuel(theElement,theFactory)
{
	this.factory = theFactory;
	this.element = theElement;
	this.speed = 0;
}

Fuel.prototype.getElement = function()
{
 	return this.element;
}

Fuel.prototype.remove = function()
{
 	this.factory.removeFuel(this);
}

Fuel.prototype.getLeft = function()
{
	var left = this.element.style.left;
 	return parseInt(left.substring(0,left.length - 2));
}

Fuel.prototype.setLeft = function(value)
{
 	this.element.style.left = value +"px";
}

Fuel.prototype.getTop = function()
{
	var top = this.element.style.top;
 	return parseInt(top.substring(0,top.length - 2));
}

Fuel.prototype.setTop = function(value)
{
 	this.element.style.top = value +"px";
}

Fuel.prototype.getWidth = function()
{
	var width = this.element.style.width;
 	return parseInt(width.substring(0,width.length - 2));
}

Fuel.prototype.setWidth = function(value)
{
 	this.element.style.width = value +"px";
}

Fuel.prototype.getHeight = function()
{
	var height = this.element.style.height;
 	return parseInt(height.substring(0,height.length - 2));
}

Fuel.prototype.setHeight = function(value)
{
 	this.element.style.height = value +"px";
}

Fuel.prototype.moveTopBy = function(value)
{
	var top = this.getTop();
 	top = top + value;
 	this.setTop(top);
}

Fuel.prototype.isVisible = function()
{
	return (this.element.style.display != 'none');
}

Fuel.prototype.setVisible = function(value)
{
	this.element.style.display = value ? 'block' : 'none';
}

Fuel.prototype.collideWith = function(object)
{
	return (this.getLeft() <= object.getLeft() + object.getWidth() &&
          object.getLeft() <= this.getLeft() + this.getWidth() &&
          this.getTop() <=  object.getTop() + object.getHeight() &&
          object.getTop() <= this.getTop() + this.getHeight());

}