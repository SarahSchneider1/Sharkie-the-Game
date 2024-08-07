class Poison extends MovableObject {
  IMAGES_POISON = [
    "img/collectable/poison/1.png",
    "img/collectable/poison/2.png",
    "img/collectable/poison/3.png",
    "img/collectable/poison/4.png",
    "img/collectable/poison/5.png",
    "img/collectable/poison/6.png",
    "img/collectable/poison/7.png",
    "img/collectable/poison/8.png",
  ];
  width = 60;
  height = 70;
  offset = {
    top: 25,
    left: 10,
    right: 20,
    bottom: 25,
  };


  constructor(x, y) {
    super();
    this.loadImage('img/collectable/poison/1.png');
    this.loadImages(this.IMAGES_POISON);
    this.x = x;
    this.y = y;
    this.animate();
  }

/**
 * Starts the animation for the object, showing poison images in a loop every 80 milliseconds.
 */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_POISON);
    }, 80);
  }
}
