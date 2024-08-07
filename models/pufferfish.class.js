class Pufferfish extends MovableObject {
  height = 80;
  width = 80;
  IMAGES_IDLE = [
    "img/2.Enemy/pufferfish/1.Swim/1.swim1.png",
    "img/2.Enemy/pufferfish/1.Swim/1.swim2.png",
    "img/2.Enemy/pufferfish/1.Swim/1.swim3.png",
    "img/2.Enemy/pufferfish/1.Swim/1.swim4.png",
    "img/2.Enemy/pufferfish/1.Swim/1.swim5.png",
  ];

  IMAGES_DEAD = ["img/2.Enemy/pufferfish/4.die/1.Dead.png"];

  offset = {
    top: 5,
    left: 0,
    right: 0,
    bottom: 23,
  };

  constructor() {
    super().loadImage("img/2.Enemy/pufferfish/1.Swim/1.swim1.png");
    this.x = this.randomPositionX();
    this.y = this.randomPositionY();
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = this.randomSpeed();
    this.animate();
  }

  /**
   * Starts animations for the object, including swimming and moving.
   */
  animate() {
    this.moveAnimation();
    this.swimAnimation();
  }

  /**
   * Runs the swimming animation by changing images every 100 milliseconds.
   */
  swimAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
    }, 1000 / 10);
  }

  /**
   * Gets a random Y position within a specific range.
   * @returns {number} - Random Y position.
   */
  randomPositionY() {
    return 30 + Math.floor(Math.random() * 380);
  }

  /**
   * Gets a random X position within a specific range.
   * @returns {number} - Random X position.
   */
  randomPositionX() {
    return 820 + Math.floor(Math.random() * 3580);
  }

  /**
   * Gets a random speed within a specific range.
   * @returns {number} - Random speed.
   */
  randomSpeed() {
    return 0.3 + Math.random() * 0.9;
  }

  /**
   * Moves the object left continuously at a certain speed.
   */
  moveAnimation() {
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  /**
   * Shows the dead animation and moves the dead fish.
   * @param {boolean} otherDirection - If true, move the dead fish in the opposite direction.
   */
  deadAnimation(otherDirection) {
    this.width = 60;
    this.height = 60;
    setInterval(() => {
      this.img.src = this.IMAGES_DEAD[0];
      this.speed = 0;
      this.moveDeadFish(otherDirection);
    }, 1);
  }

  /**
   * Moves the dead fish left or right.
   * @param {boolean} otherDirection - If true, move the dead fish in the opposite direction.
   */
  moveDeadFish(otherDirection) {
    if (!otherDirection) {
      this.moveRight(1);
    } else {
      this.moveLeft(1);
    }
    this.y -= 1;
  }
}
