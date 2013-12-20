function buildCard() {
  var div = document.createElement('div');
  div.classList.add('vehiculeEnemy');
  div.classList.add('car');
  return div;
}

function addEnemy() {
  var div = document.createElement('div');
  div.classList.add('vehiculeEnemy');
  div.classList.add('car');
  document.getElementsByClassName('road')[0].appendChild(div);
  var top = 0;
  var left = random(0, 600);
  function updatePosition() {
    div.style.top = top + 'px';
    div.style.left = left + 'px';
  }
  updatePosition();
  return {
    moveTopBy: function(t) {
      top = top + t;
      updatePosition();
      return top;
    },
    die: function() {
      document.getElementsByClassName('road')[0].removeChild(div);
    },
    left: function() {
      return left;
    },
    top: function() {
      return top;
    }
  };
}

function random(min, max) {
  return Math.floor((Math.random()*max)+min);
}

$(function() {
  var enemy = addEnemy();
  
  var voiture = document.getElementById('voiture');
  voiture.style.top = (window.innerHeight - carHeight * 2).toString() + "px";
  voiture.style.left = "0px";

  var interval = setInterval(function() {
    var start = enemy.moveTopBy(3);
    collision_ui(voiture, enemy);
    if (start >= window.innerHeight) {
        //clearInterval(interval);
        enemy.die();
        enemy = addEnemy();
    }
  }, timeInterval);
});

function intersectRect(a, b) {
  return (a.left <= b.right &&
          b.left <= a.right &&
          a.top <= b.bottom &&
          b.top <= a.bottom)
}

function collision_ui(voiture, enemy){
  var p_enemy = {
    left: enemy.left(),
    right: (enemy.left() + carWidth),
    top: enemy.top(),
    bottom: (enemy.top() + carHeight)
  };

  var p_voiture = {
    left: parseInt(voiture.style.left),
    right: (parseInt(voiture.style.left, 10) + carWidth),
    top: parseInt(voiture.style.top),
    bottom: (parseInt(voiture.style.top, 10) + carHeight)
  };

  if(intersectRect(p_enemy, p_voiture)) {
    window.location = "gameover.html";   
  }
}
