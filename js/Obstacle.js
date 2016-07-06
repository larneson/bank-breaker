function Obstacle() {
  var height = Math.floor(Math.random() * (150 - 50) + 50);
  Square.apply(this, [canvas.width, canvas.height - height,
    100, height, 'img/building.png', 'img/building.png']);

  this.collisionEvent = function() {
			reset();
	}
  this.vx = SCROLL_SPEED;

  this.update = function() {
    //	Apply velocity to position
		this.x += this.vx;
    this.vx = SCROLL_SPEED;

    if (this.x + this.width < 0)	//	remove if offscreen
		{
			actors.splice(actors.indexOf(this), 1);
		}

  }

  this.topCollisionEvent = function() {
    score += 81;
  }

}

Obstacle.prototype = new Square();

function TrumpTowers () {
  Obstacle.apply(this, []);
  this.topCollisionEvent = function() {
    trump_count += 1;
    if (jump_height > MAX_JUMP_HEIGHT) {
      jump_height -= 1;
    }
  }
  this.img = new Image();
	this.img.src = 'img/trump_towers.png';
}
TrumpTowers.prototype = new Obstacle();

function TrumpBoss() {
  Square.apply(this, [canvas.width, canvas.height - 250,
    140, 250, 'img/trump_boss.png', 'img/trump_boss.png']);

    this.collisionEvent = function() {
  			reset();
  	}
    this.vx = SCROLL_SPEED;

    this.update = function() {
      //	Apply velocity to position
  		this.x += this.vx;
      this.vx = SCROLL_SPEED;

      if (this.x + this.width < 0)	//	remove if offscreen
  		{
  			actors.splice(actors.indexOf(this), 1);
  		}

    }

    this.topCollisionEvent = function() {
      score += 1000000;
      togglePause();
    }
}
TrumpBoss.prototype = new Square();
