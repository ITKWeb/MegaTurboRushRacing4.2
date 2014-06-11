
//Class EnnemyFactory
function EnnemyFactory(theMap)
{
	this.ennemies = new Array();
	this.ennemyCounter = 0;
	this.map = theMap;
}

EnnemyFactory.prototype.createEnnemy = function()
{
	//On créé le nom
	var ennemyName = "mechant" + (this.ennemyCounter++);
	
	//On créé la div
	var div = document.createElement('div');
	div.setAttribute("id",ennemyName);
	div.classList.add('vehiculeEnemy');
	div.classList.add('car');
	div.style.display = 'none';
	div.style.backgroundColor ='#'+Math.floor(Math.random()*16777215).toString(16);
		
	//On ajoute la div au terrain de jeu
	this.map.appendChild(div);

	//On créé l'objet ennemy
	ennemy = new Ennemy(div,this);

	//On l'ajoute au tableau des ennemies
	this.ennemies.push(ennemy);

	return ennemy;
}

EnnemyFactory.prototype.executeOnEnnemies = function(oneFunction)
{
		this.ennemies.forEach(function (val, index, theArray) {
   		 oneFunction(val);
		});
}


EnnemyFactory.prototype.removeEnnemy = function(ennemy)
{
	//On delete la div
	ennemy.element.parentNode.removeChild(ennemy.getElement());

	//On delete l'ennemy du tableau
	var index  = this.ennemies.indexOf(ennemy);
	this.ennemies.splice(index, 1);
}

//Class Ennemy
function Ennemy(theElement,theFactory)
{
  this.factory = theFactory;
  this.speed = 0;
	this.element = theElement;
//	this.element.style.width =this.element.offsetWidth +"px";
//	this.element.style.height =this.element.offsetHeight +"px";
}

Ennemy.prototype.getElement = function()
{
 	return this.element;
}


Ennemy.prototype.remove = function()
{
 	this.factory.removeEnnemy(this);
}

Ennemy.prototype.getLeft = function()
{
	var left = this.element.style.left;
 	return parseInt(left.substring(0,left.length - 2));
}

Ennemy.prototype.setLeft = function(value)
{
 	this.element.style.left = value +"px";
}

Ennemy.prototype.getTop = function()
{
	var top = this.element.style.top;
 	return parseInt(top.substring(0,top.length - 2));
}

Ennemy.prototype.setTop = function(value)
{
 	this.element.style.top = value +"px";
}

Ennemy.prototype.getWidth = function()
{
	var width = this.element.style.width;
 	return parseInt(width.substring(0,width.length - 2));
}

Ennemy.prototype.setWidth = function(value)
{
 	this.element.style.width = value +"px";
}

Ennemy.prototype.getHeight = function()
{
	var height = this.element.style.height;
 	return parseInt(height.substring(0,height.length - 2));
}

Ennemy.prototype.setHeight = function(value)
{
 	this.element.style.height = value +"px";
}

Ennemy.prototype.moveTopBy = function(value)
{
	var top = this.getTop();
 	top = top + value;
 	this.setTop(top);
}

Ennemy.prototype.isVisible = function()
{
	return (this.element.style.display != 'none');
}

Ennemy.prototype.setVisible = function(value)
{
	this.element.style.display = value ? 'block' : 'none';
}

Ennemy.prototype.collideWith = function(object)
{
	return (this.getLeft() <= object.getLeft() + object.getWidth() &&
          object.getLeft() <= this.getLeft() + this.getWidth() &&
          this.getTop() <=  object.getTop() + object.getHeight() &&
          object.getTop() <= this.getTop() + this.getHeight());

}