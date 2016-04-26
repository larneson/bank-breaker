//	Objects
var canvas,
	ctx,
	hero;

//	Grid variables
var TILE_S = 16,
	COLS = 64,
	ROWS = 32;

//	"World" variables
var GRAVITY = 1;
var actors = [];
var score = 0;
var SCROLL_SPEED = -2;
var time = 0;
var max_score = 0;


function keyDownHandler(event)
{
	var key = String.fromCharCode(event.keyCode);
	console.log(key);

	switch(key)
	{
		case "W": case "&":
			if (hero.onGround() == true) {
				hero.vy = -20;
			}
			break;
		case "S": case "(":
			break;
		case "A": case "%":
			hero.vx = -hero.speed;
			break;
		case "D": case "'":
			hero.vx = hero.speed;
			break;
	}
}

function keyUpHandler(event)
{
	var key = String.fromCharCode(event.keyCode);

	switch(key)
	{
		case "W":  case "&":
			break;
		case "S": case "(":
			break;
		case "A": case "%":
			hero.vx = 0;
			break;
		case "D": case "'":
			hero.vx = 0;
			break;
	}
}

//	Initializes canvas and actors
function init()
{
	//	Initialize the canvas and context
	canvas = document.getElementById("mainCanvas");
	ctx = canvas.getContext("2d");
	ctx.font = "100pt Verdana";
	canvas.width = TILE_S * COLS;
	canvas.height = TILE_S * ROWS;
	canvas.setAttribute("tabIndex", "0");
	canvas.focus();

	canvas.addEventListener("keydown",keyDownHandler);
	canvas.addEventListener("keyup",keyUpHandler);

	//	Initialize actors

	// Bernie
	hero = new Square(0, 0, 150, 228, 'img/bernie_small.png');
	applyDraw(hero);
	applyGravity(hero, GRAVITY);
	actors.push(hero);

}

//	Main game loop
function loop()
{
	genRandoms();
	updateAll();
	checkCollisions();
	drawAll();
	window.requestAnimationFrame(loop);
	time += 1;

	if (score / 270 > -SCROLL_SPEED) {
		SCROLL_SPEED -= 1;
		hero.speed += 1;
	}
}

function reset()
{
	score = 0;
	SCROLL_SPEED = -2;
	hero.speed = 10;
	hero.x = 0;
	hero.y = 0;
	hero.vx = 0;
	hero.vy = 0;
	hero.ax = 0;
}

// Generates random actors
function genRandoms()
{
	if (time % 100 == 0) {
		random_money = new Donation();
		applyDraw(random_money);
		actors.push(random_money);
	}
	if (time % 750 == 0) {
		random_obstacle = new Obstacle();
		applyDraw(random_obstacle);
		actors.push(random_obstacle);
	}
}

//	Updates all actors on screen
function updateAll()
{
	//	Update actors
	for (i = 0; i < actors.length; ++i) {
		actors[i].update();
	}
}

//	Draws background and all actors on screen
function drawAll()
{
	//	Draw background
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//  Draw score
	ctx.fillStyle = "white";
	if (score > max_score) {
		max_score = score;
	}
	ctx.fillText("Score: " + score + "\nMax: " + max_score, 20, 20);

	//	Call actors' draw methods
	for (i = 0; i < actors.length; ++i) {
		actors[i].draw();
	}
}

//	Applies the draw function to the actor
function applyDraw(actor)
{
	actor.draw = function()
	{
		ctx.drawImage(actor.img, actor.x, actor.y);
	};
}

function checkCollisions() {
	var newActors = [hero];
	for (i = 1; i < actors.length; ++i) {
		if (((hero.x >= actors[i].x
				&& hero.x <= actors[i].x + actors[i].width)
			|| (hero.x + hero.width >= actors[i].x
				&& hero.x + hero.width <= actors[i].x + actors[i].width)
			|| (hero.x + hero.width >= actors[i].x + actors[i].width
				&& hero.x <= actors[i].x))
		&& ((hero.y > actors[i].y
				&& hero.y < actors[i].y + actors[i].height)
			|| (hero.y + hero.height > actors[i].y
				&& hero.y + hero.height < actors[i].y + actors[i].height)
			|| (hero.y + hero.height >= actors[i].y + actors[i].height
				&& hero.y <= actors[i].y))) {
						actors[i].collisionEvent();
		} else {
			newActors.push(actors[i]);
		}
	}
	actors = newActors;
}

function applyGravity(actor, grav)
{
	actor.ay += grav;
}

//	Starting point for program
function main()
{
	init();
	loop();
}

main();
