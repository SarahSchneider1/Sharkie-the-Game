class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates an object with an image from the given path and an initial x position.
   *
   * @param {string} imagePath - The path to the image.
   * @param {number} x - The starting x position of the object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
