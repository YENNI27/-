let player1, player2;
let bullets1 = [];
let bullets2 = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 創建兩個玩家
  player1 = {
    x: width * 0.2,
    y: height/2,
    size: 60,
    speed: 5,
    health: 100,
    color: color(255, 182, 193)  // 粉紅色兔子
  };
  
  player2 = {
    x: width * 0.8,
    y: height/2,
    size: 60,
    speed: 5,
    health: 100,
    color: color(173, 216, 230)  // 藍色貓咪
  };
}

function draw() {
  // 繪製可愛的背景
  background(255, 242, 245); // 淺粉色背景
  
  // 畫一些裝飾性的雲朵
  drawClouds();
  
  // 移動玩家1 (WASD控制)
  if (keyIsDown(87)) player1.y -= player1.speed; // W
  if (keyIsDown(83)) player1.y += player1.speed; // S
  if (keyIsDown(65)) player1.x -= player1.speed; // A
  if (keyIsDown(68)) player1.x += player1.speed; // D
  
  // 移動玩家2 (方向鍵控制)
  if (keyIsDown(UP_ARROW)) player2.y -= player2.speed;
  if (keyIsDown(DOWN_ARROW)) player2.y += player2.speed;
  if (keyIsDown(LEFT_ARROW)) player2.x -= player2.speed;
  if (keyIsDown(RIGHT_ARROW)) player2.x += player2.speed;
  
  // 限制玩家在畫面內
  player1.x = constrain(player1.x, 0, width - player1.size);
  player1.y = constrain(player1.y, 0, height - player1.size);
  player2.x = constrain(player2.x, 0, width - player2.size);
  player2.y = constrain(player2.y, 0, height - player2.size);
  
  // 繪製玩家
  drawBunny(player1.x, player1.y, player1.size, player1.color);
  drawCat(player2.x, player2.y, player2.size, player2.color);
  
  // 更新和繪製子彈
  updateBullets();
  
  // 繪製生命條
  drawHealthBars();
  
  // 檢查遊戲結束
  checkGameOver();
}

function drawBunny(x, y, size, bodyColor) {
  push();
  // 身體
  fill(bodyColor);
  ellipse(x + size/2, y + size/2, size, size);
  
  // 耳朵
  fill(bodyColor);
  ellipse(x + size/3, y, size/3, size/1.2);
  ellipse(x + size*2/3, y, size/3, size/1.2);
  
  // 臉
  fill(255);
  ellipse(x + size/3, y + size/2, size/4, size/4); // 左眼
  ellipse(x + size*2/3, y + size/2, size/4, size/4); // 右眼
  
  fill(0);
  ellipse(x + size/3, y + size/2, size/8, size/8); // 左眼珠
  ellipse(x + size*2/3, y + size/2, size/8, size/8); // 右眼珠
  
  // 鼻子
  fill(255, 150, 150);
  ellipse(x + size/2, y + size*3/5, size/6, size/8);
  pop();
}

function drawCat(x, y, size, bodyColor) {
  push();
  // 身體
  fill(bodyColor);
  ellipse(x + size/2, y + size/2, size, size);
  
  // 耳朵
  triangle(x + size/4, y, x + size/3, y - size/3, x + size/2, y); // 左耳
  triangle(x + size/2, y, x + size*2/3, y - size/3, x + size*3/4, y); // 右耳
  
  // 臉
  fill(255);
  ellipse(x + size/3, y + size/2, size/4, size/4); // 左眼
  ellipse(x + size*2/3, y + size/2, size/4, size/4); // 右眼
  
  fill(0);
  ellipse(x + size/3, y + size/2, size/8, size/8); // 左眼珠
  ellipse(x + size*2/3, y + size/2, size/8, size/8); // 右眼珠
  
  // 鼻子
  fill(255, 150, 150);
  ellipse(x + size/2, y + size*3/5, size/8, size/8);
  
  // 鬍鬚
  stroke(0);
  line(x + size/3, y + size*3/5, x, y + size/2); // 左鬍鬚
  line(x + size*2/3, y + size*3/5, x + size, y + size/2); // 右鬍鬚
  pop();
}

function drawClouds() {
  fill(255);
  noStroke();
  
  // 繪製幾朵雲
  for(let i = 0; i < 5; i++) {
    let x = (width/4) * i;
    let y = height/5;
    ellipse(x, y, 80, 50);
    ellipse(x - 20, y + 10, 60, 40);
    ellipse(x + 20, y + 10, 60, 40);
  }
}

