
let currentMood = 5;
let moodNow = 5;

function setup() {
  createCanvas(300, 300);
  rectMode(CENTER);
  textAlign(CENTER);
}

function sliderChange(val) {
document.getElementById('sliderVal').innerHTML = val;
console.log(val);
}

function draw() {
  background(150, 180, 230);
  moodNow = document.getElementById('sliderVal').value;
  currentMood = moodNow;
  // currentMood = round(map(x, sliderStart, sliderEnd, 0, 10));
  let f = new Face(width/2 -50, 100, currentMood);
  f.display();
  f.score();
}
