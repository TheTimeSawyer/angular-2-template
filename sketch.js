var endp = 360;
var block = endp / 3;
var s = endp / 9;
var tem = [];
var j = 0;
var i = 0;
var k = 0;
var l = 0;
var ke = 0;
var alPl = [];
var Ic = " ";
var In = " ";
var S = [];
var Puz = [];
var Che = [];
var L = [];
var q = [];
for (i = 0; i < 81; i++) {
  S[i] = 0;
}



//saveData(){}
//savePuzzle(){}
//lastPuzzle(){}


function find_empty_location(arr, m) {
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (arr[row * 9 + col] == 0) {
        m[0] = row;
        m[1] = col;
        return true;
      }
    }
  }
  return false;
}

function used_in_row(arr, row, num) {
  for (var m = 0; m < 9; m++) {
    if (arr[row * 9 + m] == num) {
      return true;
    }
  }
  return false;
}

function used_in_col(arr, col, num) {
  for (var m = 0; m < 9; m++) {
    if (arr[m * 9 + col] == num) {
      return true;
    }
  }
  return false;
}

function used_in_box(arr, row, col, num) {
  for (var m = 0; m < 3; m++) {
    for (var c = 0; c < 3; c++) {
      if (arr[(row + m) * 9 + (c + col)] == num) {
        return true;
      }
    }
  }
  return false;
}

function safety(arr, row, col, num) {
  if (!(used_in_row(arr, row, num))) {
    if (!(used_in_col(arr, col, num))) {
      if (!(used_in_box(arr, row - row % 3, col - col % 3, num))) {
        return true;
      }
    }
  }
  return false;
}

function solve_Sudoku(arr) {
  q = [0, 0];
  if (!(find_empty_location(arr, q)))
    return true;
  var row = q[0];
  var col = q[1];
  for (var n = 1; n < 10; n++) {
    if (safety(arr, row, col, n)) {
      arr[row * 9 + col] = n;
      if (solve_Sudoku(arr)) {
        return true;
      }
      arr[row * 9 + col] = 0;
    }
  }
  return false;
}



function search(m, A) {
  for (var l = 0; l < A.length; l++) {
    if (A[l] == m) {
      return true;
    }

  }
  return false;
}

function generateSudoku() {

  for (i = 0; i < 81; i++) {
    S[i] = 0;
  }
  for (var n = 0; n < 9; n = n + 3) {
    L = [];
    while (true) {
      k = floor(random(1, 10));
      while (!(search(k, L))) {
        L.push(k);
        break;
      }
      if (L.length == 9) {
        break;
      }
    }
    var p = 0;
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        S[(i + n) * 9 + j + n] = L[p];
        p = p + 1;
      }
    }
  }
  solve_Sudoku(S);
}

function setup() {
  var a = createCanvas(360, 360);
  a.position(500, 215);
  background(220, 210, 200);
  for (i = 0; i < 9; i = i + 1) {
    for (j = 0; j < 9; j = j + 1) {
      tem[i * 9 + j] = new te1();
      tem[i * 9 + j].x = 20 + j * s;
      tem[i * 9 + j].y = 30 + i * s;
      tem[i * 9 + j].n = 0;
    }
  }
  var C =createP("Name : ");
  C.position(25,20);
  In = createInput();
  In.position(25,50);
  var D =createP("City : ");
  D.position(25,80);
  Ic = createInput();
  Ic.position(25,110);
  var Sub = createButton('Submit');
  Sub.position(25, 150);
  //  Sub.mousePressed(saveData);
 // var Sav = createButton('Save Puzzle');
 // Sav.position(590, 615);
  //  Sav.mousePressed(savePuzzle);
 // var Lo = createButton('Load Previous');
 // Lo.position(695, 615);
  //  Lo.mousePressed(lastPuzzle);
  var Ch = createButton('Check');
  Ch.position(590, 615);
  Ch.mousePressed(checkPuzzle);
  var Np = createButton('New Puzzle');
  Np.position(695, 615);
  Np.mousePressed(generatePuzzle);
  //generatePuzzle();
}

function draw() {
  stroke(100);
  for (i = s; i <= endp; i = i + s) {
    line(i, 0, i, endp);
  }
  for (i = s; i <= endp; i = i + s) {
    line(0, i, endp, i);
  }
  stroke(0);
  for (i = block; i <= endp; i = i + block) {
    line(i, 0, i, endp);
  }
  for (i = block; i <= endp; i = i + block) {
    line(0, i, endp, i);
  }
  k = floor((mouseY / 40)) * 9 + floor(mouseX / 40);
}

function mousePressed() {
  for (l = 0; l < alPl.length; l++) {
    if (alPl[l] == (k + 1)) {
      ke = k;
    }
  }
}

function te1() {
  this.x = 50;
  this.y = 50;
  this.n = 0;
  this.write = function() {
    noStroke();
    fill(220, 210, 200);
    rect(this.x - 20, this.y - 30, s, s);

    stroke(0);
    textAlign(CENTER);
    textSize(32);
    //fill(0, 0, 255);
    text(this.n, this.x, this.y)
  }
}

function keyPressed() {
  if (key >= '1' && key <= '9') {
    tem[ke].n = key;
    fill(0, 0, 255);
    tem[ke].write();
    Puz[ke] = key;
  }
}

function checkPuzzle() {
  for (i = 0; i < 81; i++) {
    Che[i] = S[i] - Puz[i];
    if (Che[i] != 0) {
      noStroke();
      fill(220, 210, 200);
      rect((floor(i % 9)) * s, (floor(i / 9)) * s, s, s);
      fill(255, 0, 0, 50);
      rect((floor(i % 9)) * s, (floor(i / 9)) * s, s, s);

    }
  }
}

function generatePuzzle() {
  generateSudoku();
  alPl = [];
  Puz = Array.from(S);
  for (i = 0; i < 15; i++) {
    var g = floor(random(0, 40));
    Puz[g] = 0;
    Puz[81 - g] = 0;
    alPl.push(g + 1);
    alPl.push(82 - g);
  }
  for (i = 0; i < 9; i = i + 1) {
    for (j = 0; j < 9; j = j + 1) {
      fill(0, 255, 0);
      tem[i * 9 + j].n = Puz[i * 9 + j];
      tem[i * 9 + j].write();
    }
  }
}
