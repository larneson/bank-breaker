window.onload = function(e) {

  var canvas = document.getElementById("mainCanvas");
  canvas.width = 600;
  canvas.height = 300;
  var context = canvas.getContext("2d");

  var bernieImage = new Image();
  bernieImage.src = "/Users/linneaarneson/bank-breaker/img/BernieSandersLarge.png";

  /*
  bernieImage.onload = function(){
    ctx.drawImage(bernieImage, 10, 10, 100, 100);
  }*/



  var Sprite = function(options) {

      this.width = options.width;
      this.height = options.height;
      this.image = options.image;

      this.dx = options.dx;
      this.dy = options.dy;

      this.render = function() {
        //console.log(this.image);

        this.image.onload = function() {
          context.drawImage(
            //this.image,
            bernieImage,
            this.dx,
            this.dy,
            this.width,
            this.height
          )
        }
      }
      this.update = function () {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
        	tickCount = 0;
          // Go to the next frame
          frameIndex += 1;
        }
       };
  }


  var bernie = new Sprite({
      width: 50,
      height: 50,
      image: bernieImage,
      dx: 10,
      dy: canvas.height - 50 - 10
  });

  bernie.jump = function() {
    var jumpHeight = 100;
    while (bernie.dy > jumpHeight) {
      bernie.dy = jumpHeight;
      bernie.render();
    }
  }

  bernie.render();

  window.onkeyup = function(e) {
     var key = e.keyCode ? e.keyCode : e.which;

     if (key == 32) { //space
         bernie.jump();
     }
  }








}
  //source for sprite code: http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
  //source for bernie sanders image http://www.gilmerfreepress.net/images/upload1/BernieSanders.png
