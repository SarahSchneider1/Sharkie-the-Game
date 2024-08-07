class MovableObject extends DrawableObjects {
  speed = 0.2;
  otherDirection = false;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  healthPoints = 100;
  lastHit = 0;
  height;
  width;
  up = false;
  down = false;

  /**
   * Checks if this object is colliding with another object.
   *
   * @param {Object} mo - The other object to check for collision.
   * @returns {boolean} True if there is a collision, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.left + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.y + this.offset.top + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.x + this.offset.left <= mo.x + mo.offset.left + mo.width - mo.offset.right &&
      this.y + this.offset.top <= mo.y + mo.offset.top + mo.height - mo.offset.bottom
    );
  }

  /**
   * Checks if this object is near another object based on a defined space.
   *
   * @param {Object} mo - The other object to check proximity.
   * @returns {boolean} True if the objects are near, false otherwise.
   */
  isNearToSharkie(mo) {
    let spaceX = 40;
    let spaceY = 10;
    return (
      this.x + this.offset.left + this.width - this.offset.right + spaceX >= mo.x + mo.offset.left &&
      this.y + this.offset.top + this.height - this.offset.bottom + spaceY >= mo.y + mo.offset.top &&
      this.x + this.offset.left - spaceX <= mo.x + mo.offset.left + mo.width - mo.offset.right &&
      this.y + this.offset.top <= mo.y + mo.offset.top + mo.height - mo.offset.bottom
    );
  }

  /**
   * Handles the logic for a hit on this object, including playing the hurt audio and updating health points.
   */
  hit() {
    hurtAudio();
    this.healthPoints -= 5;
    if (this.healthPoints <= 0) {
      this.healthPoints = 0;
    } else {
      this.lastHit = new Date().getTime(); // Save the time of the hit
    }
  }

  /**
   * Checks if this object is in a hurt state based on the time passed since the last hit.
   *
   * @returns {boolean} True if the object is in a hurt state, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Calculate the time difference from the last hit
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if this object is dead based on its health points.
   *
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.healthPoints === 0;
  }

  /**
   * Plays the next frame of animation from the provided array of images.
   *
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks if a specified action occurred within a certain time period.
   *
   * @param {number} timeInSek - The time period to check against in seconds.
   * @param {number} action - The timestamp of the action.
   * @returns {boolean} True if the action occurred within the specified time period, false otherwise.
   */
  checkLastMove(timeInSek, action) {
    let timePassed = new Date().getTime() - action; // Calculate the time difference from the last move
    timePassed = timePassed / 1000;
    return timePassed < timeInSek;
  }

  /**
   * Moves the object to the right by the specified speed.
   *
   * @param {number} speed - The speed of the movement.
   */
  moveRight(speed) {
    this.x += speed;
  }

  /**
   * Moves the object to the left by the specified speed.
   *
   * @param {number} speed - The speed of the movement.
   */
  moveLeft(speed) {
    this.x -= speed;
  }

  /**
   * Moves the object upward by the specified speed.
   *
   * @param {number} speed - The speed of the movement.
   */
  moveUp(speed) {
    this.y -= speed;
  }

  /**
   * Moves the object downward by the specified speed.
   *
   * @param {number} speed - The speed of the movement.
   */
  moveDown(speed) {
    this.y += speed;
  }

  /**
   * Moves the object upward and downward based on its state (up or down) and the specified speed.
   *
   * @param {number} speed - The speed of the movement.
   */
  moveUpAndDown(speed) {
    if (this.up) {
      this.moveUp(speed);
    }
    if (this.down) {
      this.moveDown(speed);
    }
  }
}
