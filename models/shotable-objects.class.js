class ShotableObject extends MovableObject {
  IMAGES_;
  speed = 5;
  offset = {
    top: 5,
    left: 5,
    right: 10,
    bottom: 10,
  };

  constructor(x, y) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
    this.width = 30;
    this.height = 30;
    this.x = x;
    this.y = y;
    this.bubbling();
  }

  /**
   * Starts the bubbling behavior, including checking direction and shooting bubbles.
   */
  bubbling() {
    this.checkDirection();
    this.bubbleShot();
  }

  /**
   * Moves the bubble continuously along the X-axis at the set speed.
   */
  bubbleShot() {
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 60);
  }

  /**
   * Checks the direction of the character and adjusts the bubble's speed and starting position if needed.
   */
  checkDirection() {
    if (world.character.otherDirection) {
      this.speed = -this.speed;
      this.x = this.x - 150;
    }
  }
}