function keyPressed() {
  // 玩家1發射愛心子彈 (空白鍵)
  if (keyCode === 32) {
    let angle = atan2(
      player2.y + player2.size/2 - (player1.y + player1.size/2),
      player2.x + player2.size/2 - (player1.x + player1.size/2)
    );
    
    bullets1.push({
      x: player1.x + player1.size,
      y: player1.y + player1.size/2,
      speedX: cos(angle) * 7,
      speedY: sin(angle) * 7,
      color: color(255, 105, 180)
    });
  }
  
 // 玩家2發射星星子彈 (改用 P 鍵)
 if (keyCode === 80) { // P鍵
  let angle = atan2(
    player1.y + player1.size/2 - (player2.y + player2.size/2),
    player1.x + player1.size/2 - (player2.x + player2.size/2)
  );
  
  bullets2.push({
    x: player2.x,
    y: player2.y + player2.size/2,
    speedX: cos(angle) * 7,
    speedY: sin(angle) * 7,
    color: color(135, 206, 235)
  });
}
   // 重新開始遊戲
   if (keyCode === 82) { // R鍵
    resetGame();
  }
}

// 新增重置遊戲函數
function resetGame() {
  // 重置玩家1
  player1.health = 100;
  player1.x = width * 0.2;
  player1.y = height/2;
  
  // 重置玩家2
  player2.health = 100;
  player2.x = width * 0.8;
  player2.y = height/2;
  
  // 清空子彈
  bullets1 = [];
  bullets2 = [];
  
  // 重新開始遊戲循環
  loop();
}

function updateBullets() {
  // 更新玩家1的子彈
  for (let i = bullets1.length - 1; i >= 0; i--) {
    bullets1[i].x += bullets1[i].speedX;
    bullets1[i].y += bullets1[i].speedY;
    
    if (checkHit(bullets1[i], player2)) {
      player2.health -= 10;
      bullets1.splice(i, 1);
      continue;
    }
    
    // 移除超出畫面的子彈
    if (bullets1[i].x > width || bullets1[i].x < 0 || 
      bullets1[i].y > height || bullets1[i].y < 0) {
    bullets1.splice(i, 1);
  } else {
    drawHeart(bullets1[i].x, bullets1[i].y, 15, bullets1[i].color);
  }
}
  
  // 更新玩家2的子彈
  for (let i = bullets2.length - 1; i >= 0; i--) {
     // 使用 speedX 和 speedY 來更新子彈位置
     bullets2[i].x += bullets2[i].speedX;
     bullets2[i].y += bullets2[i].speedY;
    
    if (checkHit(bullets2[i], player1)) {
      player1.health -= 10;
      bullets2.splice(i, 1);
      continue;
    }
    
    // 移除超出畫面的子彈
    if (bullets2[i].x > width || bullets2[i].x < 0 || 
      bullets2[i].y > height || bullets2[i].y < 0) {
    bullets2.splice(i, 1);
  } else {
    drawStar(bullets2[i].x, bullets2[i].y, 15, bullets2[i].color);
  }
}
}

function drawHeart(x, y, size, color) {
  push();
  fill(color);
  noStroke();
  beginShape();
  vertex(x, y);
  bezierVertex(x - size/2, y - size/2, x - size, y + size/3, x, y + size);
  bezierVertex(x + size, y + size/3, x + size/2, y - size/2, x, y);
  endShape(CLOSE);
  pop();
}

function drawStar(x, y, size, color) {
  push();
  fill(color);
  noStroke();
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI * i / 5 - HALF_PI;
    let sx = x + cos(angle) * size;
    let sy = y + sin(angle) * size;
    vertex(sx, sy);
    angle += TWO_PI / 10;
    sx = x + cos(angle) * (size/2);
    sy = y + sin(angle) * (size/2);
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}

function checkHit(bullet, player) {
  return bullet.x > player.x && 
         bullet.x < player.x + player.size &&
         bullet.y > player.y && 
         bullet.y < player.y + player.size;
}

function drawHealthBars() {
  // 玩家1生命條
  fill(255);
  rect(20, 20, 200, 20);
  fill(255, 105, 180);
  rect(20, 20, player1.health * 2, 20);
  
  // 玩家2生命條
  fill(255);
  rect(width - 220, 20, 200, 20);
  fill(135, 206, 235);
  rect(width - 220, 20, player2.health * 2, 20);
}

function checkGameOver() {
  if (player1.health <= 0 || player2.health <= 0) {
    textAlign(CENTER, CENTER);
    
    // 顯示大標題
    textSize(64);
    fill(255, 105, 180);
    text("遊戲結束！", width/2, height/2 - 40);
    
    // 顯示勝利者
    textSize(32);
    if (player1.health <= 0 && player2.health <= 0) {
      fill(255, 200, 200);
      text("平手！", width/2, height/2 + 40);
    } else if (player1.health <= 0) {
      fill(135, 206, 235);
      text("藍色貓咪獲勝！", width/2, height/2 + 40);
    } else {
      fill(255, 182, 193);
      text("粉色兔子獲勝！", width/2, height/2 + 40);
    }
    
    // 顯示重新開始提示
    textSize(24);
    fill(150);
    text("按下 R 鍵重新開始", width/2, height/2 + 100);
    
    noLoop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}