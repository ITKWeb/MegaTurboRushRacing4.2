
var ennemyFactory;
var voiture;
var  gameMap;
var spawnEnnemiesIntervalID;
var gameIntervalID;
var gauge;
var score;

function buildCard() {
  var div = document.createElement('div');
  div.classList.add('vehiculeEnemy');
  div.classList.add('car');
  return div;
}

function addEnemy() {

  var ennemy = ennemyFactory.createEnnemy();
  ennemy.setTop(random(-carHeight,2* -carHeight));
 
  ennemy.setWidth(carWidth);
  ennemy.setHeight(carHeight);
  
  var collide = false;
    ennemy.setLeft(random(gameMapBorderWidth, gameMapWidth - 2*gameMapBorderWidth));
  do
  {
  
    ennemyFactory.executeOnEnnemies(function(oneEnnemy) {

        if(ennemy != oneEnnemy)
        {
          if( ennemy.collideWith(oneEnnemy))
            ennemy.remove();
        }


    });
  } while(collide)

  ennemy.setVisible(true);
 }


function stopGame()
{
  //On stop les intervals
  clearInterval(gameIntervalID);
  clearInterval(spawnEnnemiesIntervalID);

  //On stop le score et la gauge
  score.stop();
  gauge.stop();

  //On stop les animations
  document.body.classList.remove("bg-animation");
  gameMap.classList.remove("bg-animation");

  //On stop les keys
  window.onkeydown = null;
}

function random(min, max) {
  return Math.floor((Math.random()*max)+min);
}

$(function() {

    window.onkeydown = function(e){
        MouvementPlayer(e.keyCode);
    }

  score = new Score($("#score")[0]);
  score.start();

  gauge = new FuelGauge( $("#progress")[0]);
  gauge.start();

  gameMap = document.getElementsByClassName('road')[0];
  ennemyFactory = new EnnemyFactory(gameMap);

  var voitureDiv = document.getElementById('voiture');
  voitureDiv.style.top = (window.innerHeight - carHeight * 2).toString() + "px";
  voitureDiv.style.left = "0px";

  voiture = new Ennemy(voitureDiv,null);
  voiture.setWidth(carWidth);
  voiture.setHeight(carHeight);
  
   addEnemy();
  
  spawnEnnemiesIntervalID = setInterval(function() {


    if(ennemyFactory.ennemies.length < maxEnememies)
    {
        if(random(0,1000)<20)
            addEnemy();
    }

  },50);

  gameIntervalID = setInterval(function() {


    ennemyFactory.executeOnEnnemies(function(oneEnnemy) {

      //On bouge la caisse
      oneEnnemy.moveTopBy(3);

      if(oneEnnemy.getTop() >=window.innerHeight )
      {
        oneEnnemy.remove();

        //Il doit au moins y avoir minEnemies sur le terrain
        if(ennemyFactory.ennemies.length < minEnememies )
        {
                addEnemy();
        }
   
      }else
      {

          if(oneEnnemy.collideWith(voiture))
          {
            stopGame();
            //window.location = "gameover.html";   
          }
      }

    if (gauge.getValue() ==0 )
    {
      stopGame();
    }

    });
  }, timeInterval);

});
