var canvas = document.getElementById("canvas");
var body = document.getElementById("page");
var butt = document.getElementById("restart");
var dead = document.getElementById("dead");
var win = document.getElementById("win");
var wint = document.getElementById("wint");
var resetb = document.getElementById("reset");
var resume = document.getElementById("resume");
var ctx = canvas.getContext("2d");
var keyPressed = {};
var ground = new Image();
var goldimg = new Image();
var lavaimg = new Image();
var underlavaimg = new Image();
var endimg = new Image();
goldimg.src = "gold.png";
lavaimg.src = "lava.png";
underlavaimg.src = "underlava.png";
endimg.src = "glitterchamber.png";
var ff = 0;
var ifi = {
  normal: 0,
  gf: 64
};
document.addEventListener('keydown', function(e) {
  keyPressed[e.keyCode] = true;
}, false);
document.addEventListener('keyup', function(e) {
  keyPressed[e.keyCode] = false;
}, false);
var sx = 0;
var sy = 0;
var level = function(layout) {
  this.level = layout;
  };
  var levelw = 15;
  var levelh = 8;
  var levelsize = Math.floor(body.offsetWidth * 0.96 / levelw);
canvas.width = levelw * levelsize;
canvas.height = levelh * levelsize;
var key = 0;
var r = 0;
var time = 0;
var showwin = true;
var done = false;
var beta = false;
var runtimer = true;
var pb = {
  time: 0,
  gold: 0,
  tgold: 0,
};
var items = {
  gf: false
}
function setupStorage(value, out) {
  if(!localStorage.getItem(value)) {
    localStorage.setItem(value, out);
  }
}
  setupStorage("time", 0);
  setupStorage("gold", 0);
  setupStorage("tgold", 0);
  setupStorage("items", JSON.stringify(items));
  pb.time = localStorage.getItem("time");
  pb.gold = localStorage.getItem("gold");
  pb.tgold = localStorage.getItem("tgold");
  items = JSON.parse(localStorage.getItem("items") || null) || {};
  ground.src = "ground.png";
    if (items.gf == true) {
    ground.src = "glitterfloor.png";
    ff = ifi.gf;
  }
  // if (items.gf == true) {
  //   ground.src = "glitterfloor.png";
  //   ff = ifi.gf;
  // }
  // else {
  //   ground.src = "ground.png";
  // }
var levels = [];
var layout = [
  [
    "               ", //thanks me
    "               ",
    "         +     ",
    "s       ___   e",
    "____xx__   ____",
    "   _xx_        ",
    "   ____        ",
    "               ",
    "_______________"
  ],
  [
    "               ", //thanks me
    "    +          ",
    "         +    e",
    "s      _xx_____",
    "___   __xx_    ",
    "  _________    ",
    "               ",
    "               ",
    "_______________"
  ],
  [
    "               ", //thanks hannah
    "               ",
    "               ",
    "              +",
    "      _  _ _  e",
    "s __xxxxxxxxxx_",
    "_______________",
    "               ",
    "_______________"
  ],
  [
    "               ", //thanks sierra
    "               ",
    "               ",
    "               ",
    "         +    e",
    "s _x  +_xx__xx_",
    "_____________  ",
    "               ",
    "_______________"
  ],
  [
    "               ", //thanks me/cooper
    "               ",
    "               ",
    "             + ",
    "s  +   +      e",
    "__  __  __ _xx_",
    "           ____",
    "               ",
    "_______________"
  ],
  [
    "               ", //thanks hannah
    "       __   +  ",
    "      x  xx___ ",
    "   __x         ",
    "              e",
    "s         +  __",
    "_______xx__xx__",
    "               ",
    "_______________"
  ],
  [
    "               ", //thanks me
    "   __          ",
    "s __           ",
    "___       +   e",
    "      xxxx_  __",
    "          _ +  ",
    "          ___  ",
    "               ",
    "_______________"
  ],
  [
    "               ", //thanks hannah
    "      _        ",
    "        x      ",
    "   _    x     e",
    "        x +    ",
    "s   +   x      ",
    "______xxx__xx__",
    "               ",
    "_______________"
  ],
  [
    "e   +          ", //thanks cooper
    "___________   _",
    "               ",
    "          xx  x",
    "          xx_  ",
    "s              ",
    "_   _         _",
    "        ___  _ ",
    "_______________"
  ],
  [
  "               ", //thanks sierra
  "               ",
  "  +         +  ",
  " ____      ____",
  "               ",
  " s       +    e",
  "______xxxx_____",
  "               ",
  "_______________"
  ],
  [
  "               ", //thanks sierra
  "               ",
  "               ",
  "           +e  ",
  " s          x  ",
  " _   +_     _  ",
  "xxxxxxxxxxxxxxx",
  "               ",
  "_______________"
  ],
  [
  "               ", //Thanks Sierra
  "               ",
  "               ",
  "               ",
  "               ",
  "   s  +        ",
  " ___xxxx___ e x",
  "          _____",
  "_______________"
  ],
  [
    "xxxxxxxxxxxxxxx", //thanks me
    "x  +++   +++  x",
    "x +   + +   + x",
    "x +     +     x",
    "x +  ++ +  ++ x",
    "x_ +++ _ +++ _x",
    "x__ s ___   __x",
    "_______________",
    "_______________"
  ]
];
if (beta == true) {
  key = layout.length - 2;
}
/* template
 [
  "               ",
  "               ",
  "               ",
  "               ",
  "               ",
  "               ",
  "               ",
  "               ",
  "_______________"
  ],
  dont touch bottum line
  secound from bottum line is half cut of
  s- spawn +- gold x- lava e- end
  */
