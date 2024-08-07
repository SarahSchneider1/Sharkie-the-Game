class Jellyfish extends MovableObject {
  height = 80;
  width = 80;
  IMAGES_IDLE = [
    "img/2.Enemy/Jelly fish/Regular damage/Yellow 1.png",
    "img/2.Enemy/Jelly fish/Regular damage/Yellow 2.png",
    "img/2.Enemy/Jelly fish/Regular damage/Yellow 3.png",
    "img/2.Enemy/Jelly fish/Regular damage/Yellow 4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/Jelly fish/Dead/Yellow/y1.png",
    "img/2.Enemy/Jelly fish/Dead/Yellow/y2.png",
    "img/2.Enemy/Jelly fish/Dead/Yellow/y3.png",
    "img/2.Enemy/Jelly fish/Dead/Yellow/y4.png",
  ];

  offset = {
    top: 10,
    left: 8,
    right: 15,
    bottom: 20,
  };

  isShot = false;

  constructor(x) {
    super();
    this.loadImage("img/2.Enemy/Jelly fish/Regular damage/Yellow 1.png");
    this.x = x;
    this.y = 40 + Math.random() * 410;
    this.startMovePosition = this.y;
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.move();
    this.speed = 0.2 + Math.random() * 0.5;
    this.down = true;
  }

  /**
   * Initiates the continuous animation loop for the ShotableObject.
   */
  animate() {
    this.move();
    setInterval(() => {
      if (this.isShot) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {}, 200);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 150);
  }

  /**
   * Initiates the continuous movement animation for the ShotableObject.
   */
  move() {
    setInterval(() => {
      if (this.isShot) {
        if (this.y > -70) {
          this.moveUp(1);
        }
      } else {
        if (this.y + this.height >= 450) {
          this.up = true;
          this.down = false;
        } else if (this.y <= 50) {
          this.up = false;
          this.down = true;
        }
        this.moveUpAndDown(this.speed);
      }
    }, 1000 / 60);
  }
}
