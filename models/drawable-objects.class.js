class DrawableObjects {
  x = 120;
  y = 250;
  height = 150;
  width = 170;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads an image from the specified path and assigns it to the object's img property.
   *
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images from an array of paths and caches them in the imageCache property.
   *
   * @param {string[]} arr - An array of paths to image files.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object's image on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
      console.log("could not load Image,", this.img.src);
    }
  }

/**
 * Draws the hitbox of the object on the canvas.
 * The hitbox is drawn only for specific types of objects.
 * 
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
drawHitbox(ctx) {
  if (this.shouldDrawHitbox()) {
    ctx.beginPath();
    ctx.rect(
      this.x + this.offset.left, 
      this.y + this.offset.top, 
      this.width - this.offset.right, 
      this.height - this.offset.bottom
    );
    ctx.strokeStyle = "red"; // Color of the hitbox border
    ctx.lineWidth = 2; // Width of the hitbox border
    ctx.stroke();
  }
}

/**
 * Determines whether the hitbox should be drawn for this object.
 * 
 * @returns {boolean} - True if the hitbox should be drawn, otherwise false.
 */
shouldDrawHitbox() {
  return this instanceof Character || 
         this instanceof Pufferfish || 
         this instanceof Endboss || 
         this instanceof Jellyfish || 
         this instanceof ShotableObject || 
         this instanceof Poison;
}

}