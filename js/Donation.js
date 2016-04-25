function Donation() {
  Square.apply(this, [canvas.width,
    Math.floor(Math.random() * (canvas.height - 50)),45, 21, 'img/large_money.png']);

  this.collisionEvent = function() {
			score += 27;
	}
  this.vx = SCROLL_SPEED * 2;

  this.update = function() {
    //	Apply velocity to position
		this.x += this.vx;
    this.vx = SCROLL_SPEED * 2;

    if (this.x + this.height < 0)	//	remove if offscreen
		{
			actors.splice(actors.indexOf(this), 1);
		}

  }

}
Donation.prototype = new Square();
