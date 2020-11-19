if ((this.y <= this.screen.height + this.screen.y - this.width / 2) && (this.x > this.screen.width + this.screen.x - this.width / 2)) {
    this.activeRotation = (Math.PI - this.activeRotation);
} else if (this.x < this.screen.x + (this.width / 2)) {
    this.activeRotation = Math.PI - this.activeRotation;
} else if ((this.y > this.screen.height + this.screen.y - this.width / 2) && (this.x <= this.screen.width + this.screen.x - this.width / 2)) {
    this.activeRotation = -this.activeRotation
} else if (this.y < this.screen.y + (this.height / 2)) {
    this.activeRotation = -this.activeRotation;
} else if ((this.y > this.screen.height + this.screen.y - this.width / 2) && (this.x <= this.screen.width + this.screen.x - this.width / 2)) {
    this.activeRotation += Math.PI
}
