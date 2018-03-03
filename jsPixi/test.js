var app = new PIXI.Application(500, 600);

document.body.appendChild(app.view);

// make all textures
var texture = PIXI.Texture.fromImage("dark_green.png");
var texture2 = PIXI.Texture.fromImage("light_green.jpg");
var texture3 = PIXI.Texture.fromImage("dark_green.png");
var texture4 = PIXI.Texture.fromImage("light_green.jpg");
var texture5 = PIXI.Texture.fromImage("dark_green.png");
var texture6 = PIXI.Texture.fromImage("light_green.jpg");

// use textures to make tiles
var tile1 = new PIXI.TilingSprite(texture, 500, 100);
var tile2 = new PIXI.TilingSprite(texture2, 500, 100);
var tile3 = new PIXI.TilingSprite(texture, 500, 100);
var tile4 = new PIXI.TilingSprite(texture2, 500, 100);
var tile5 = new PIXI.TilingSprite(texture, 500, 100);
var tile6 = new PIXI.TilingSprite(texture2, 500, 100);

// place tiles on board
tile2.y = 100;
tile3.y = 200;
tile4.y = 300;
tile5.y = 400;
tile6.y = 500;

// line 1
var line = new PIXI.Graphics();
line.lineStyle(10, 0xffffff, 1);
line.pivot.set(0,140);
line.rotation = 1.5709;
line.x = 500;
line.y = 105;
line.moveTo(0,0);
line.lineTo(0, 700);

// line 2
var line2 = new PIXI.Graphics();
line2.lineStyle(10, 0xffffff, 1);
line2.pivot.set(0,140);
line2.rotation = 1.5709;
line2.x = 500;
line2.y = 205;
line2.moveTo(0,0);
line2.lineTo(0, 700);

// line 3
var line3 = new PIXI.Graphics();
line3.lineStyle(10, 0xffffff, 1);
line3.pivot.set(0,140);
line3.rotation = 1.5709;
line3.x = 500;
line3.y = 305;
line3.moveTo(0,0);
line3.lineTo(0, 700);

// line 4
var line4 = new PIXI.Graphics();
line4.lineStyle(10, 0xffffff, 1);
line4.pivot.set(0,140);
line4.rotation = 1.5709;
line4.x = 500;
line4.y = 405;
line4.moveTo(0,0);
line4.lineTo(0, 700);

// line 5
var line5 = new PIXI.Graphics();
line5.lineStyle(10, 0xffffff, 1);
line5.pivot.set(0,140);
line5.rotation = 1.5709;
line5.x = 500;
line5.y = 505;
line5.moveTo(0,0);
line5.lineTo(0, 700);

app.stage.addChild(tile1, tile2, tile3, tile4, tile5, tile6);
app.stage.addChild(line, line2, line3, line4, line5);
