
var ennemyFactory;
var fuelFactory;
var voiture;
var  gameMap;
var spawnEnnemiesIntervalID;
var gameIntervalID;
var levelUpIntervalID;
var gauge;
var score;
var gameOverScreen;
var gameSpeed;
var level;
var levelElement;
var levelUpScreen;
var explosionElement;
var konamiElement;
 var keys = [];

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
  //ennemy.setLeft(random(gameMapBorderWidth, gameMapWidth - 2*gameMapBorderWidth));

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

 function addFuel()
 {

  var fuel = fuelFactory.createFuel();
  fuel.setTop(random(-fuelHeight,2* -fuelHeight));

  fuel.setWidth(fuelWidth);
  fuel.setHeight(fuelHeight);

  fuel.setLeft(random(gameMapBorderWidth, gameMapWidth - 2*gameMapBorderWidth));

 }

function stopGame()
{
  //On stop les intervals
  clearInterval(gameIntervalID);
  clearInterval(spawnEnnemiesIntervalID);
  clearInterval(levelUpIntervalID);

  //On stop le score et la gauge
  score.stop();
  gauge.stop();

  //On stop les animations
  document.body.classList.remove("bg-animation");
  gameMap.classList.remove("bg-animation");

  //On stop les keys
  window.onkeydown = null;

  gameOverScreen.show();
}

function random(min, max) {
  return Math.floor((Math.random()*max)+min);
}

function onKeyDown(e)
{
    //Traite les touches pour la voiture
    MouvementPlayer(e.keyCode);

    //Ajoute une touche
    keys.push(e.keyCode);

    //Test si les touches correspondent au konami code
    if (keys.toString().indexOf(konami) >= 0) 
    {
        konamiElement.style.display ='block';
        keys = [];
    };
    
}

$(function() {

    window.onkeydown = onKeyDown;


  //Instanciation des objets

  levelUpScreen = new LevelUpScreen($("#levelUpDiv")[0]);

  explosionElement = $("#explosionImg")[0];
  levelElement =$("#levelDiv")[0];
  konamiElement = $("#watImg")[0];

  score = new Score($("#score")[0]);
  score.start();

  gauge = new FuelGauge( $("#progress")[0]);
  gauge.start();

  gameOverScreen = new GameOverScreen($("#gameOverDiv")[0]);

  gameMap = document.getElementsByClassName('road')[0];
  ennemyFactory = new EnnemyFactory(gameMap);
  fuelFactory = new FuelFactory(gameMap);

  var voitureDiv = document.getElementById('voiture');
  voitureDiv.style.top = (window.innerHeight - carHeight * 2).toString() + "px";
  voitureDiv.style.left = "0px";

  voiture = new Ennemy(voitureDiv,null);
  voiture.setWidth(carWidth);
  voiture.setHeight(carHeight);
  
  level = 1;
  gameSpeed = 3;
  levelElement.textContent = "Level 1";

  //On ajoute le premier ennemi manuellement
  addEnemy();
 
 
  initSpawnEnnemiesInterval();
  initGameInterval();
  initLevelUpInterval();

   

});


function levelUp()
{
  level = level + 1;
  gameSpeed = gameSpeed + 0.75;
  levelElement.textContent = "Level " + level;
  levelUpScreen.show();
}


function initLevelUpInterval()
{
  levelUpIntervalID = setInterval(function()
  {
    levelUp();
  },levelUpInterval);
}

function initSpawnEnnemiesInterval()
{

 spawnEnnemiesIntervalID = setInterval(function() {


    if(ennemyFactory.ennemies.length < maxEnememies)
    {
        if(random(0,1000)<20)
            addEnemy();
    }

    if(fuelFactory.fuels.length < maxFuels)
    {
        if(random(0,1000)<10){
            addFuel();
        }
    }
  },50);
}

//Save the best score into the browser sessionstorage
function saveScore(score){
  var displayBest;

  if(typeof sessionStorage.score=='undefined') {
     sessionStorage.setItem("score", score);
     displayBest = score;
	 $("#labelScore")[0].innerHTML = "<div class=\"highestScore beatHighestScore\">NEW BEST SCORE</div>";
  }
  else{
      if(score > sessionStorage.score){
        sessionStorage.setItem("score", score);
        $("#labelScore")[0].innerHTML = "<div class=\"highestScore beatHighestScore\">NEW BEST SCORE</div>";
      }
      displayBest = sessionStorage.score;
  }
  
  $("#bestScore")[0].innerHTML = displayBest;
}

function initGameInterval()
{
   gameIntervalID = setInterval(function() {


    ennemyFactory.executeOnEnnemies(function(oneEnnemy) {

      //On bouge la caisse
      oneEnnemy.moveTopBy(gameSpeed);

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
            
            saveScore(score.getScore());
            stopGame();
           
            explosionElement.style.top = voiture.getTop() - 40 + "px";
            explosionElement.style.left = voiture.getLeft() - 40 + "px";
             explosionElement.style.display ='block';
            //voiture.setVisible(false);

            //window.location = "gameover.html";   
          }
      }

      if (gauge.getValue() ==0 )
      {
        saveScore(score.getScore());
        stopGame();
      }

    });

  fuelFactory.executeOnFuels(function(oneFuel) {

      //On bouge la caisse
      oneFuel.moveTopBy(3);

      if(oneFuel.getTop() >=window.innerHeight )
      {
        oneFuel.remove();
   
      }
      else
      {

          if(oneFuel.collideWith(voiture))
          {
            oneFuel.remove();
            gauge.increaseFuelBy(50);
          }
      }
    });

  }, timeInterval);
}
