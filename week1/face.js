class Face {

  constructor(posX, posY, inp) {
    this.posX = posX;
    this.posY = posY;
    this.inp = inp;
    this.eye = map(this.inp, 0, 10, -100, 100);
    this.mouth = map(this.inp, 0, 10, 180, -120);
  }

  display() {
    stroke(255);
    noFill();
    strokeWeight(4);
    push();
    translate(this.posX, this.posY);
    curve(10, this.eye, 10, 0, 40, 0, 40, this.eye);
    curve(70, this.eye, 70, 0, 100, 0, 100, this.eye);
    curve(45, this.mouth, 45, 30, 65, 30, 65, this.mouth);
    // draw the tears
    if (this.eye < -70) {
      line(20, 13, 20, 23);
      line(20, 28, 20, 38);
      line(20, 43, 20, 53);
      line(90, 13, 90, 23);
      line(90, 28, 90, 38);
      line(90, 43, 90, 53);
    }
    pop();
  }

  score() {
    // score formula
    this.scores = this.inp; //round(map(this.inp, sliderStart, sliderEnd, 0, 10));
    noStroke();
    fill(255);
    textSize(24);
    text(round(this.scores), this.posX + 55, this.posY + 90);
  }

  updatePosition(newX, newY){
    this.posX = newX;
    this.posY = newY;
  }

}
