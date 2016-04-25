function Obstacle() {
  var height = Math.floor(Math.random() * (150 - 50) + 50);
  Square.apply(this, [canvas.width, canvas.height - height,
    30, height, 'img/building.png']);

  this.collisionEvent = function() {
      reset();
	}
  this.vx = SCROLL_SPEED;

  this.update = function() {
    //	Apply velocity to position
		this.x += this.vx;
    this.vx = SCROLL_SPEED;

    if (this.x + this.height < 0)	//	remove if offscreen
		{
			actors.splice(actors.indexOf(this), 1);
		}

  }

}

Obstacle.prototype = new Square();
