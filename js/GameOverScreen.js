
function GameOverScreen(element)
{
	this.element = element;

}

GameOverScreen.prototype.isVisible = function()
{
	return (this.element.style.display != 'none');
}

GameOverScreen.prototype.setVisible = function(value)
{
	this.element.style.display = value ? 'block' : 'none';
}

GameOverScreen.prototype.show = function()
{
	this.setVisible(true);
}

GameOverScreen.prototype.hide = function()
{
	this.setVisible(false);
}
