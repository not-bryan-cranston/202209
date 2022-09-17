const random = (upper) => Math.round(Math.random()*upper)
new p5(function (sketch) {
    var images = [];
    var imageIndex = 0;
    const width = 150
    var position = sketch.createVector(0, 0);
    var velocity = p5.Vector.fromAngle(45);
    velocity.mult(5);
  
    /**
     * Checks boundary collision.
     *
     * @param {p5.Image} image
     * @return {boolean}
     */
    function checkBoundaryCollision(image) {
      var hasCollision = false;
  
      // left or right collision
      if (position.x < 0 || position.x + image.width > sketch.width) {
        velocity.x *= -1;
        hasCollision = true;
      }
  
      // top or bottom collision
      if (position.y < 0 || position.y + image.height > sketch.height) {
        velocity.y *= -1;
        hasCollision = true;
      }
  
      return hasCollision;
    }
  
    /**
     * Preload.
     */
    sketch.preload = function () {
      for (var i = 1; i < 8; i++) {
        // var image = sketch.loadImage("Untitled_Artwork.jpg");
       
            let img = new p5.Image(100, 100); // same as new p5.Image(100, 100);
            img.loadPixels();
            // p5.createCanvas(100, 100);
            // p5.background(0);
          
            // helper for writing color to array
            function writeColor(image, x, y, red, green, blue, alpha) {
              let index = (x + y * width) * 4;
              image.pixels[index] = red;
              image.pixels[index + 1] = green;
              image.pixels[index + 2] = blue;
              image.pixels[index + 3] = alpha;
            }
          
            let x, y;
            // fill with random colors
            for (y = 0; y < img.height; y++) {
              for (x = 0; x < img.width; x++) {
                let red = random(255);
                let green = random(255);
                let blue = random(255);
                let alpha = 255;
                writeColor(img, x, y, red, green, blue, alpha);
              }
            }
          
            // draw a red line
            y = 0;
            for (x = 0; x < img.width; x++) {
            writeColor(img, x, y, 255, 0, 0, 255);
            }
          
            // draw a green line
            y = img.height - 1;
            for (x = 0; x < img.width; x++) {
                writeColor(img, x, y, 0, 255, 0, 255);
            }
          
            img.updatePixels();
            //const image = image(img, 0, 0);
          
        images.push(img);
      }

     
    };
  
    /**
     * Setup.
     */
    sketch.setup = function () {
        
      sketch.createCanvas(window.innerWidth/2,window.innerHeight/2);
    };
  
    /**
     * Draw.
     */
    sketch.draw = function () {
      sketch.background("#111");
      var image = images[imageIndex];
      var hasCollision = checkBoundaryCollision(image);
      if (hasCollision) {
        console.log('hasCollision',imageIndex)
        
        imageIndex++;
        if (imageIndex + 1 > images.length) {
          imageIndex = 0;
        }
        image = images[imageIndex];
      }
      position.add(velocity);
      sketch.image(image, position.x, position.y);
    };
  });


  let img;
let vid;
let vid2;
let theta = 0;
let img3
let img4

function setup() {
    createCanvas(window.innerWidth/2,window.innerHeight/2, WEBGL);
  //createCanvas(710, 400, WEBGL);

  img = loadImage('2.jpg');
  img3 = loadImage('3.jpg');
  img4 = loadImage('4.jpg');
//   console.log((Math.random() > .5 ?'1':'2')+'.webm')
//   vid = createVideo(['1.webm']);
//   vid.elt.muted = false;
//   vid.loop();
  //vid.hide();
}

function draw() {
  background(250);
  translate(-220, 0, 0);
  push();
  rotateZ(theta * mouseX * 0.001);
  rotateX(theta * mouseX * 0.001);
  rotateY(theta * mouseX * 0.001);
  //pass image as texture
  texture(img3);
  sphere(150);
  pop();


  translate(0, 100, 50);
  push()
  rotateZ(theta * mouseX * 0.0001);
  rotateX(theta * mouseX * 0.0001);
  rotateY(theta * mouseX * 0.00001);
  //pass image as texture
  texture(img4);
  sphere(165);
  pop();
 
 
  translate(440, 0, 0);
  push();
  rotateZ(theta * 0.1);
  rotateX(theta * 0.1);
  rotateY(theta * 0.1);
  texture(img);
  box(100, 100, 100);
  pop();
  theta += 0.05;
}