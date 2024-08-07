class StatusbarEnbossLife extends DrawableObjects {
  IMAGES_STATUSBAR = [
    "img/collectable/statusbar/lifeStatusEndboss0.png",
    "img/collectable/statusbar/lifeStatusEndboss20.png",
    "img/collectable/statusbar/lifeStatusEndboss60.png",
    "img/collectable/statusbar/lifeStatusEndboss100.png",
  ];

  percentage = 15;

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.x = 440;
    this.y = -40;
    this.width = 160;
    this.height = 40;
    this.setPercentage(15);
  }

  /**
   * Sets the percentage and updates the image based on the resolved index.
   *
   * @param {number} percentage - The percentage value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index for selecting the appropriate image based on the percentage value.
   *
   * @returns {number} - The resolved index for selecting the image.
   */
  resolveImageIndex() {
    if (this.percentage > 10) return 3;
    if (this.percentage > 5) return 2;
    if (this.percentage > 0) return 1;
    return 0;
  }
}
