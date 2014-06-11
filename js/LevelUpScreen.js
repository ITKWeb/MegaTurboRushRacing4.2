
function LevelUpScreen(element)
{
	this.element = element;

}

LevelUpScreen.prototype.isVisible = function()
{
	return (this.element.style.display != 'none');
}

LevelUpScreen.prototype.setVisible = function(value)
{
	this.element.style.display = value ? 'block' : 'none';
}

LevelUpScreen.prototype.show = function()
{
	this.setVisible(true);

	var that = this;
	window.setTimeout(function(){that.hide();},levelUpScreenUpTime);
}

LevelUpScreen.prototype.hide = function()
{
	this.setVisible(false);
}