/////////////data: 11/20-6.2 11/21-6.125 11/22 5.81 11/23-7.73 11/25-3.25
let submitted = false;
let reset = false;
let dragging = false;
let hovering = false;

let sliderStart = 300;
let sliderEnd = 900;
let offsetX = 0;
let x = (sliderStart + sliderEnd) / 2; //slider pos
let y = 120; //slider pos
let d = 40; //slider size

let faces = [];
let refY = y - 20; //reference face Y
let newY = 250; // input face Y and boxes Y

let x2 = x; // button pos X
let y2 = y + 60; // button pos Y
let y3 = y + 66; // button text pos Y
let w = 100; // button size
let h = 30; // butto size
let pointX, pointY; //linear diagram points pos
let eSize = 15;

let history = [6.2, 6.125, 5.81, 7.73, 7.9, 3.52, 5.8, 4.5, 5.1, 5.72, 6.69, 5.56, 4.98];
let currentMood = 5;
let currentMoodArray = [];
let averageValue;



function setup() {
  createCanvas(1200, 700);
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {
  background(150, 180, 230);

  //instructions
  noStroke();
  fill(255);
  textSize(35);
  //text("MOOD OF ITP", 110, 40);
  text("Slide To Pick Your Face for Today", width / 2, 45);
  textSize(22);
  text("Submit to see previous inputs and the average face", width / 2 + 5, 70);
  //draw the splitting bar
  //rect(width / 2, newY + 150, width, 30);


  // //draw the calendar
  // push();
  // translate(0, 800);
  // fill(255);
  // noStroke();
  // textSize(20);
  // // text("Monthly Data", 120, 100);
  // text("NOV", 80, 125);
  // let startDay = 3;
  // for (let date = 1; date < 31; date++) {
  //   dateX = (date * 1100 / 7 + 13 + (startDay - 1) * 1100 / 7 + 50);
  //   dateX %= 1100;
  //   let counter = Math.floor((date + (startDay - 1)) / 7);
  //   let dateY = 125 + 100 * counter;
  //   text(date, dateX, dateY);
  // }
  // stroke(255);
  // strokeWeight(1);
  // for (let i = 1100 / 7 - 1100; i <= 1100; i += 1100 / 7) {
  //   for (let j = 30; j <= 530; j += 100) {
  //     line(i + 50, 30, i + 50, 530);
  //     line(0 + 50, j, 1100 + 50, j);
  //   }
  // }


  // // draw the old faces
  // for (let k = 0; k < history.length; k++) {
  //   if (history[k] != null) {
  //     let oldfaceX = k * 1100 / 7 + 230;
  //     oldfaceX %= 1100;
  //     let counter2 = Math.floor((k + 20 + 2) / 7);
  //     let oldfaceY = 60 + 100 * counter2;
  //     let oldFace = new Face(oldfaceX, oldfaceY, history[k]);
  //     oldFace.display();
  //   }
  // }
  // pop();



  //draw the slider
  if (!submitted) {
    if (dragging) {
      x = mouseX + offsetX;
    }
    x = constrain(x, sliderStart, sliderEnd);
    stroke(255);
    ellipse(x, y, d);
    strokeWeight(3);
    line(sliderStart, y, sliderEnd, y);

    // draw the buttons
    rect(x2, y2, w, h);
    fill(150, 180, 230);
    textSize(24);
    text("SUBMIT", x2, y3);
  } else {
    fill(100, 130, 180);
    textSize(30);
    noStroke();
    text("THANK FOR YOUR INPUT, PRESS FINISH", x2 + 30, y3 - 50);
  }

  if (submitted) {
    fill(255);
    rect(x2 + 120, y2, w, h);
    fill(150, 180, 230);
    textSize(24);
    // draw reset always:
    text("FINISH", x2 + 120, y3);
  }



  // draw the referrence face
  currentMood = round(map(x, sliderStart, sliderEnd, 0, 10));
  let f = new Face(100, refY, currentMood);
  f.display();
  f.score();

  // draw the new faces
  let boxX = 125;
  if (submitted) {
    let count = 0;
    for (let i = faces.length - 1; i >= 0; i--) {
      let newX = boxX - 55 + count * 160;
      faces[i].updatePosition(newX, newY);
      faces[i].display();
      count++;
    }
  }
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(boxX, newY + 45, 150, 130);
  rect(boxX + 560, newY + 45, 950, 130);
  fill(255);
  textSize(18);
  noStroke();
  text("YOUR FACE", boxX, newY + 105);
  text("OTHER'S FACES", boxX + 560, newY + 105);



  //draw updated average current face on calendar
  if (currentMoodArray.length > 0 && submitted) {
    // calculate the average:
    let sum = 0;
    for (let i = 0; i < currentMoodArray.length; i++) {
      sum += currentMoodArray[i];
    }
    averageValue = (sum / currentMoodArray.length);
    //console.log(averageValue);

    let latestFace = new Face(3 * 1100 / 7 + 230, 900, averageValue);
    latestFace.display();
    // history.push(averageValue);
  }

  // // linear diagram
   push();
   translate(0, 600);
  // noStroke();
  // fill(255);
  // textSize(24);
  // text("ITP Weekly Mood Trend", 500, -150);
  // noFill();
  // //draw the lines
  // beginShape();
  // strokeWeight(2);
  // for (let i = history.length - 7; i < history.length; i++) {
  //   stroke(255);
  //   vertex(150 * (i - history.length + 7), -10 * history[i]);
  // }
  // vertex(150 * 7, -10 * averageValue);
  // endShape();
  //
  // for (let i = history.length - 7; i < history.length; i++) {
  //   //draw the points
  //   stroke(255);
  //   strokeWeight(18);
  //   pointX = 150 * (i - history.length + 7);
  //   pointY = -10 * history[i];
  //   let points = point(pointX, pointY);
  //   // console.log(pointX-13);
  //   //draw the scores
  //   fill(255);
  //   noStroke();
  //   textSize(24);
  //   text(history[i], pointX, pointY + 40);
  //   //show face when hovering
  //   if (mouseX > pointX - 13 + 100 && mouseX < pointX + 13 + 100 && mouseY > pointY - 100 + 600 && mouseY < pointY + 100 + 600) {
  //     hovering = true;
  //     console.log("hovering!");
  //
  //     //ellipse(pointX, pointY - 50, 100, 100);
  //
  //       // let oldfaceX = i * 1100 / 7 + 230;
  //       // oldfaceX %= 1100;
  //       // let counter2 = Math.floor((i + 20 + 2) / 7);
  //       // let oldfaceY = 60 + 100 * counter2;
  //       let oldFace = new Face(pointX - 50, pointY - 60, history[i]);
  //       oldFace.display();
  //
  //   }
  //
  // }

  //draw today's average point and score
  stroke(100, 130, 180);
  fill(255, 0, 0);
  strokeWeight(eSize);
  eSize++;
  if (eSize > 30) {
    eSize = 15;
  }
  point(width/2, -10 * averageValue);
  if (currentMoodArray.length > 0 && submitted) {
    fill(100, 130, 180);
    noStroke();
    textSize(33);
    text(averageValue, width/2, -10 * averageValue + 45);
  }

  pop();
}

function mouseOver() {

}


function mousePressed() {
  // is the mouse over the slider
  if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
    dragging = true;

    offsetX = x - mouseX;
  }

  // is the mouse over the SUBMIT button
  if (mouseX > x2 - w / 2 && mouseX < x2 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    submitted = true;
    reset = !reset;
    currentMoodArray.push(currentMood);
    // console.log(currentMoodArray);
    console.log("submitted " + submitted);
    faces.push(new Face(120, newY, currentMood));
  }

  // is the mouse over the FINISH button
  if (mouseX > x2 + 120 - w / 2 && mouseX < x2 + 120 + w / 2 && mouseY > y2 - h / 2 && mouseY < y2 + h / 2) {
    reset = true;
    currentMood = 5;
    submitted = false;
    x = map(currentMood, 0, 10, sliderStart, sliderEnd);
    console.log("reset " + reset);
  }
}

function mouseReleased() {
  dragging = false;
}
