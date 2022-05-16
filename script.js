// :( 
// character 
  // html div element, img element, event listeners in jsw file, boundaries of website, boundaries at tombstone, when tombstone pops up - event listener (when player is at tombstone coordinate), 

/*
===
JANICE LIANG
PICTURE
DATE 
CAUSE OF DEATH 
===== 

FUNCTIONS

character movement
- eventlistener 

window.eventlistener
- check which key pressed
- branch to substatements
main {
}
*/

const SCALE = 1.5;
const WIDTH = 46;
const HEIGHT = 32.75;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;
const CYCLE_LOOP = [0, 1, 0, 2];
const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
const FRAME_LIMIT = 12;
const MOVEMENT_SPEED = 1;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 401;
let positionY = 603;
let img = new Image();

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
  keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}

function loadChar() {
  img.src = '../imgs/owo.png';
  img.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
    frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
    canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}

loadChar();

// px,py == the current coordinates of the character 

// this one is the top left grave
function nearA(px, py) {
  if (px > 196 && px < 230 && py > 142 && py < 200) {
    return true;
  }
  return false;
}

// TOP MIDDLE GRAVE
// 317, 150
function nearB(px, py) {
  if (px > 449 && px < 483 && py > 142 && py < 200) {
    return true;
  }
  return false;
}

//TOP RIGHT GRAVE
function nearC(px, py) {
  if (px > 701 && px < 729 && py > 142 && py < 200) {
    return true;
  }
  return false;
}

//BOTTOM LEFT GRAVE
function nearD(px, py) {
  if (px > 196 && px < 230 && py > 287 && py < 334) {
    return true;
  }
  return false;
}

//BOTTOM MIDDLE GRAVE
function nearE(px, py) {
  if (px > 449 && px < 483 && py > 287 && py < 334) {
    return true;
  }
  return false;
}

//BOTTOM RIGHT GRAVE
function nearF(px, py) {
  if (px > 701 && px < 729 && py > 287 && py < 334) {
    return true;
  }
  return false;
}

//RIGHT MAUSOLEUM
function nearML(px, py) {
  if (px > 558 && px < 566 && py > 435 && py < 461) {
    return true;
  }
  return false;
}

//LEFT MAUSOLEUM
function nearGame(px, py) {
  if (px > 292 && px < 352 && py > 427 && py < 464) {
    return true;
  }
  return false;
}

document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '90') {
    window.open('http://dev.moorman.xyz/', '_blank');
  }
  else if (e.keyCode == '88') {
    // will replace link
    window.open('game.html', '_blank');
  }
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let tb = new Image();
  tb.src = '../imgs/tb.png';
  // top left grave - 100, 130
  ctx.drawImage(tb, 200, 160, 60, 60);
  // top middle - 300, 130
  ctx.drawImage(tb, 450, 160, 60, 60);
  //top right grave - 500, 130
  ctx.drawImage(tb, 700, 160, 60, 60);
  ctx.drawImage(tb, 200, 300, 60, 60);
  ctx.drawImage(tb, 450, 300, 60, 60);
  ctx.drawImage(tb, 700, 300, 60, 60);
  let maus = new Image();
  maus.src = '../imgs/maus.png';
  // game (left)
  ctx.drawImage(maus, 290, 427, 90, 80);
  // ml (right)
  ctx.drawImage(maus, 560, 427, 90, 80);

  let tbsign = new Image();
  tbsign.src = '../imgs/tbsign.png'
  ctx.drawImage(tbsign, -10, 430, 250, 280);

  let lampl = new Image();
  lampl.src = '../imgs/street-lamp.png'
  ctx.drawImage(lampl, -10, 620, 80, 80);

  ctx.drawImage(lampl, -10, 100, 80, 80);
  
  let hasMoved = false;

  if (keyPresses.w) {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    hasMoved = true;
  } else if (keyPresses.s) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    hasMoved = true;
  }

  if (keyPresses.a) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    hasMoved = true;
  } else if (keyPresses.d) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }

  if (!hasMoved) {
    currentLoopIndex = 0;
  }

  drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
  window.requestAnimationFrame(gameLoop);
  // for top left grave
  if (nearA(positionX, positionY) == true) {
    //console.log("true!");
    let mod1 = new Image();
    mod1.src = '../imgs/tbs/tbsami.png';
    ctx.drawImage(mod1, 300, 80, 470, 600);
  }
  // for top middle grave
  if (nearB(positionX, positionY) == true) {
    let mod1 = new Image();
    mod1.src = '../imgs/tbs/tbcal.png';
    ctx.drawImage(mod1, 300, 100, 470, 600);
  }

  //for top right grave
  if (nearC(positionX, positionY) == true) {
    let mod1 = new Image();
    mod1.src = '../imgs/tbs/tbtori.png';
    ctx.drawImage(mod1, 300, 100, 470, 600);
  }

  //for bottom middle grave
  if (nearD(positionX, positionY) == true) {
    let mod1 = new Image();
    mod1.src = '../imgs/tbs/testzoom.png';
    ctx.drawImage(mod1, 300, 100, 470, 600);
  }

  //for top right grave
  if (nearE(positionX, positionY) == true) {
    let mod1 = new Image();
    mod1.src = '../imgs/tbs/testzoom.png';
    ctx.drawImage(mod1, 300, 100, 470, 600);
  }  

  //for top right grave
  if (nearF(positionX, positionY) == true) {
    let mod1 = new Image();
    mod1.src = '../imgs/tbs/testzoom.png';
    ctx.drawImage(mod1, 300, 100, 470, 600);
  }  

  // RIGHT MOSOLEUM 
  if (nearML(positionX, positionY)) {
    // if press this key then open link in new tab
    let mlpop = new Image();
    mlpop.src = '../imgs/mlsign.png';
    ctx.drawImage(mlpop, 592, 458);
  }

  // LEFT MAUSOLEUM
  if (nearGame(positionX, positionY)) {
    // if press this key then open link in new tab
    let gamepop = new Image();
    gamepop.src = '../imgs/gamesign.png';
    ctx.drawImage(gamepop, 230, 485);
  }

  
  console.log(positionX, positionY);
}


function moveCharacter(deltaX, deltaY, direction) {
  if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }
  currentDirection = direction;
}


//modal for sami

// var modal_1 = mod1.src = '../imgs/testzoom.png';

// code for 
