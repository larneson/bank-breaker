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
var trump_count = 0;
var MAX_SCROLL_SPEED = -10;
var jump_height = -20;
var MAX_JUMP_HEIGHT = -30;
var paused = false;


function keyDownHandler(event)
{
	var key = String.fromCharCode(event.keyCode);

	switch(key)
	{
		case "W": case "&":
			if (hero.onGround() == true) {
				hero.vy = jump_height;
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
	hero = new Square(0, 0, 150, 228, 'img/Bernie.png', "img/BernieJumping.png");
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

	if (score / 270 > -SCROLL_SPEED && SCROLL_SPEED > MAX_SCROLL_SPEED) {
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
	trump_count = 0;
}

// Generates random actors
function genRandoms()
{
	if (time % 100 == 0) {
		random_money = new Donation();
		applyDraw(random_money);
		actors.push(random_money);
	}
	if ((time / -2 * SCROLL_SPEED) % 500 == 0) {
		if (trump_count == 10) {
			random_obstacle = new TrumpBoss();
			trump_count = 0;
		} else {
			var rand = Math.random();
			if (rand < 0.30) {
				random_obstacle = new TrumpTowers();
			} else {
				random_obstacle = new Obstacle();
			}
		}
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
	if (trump_count > 0) {
		ctx.fillText(10 - trump_count + " Trump Towers left!", canvas.width - 80, 20);
	}

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
		ctx.drawImage(actor.currImage(), actor.x, actor.y);
	};
}

function checkCollisions() {
	var newActors = [hero];
	for (i = 1; i < actors.length; ++i) {
		if (isTopCollided(hero, actors[i])) {
					actors[i].topCollisionEvent();

		} else if (isCollided(hero, actors[i])) {
							actors[i].collisionEvent();
		} else {
			newActors.push(actors[i]);
		}
	}
	actors = newActors;
}

function isTopCollided(a1, a2){
	return (((a1.x >= a2.x
			&& a1.x <= a2.x + a2.width)
		|| (a1.x + a1.width >= a2.x
			&& a1.x + a1.width <= a2.x + a2.width)
		|| (a1.x + a1.width >= a2.x + a2.width
			&& a1.x <= a2.x))
	&& (a1.y + a1.height > a2.y
		&& a1.y + a1.height < a2.y + a2.height)
	&& a1.vy >= 0);
}

function isCollided(a1, a2) {
	return (((a1.x >= a2.x
				&& a1.x <= a2.x + a2.width)
			|| (a1.x + a1.width >= a2.x
				&& a1.x + a1.width <= a2.x + a2.width)
			|| (a1.x + a1.width >= a2.x + a2.width
				&& a1.x <= a2.x))
		&& ((a1.y > a2.y
				&& a1.y < a2.y + a2.height)
			|| (a1.y + a1.height > a2.y
				&& a1.y + a1.height < a2.y + a2.height)
			|| (a1.y + a1.height >= a2.y + a2.height
				&& a1.y <= a2.y)))
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

function togglePause(){
	paused = !paused;
}

main();