var holder = [];
var tile = {
  boxx: [],
  boxy: [],
  lavx: [],
  lavy: [],
  golx: [],
  goly: [],
  endx: [],
  endy: [],
  onbox: []
};
var boxx = [];
var boxy = [];
var surface = true;
var character = function(x, y) {
  this.tilesover = [];
  this.tilesunder = [];
  this.under = false;
  this.x = x;
  this.y = y;
  this.ex = 0;
  this.ey = 0;
  this.w = levelsize;
  this.h = levelsize * 2;
  this.xvol = 0;
  this.yvol = 0;
  this.exvol = 0;
  this.eyvol = 0;
  this.gold = 0;
  this.health = 100;
  this.dead = false;
  this.onground = false;
  this.gaf = 0;
  this.eaf = 0;
  this.gfaf = 0;
  this.fgaf = 0;
  this.feaf = 0;
  this.fgfaf = 0;
  this.dir = 0;
  this.addgold = true;
  this.menu = false;
  this.change = true;
};
var endstate = 0;
butt.onclick = function restart() {
  p1.x = sx;
  p1.y = sy;
  p1.health = 100;
}
var keydown = false;
var pastkey = 0;
character.prototype.draw = function() {
  if (this.y + this.h >= 8 * levelsize) {
    this.health = 0;
  }
  if (!this.dead) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "green";
    ctx.fillText("Level " + (key + 1), 0, 40)
  }
  if (this.health < 20) {
    ctx.fillStyle = "red";
  } else if (this.health < 50) {
    ctx.fillStyle = "yellow";
  } else if (this.health >= 50) {
    ctx.fillStyle = "green";
  }
  ctx.font = "20px Arial";
  ctx.fillText(this.health + " Health", 0, 20);
  ctx.fillStyle = "gold";
  ctx.fillText(this.gold + " | " + pb.gold + " Gold", levelsize * levelw - 100, 40);
  ctx.fillText(time / 10 + " | " + pb.time, levelsize * levelw - 100, 20);
};
character.prototype.update = function() {
  if(this.menu) {
    menu.style.display = "block";
  }
  else {
    menu.style.display = "none";
  }
      if (key + 1 == levels.length) {
      done = true;
    }
  if(this.xvol < 1 && this.xvol > -1) { //foward
    this.dir = 0;
  }
  else if(this.xvol >= 1) {//right
    this.dir = 1;
  }
  else if (this.xvol <= -1) {//left
    this.dir = 2;
  }
  if (this.x < tile.endx[0] + levelsize &&
    this.x + this.w > tile.endx[0] &&
    this.y < tile.endy[0] + levelsize &&
    this.h + this.y > tile.endy[0]) {
    runtimer = false;
    endstate = 0;
  p1.eaf = 0;
    p1.ex = p1.x;
    p1.ey = p1.y;
    p1.exvol = p1.xvol;
    p1.eyvol = p1.yvol;
    p1.x = -levelsize * 500;
    if (this.health <= 90) {
      this.health += 10;
    }
    setTimeout(function() {
    key++;
    tile = {
      boxx: [],
      boxy: [],
      lavx: [],
      lavy: [],
      golx: [],
      goly: [],
      endx: [],
      endy: [],
      onbox: []
    }
    levels[key].load();
    }, 1000);
  }
  if (this.onground) {
    this.xvol *= 0.95;
  }
  if (done == true) {
    if (done == true) {
      if (this.gold > pb.gold) {
        pb.gold = this.gold;
      }
      if (time / 10 < pb.time || pb.time == 0) {
        pb.time = time / 10;
      }
    }
    if (showwin == true) {
      win.style.display = "block";
    } else {
      win.style.display = "none";
    }
    setTimeout(function() {
      showwin = false
    }, 3000)
    wint.innerHTML = "You Won In " + time / 10 + " Seconds" + "<br>" + "Your Best Is " + pb.time + " Seconds";
  } else {
    win.style.display = "none";
    dead.style.display = "none";
  }
  if (this.health <= 0) {
    this.dead = true;
    dead.style.display = "block";
    this.xvol = 0;
  } else {
    dead.style.display = "none";
    this.dead = false;
  }
  for (var i = 0; i < tile.golx.length; i++) {
    if (this.x < tile.golx[i] + levelsize &&
      this.x + this.w > tile.golx[i] &&
      this.y < tile.goly[i] + levelsize &&
      this.h + this.y > tile.goly[i]) {
      tile.golx.splice(i, 1);
      tile.goly.splice(i, 1);
      this.gold++;
      pb.tgold ++;
    }
  }
  for (var i = 0; i < tile.lavx.length; i++) {
    if (this.x < tile.lavx[i] + levelsize &&
      this.x + this.w > tile.lavx[i] &&
      this.y < tile.lavy[i] + levelsize &&
      this.h + this.y > tile.lavy[i] && this.health > 0) {
      this.health -= 10;
    }
  }
  r = 0;
  for (var i = 0; i < tile.boxy.length; i++) {
    if (this.x + this.w > tile.boxx[i] && this.x < tile.boxx[i] + levelsize && this.y <= tile.boxy[i]) {
      this.tilesover[r] = i;
      r++;
    }
  }
  r = 0;
  for (var i = 0; i < tile.boxy.length; i++) {
    if (this.x + this.w > tile.boxx[i] && this.x < tile.boxx[i] + levelsize && this.y >= tile.boxy[i]) {
      this.tilesunder[r] = i;
      r++;
    } else if (i >= tile.boxy.length - 1 && r == 0) {
      this.under = false;
    } else {
      this.under = true;
    }
  }
  for (var i = 0; i < 1; i++) {
    if (this.y + this.h >= tile.boxy[this.tilesover[i]] && this.y + this.h <= tile.boxy[this.tilesover[i]]) {
      this.onground = true;
    } else {
      this.onground = false;
    }
    if (this.y < tile.boxy[this.tilesunder[i]] + levelsize && this.y > tile.boxy[this.tilesunder[i]] && this.yvol < 0 && this.under == true) {
      this.yvol = 0;
    }
  }
  //d = 68 39 a = 65 37 space = 32 38
  this.x += this.xvol / 20 * levelsize;
  if (this.yvol + this.y + this.h > tile.boxy[this.tilesover[0]]) {
    this.y = tile.boxy[this.tilesover[0]] - this.h;
  } else if (this.yvol + this.y + this.h > tile.boxy[this.tilesover[1]]) {
    this.y = tile.boxy[this.tilesover[1]] - this.h;
  } else {
    this.y += this.yvol / 20 * levelsize;
  }
  if (this.onground == false) {
    this.yvol += 0.5;
  } else {
    this.yvol = 0;
  }
  if (keyPressed[68] || keyPressed[39]) {
    if (this.xvol < 4) {
      this.xvol += 0.10;
    }
  }
  if (keyPressed[65] || keyPressed[37]) {
    if (this.xvol > -4) {
      this.xvol -= 0.10;
    }
  }
  if (keyPressed[32] || keyPressed[38]) {
    if (this.onground) {
      this.yvol -= 5;
    }
  }
  if (keyPressed[27]) {
    if (this.change === true) {
    this.change = false;
    this.menu = !this.menu;
    }
  }
  else {
    this.change = true;
  }
};
//"             "marker
//_ floor x lava + gold coin s spawn
level.prototype.load = function() {
  p1.x = p1.ex;
  p1.y = p1.ey;
  p1.xvol = p1.exvol;
  p1.yvol = p1.eyvol;
  runtimer = true;
  endstate = 1;
  p1.eaf = 0;
  ctx.clearRect(0, 0, 10000, 10000);
  for (var i = 0; i < this.level.length; i++) { //run code below for each level object
    for (var x = 0; x < this.level[i].length; x++) { //run code below for ever block in the string
      if (this.level[i].charAt(x) == "_") { //if its _ the draw a black box
        ctx.fillStyle = "black";
        ctx.fillRect(x * levelsize, i * levelsize, levelsize, levelsize);
        tile.boxx.push(x * levelsize);
        tile.boxy.push(i * levelsize);
      } else if (this.level[i].charAt(x) == "x") { //if its x the draw a red box
        ctx.fillStyle = "red";
        ctx.fillRect(x * levelsize, i * levelsize, levelsize, levelsize);
        tile.lavx.push(x * levelsize);
        tile.lavy.push(i * levelsize);
      } else if (this.level[i].charAt(x) == "+") { //if its + the draw a gold box
        tile.golx.push(x * levelsize);
        tile.goly.push(i * levelsize);
      } else if (this.level[i].charAt(x) == "e") { //if its e the draw a green box
        ctx.fillStyle = "green";
        ctx.fillRect(x * levelsize, i * levelsize, levelsize, levelsize * 2);
        tile.endx.push(x * levelsize);
        tile.endy.push(i * levelsize - levelsize);
      } else if (this.level[i].charAt(x) == "s") { //if its s get the player start pos
        sx = x * levelsize;
        sy = i * levelsize - levelsize;
        p1.x = sx;
        p1.y = sy;
      } else {

      }
    }
  }
};
level.prototype.draw = function() {
  p1.gaf += 0.2;
  p1.eaf += 0.2;
  p1.gfaf += 0.5;
  if(p1.gaf > 11) {
    p1.gaf = 0;
  }
  if(p1.eaf > 5) {
    p1.eaf = 5;
  }
   if(p1.gfaf > ff) {
    p1.gfaf = 0;
  }
  for (var i = 0; i < tile.boxx.length; i++) {
    ctx.drawImage(ground, 20 * p1.fgfaf, 0, 20, 20, tile.boxx[i], tile.boxy[i], levelsize, levelsize);
  }
  for (var i = 0; i < tile.lavx.length; i++) {
  ctx.fillStyle = "red";
  surface = true;
  for (var x = 0; x < tile.lavx.length; x++) {
  if (tile.lavx[i] == tile.lavx[x] && tile.lavy[i] - levelsize == tile.lavy[x]) {
  surface = false;
  }
  else {
  }
  }
  if (surface == true) {
    ctx.drawImage(lavaimg, tile.lavx[i], tile.lavy[i], levelsize, levelsize);
  }
  else {
    ctx.drawImage(underlavaimg, tile.lavx[i], tile.lavy[i], levelsize, levelsize);
  }
  }
  for (var i = 0; i < tile.golx.length; i++) {
  ctx.drawImage(goldimg, 20 * p1.fgaf, 0, 20, 20, tile.golx[i], tile.goly[i], levelsize, levelsize);
  }
    p1.fgaf = Math.floor(p1.gaf);
    p1.feaf = Math.floor(p1.eaf);
    p1.fgfaf = Math.floor(p1.gfaf);
  ctx.drawImage(endimg, 20 * p1.feaf, endstate * 40, 20, 40, tile.endx[0], tile.endy[0], levelsize, levelsize * 2);
}
resume.onclick = function() {
  p1.menu = false;
}
resetb.onclick = function reset() {
  done = false;
  tile = {
      boxx: [],
      boxy: [],
      lavx: [],
      lavy: [],
      golx: [],
      goly: [],
      endx: [],
      endy: [],
      onbox: []
    }
  p1.gold = 0;
  time = 0;
  p1.health = 100;
  key = 0;
  levels[key].load();
  p1.x = 0;
  p1.y = levelsize * 2;
  p1.xvol = 0;
  p1.yvol = 0;
}
for (var i = 0; i < layout.length; i++) {
  levels[i] = new level(layout[i]);
}
var p1 = new character(0, 0);

function update() {
  p1.update();
};
levels[key].load();

function draw() {
  ctx.clearRect(0, 0, 10000, 10000);
  levels[key].draw();
  p1.draw();
}
setInterval(draw, 17);
setInterval(update, 17);
setInterval(function() {
  if (done == false && runtimer == true && p1.dead == false) {
    time++;
  }
}, 100);
setInterval(function() {
localStorage.setItem("time", pb.time);
localStorage.setItem("gold", pb.gold);
localStorage.setItem("tgold", pb.tgold);
localStorage.setItem("items", JSON.stringify(items));
console.log("Saved");
}, 1000);