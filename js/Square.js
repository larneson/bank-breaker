function Square(x, y, width, height, src, src2)
{
	// Image
	this.img = new Image();
	this.img.src = src;

	this.jumpImg = new Image();
	this.jumpImg.src = src2;


	//	Size variables
	this.width = width;
	this.height = height;

	//	Position
	this.x = x;
	this.y = y;

	this.speed = 10;

	//	Velocity
	this.vx = 0;
	this.vy = 0;

	//	Acceleration
	this.ax = 0;
	this.ay = 0;

	this.onGround = function()
	{
		if(this.y + this.height >= canvas.height)
			return true;
		else
			return false;
	};

	this.onLeftWall = function()
	{
		if(this.x <= 0)
			return true;
		else
			return false;
	};

	this.onRightWall = function()
	{
		if((this.x + this.width) >= canvas.width)
			return true;
		else
			return false;
	};

	this.update = function()
	{
		//	Apply velocity to position
		this.x += this.vx;
		this.x += SCROLL_SPEED;
		this.y += this.vy;

		//	Apply acceleration to velocity
		this.vx += this.ax;
		this.vy += this.ay;

		//	BOUNDS CHECKING
		if (this.onGround())	//	ON THE GROUND
		{
			this.y = canvas.height - this.height;
			//this.x += SCROLL_SPEED;
		}
		if (this.onRightWall())	//	RIGHT BOUND
		{
			this.x = canvas.width - this.width;
		}
		else if(this.onLeftWall())	//	LEFT BOUND
		{
			this.x = 0;
		}
	};

	//	Default function, to give drawing capabilities must apply draw from main
	this.draw = function()
	{
		console.log("No context has been defined");
	};

//Default: do nothing
	this.collisionEvent = function()
	{
		console.log("Collision");
	}
	this.topCollisionEvent = function()
	{
		this.collisionEvent();
	}

	this.currImage = function()
	{
		if (this.onGround()){
			return this.img;
		} else {
			return this.jumpImg;
		}
	}
}
