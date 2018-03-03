var width = 550;
var height = 50;
var app = new PIXI.Application(width, 600);

document.body.appendChild(app.view);

// make texture
var texture = PIXI.Texture.fromImage("light_green.jpg");
var texture2 = PIXI.Texture.fromImage("dark_green.png");

// use textures to make tiles
var tile1 = new PIXI.TilingSprite(texture, width, height);
var tile2 = new PIXI.TilingSprite(texture2, width, height);
var tile3 = new PIXI.TilingSprite(texture, width, height);
var tile4 = new PIXI.TilingSprite(texture2, width, height);
var tile5 = new PIXI.TilingSprite(texture, width, height);
var tile6 = new PIXI.TilingSprite(texture2, width, height);
var tile7 = new PIXI.TilingSprite(texture, width, height);
var tile8 = new PIXI.TilingSprite(texture2, width, height);
var tile9 = new PIXI.TilingSprite(texture, width, height);
var tile10 = new PIXI.TilingSprite(texture2, width, height);
var tile11 = new PIXI.TilingSprite(texture, width, height);
var tile12 = new PIXI.TilingSprite(texture2, width, height);

// place tiles on board
tile2.y = 50;
tile3.y = 100;
tile4.y = 150;
tile5.y = 200;
tile6.y = 250;
tile7.y = 300;
tile8.y = 350;
tile9.y = 400;
tile10.y = 450;
tile11.y = 500;
tile12.y = 550;

var line_height = 6;
var add_y = line_height / 2;
// line 1
var line = new PIXI.Graphics();
line.lineStyle(line_height, 0xffffff, 1);
line.pivot.set(0,140);
line.rotation = 1.5709;
line.x = 500;
line.y = 50 + add_y;
line.moveTo(0,0);
line.lineTo(0, 700);

// line 2
var line2 = new PIXI.Graphics();
line2.lineStyle(line_height, 0xffffff, 1);
line2.pivot.set(0,140);
line2.rotation = 1.5709;
line2.x = 500;
line2.y = 100 + add_y;
line2.moveTo(0,0);
line2.lineTo(0, 700);

// line 3
var line3 = new PIXI.Graphics();
line3.lineStyle(line_height, 0xffffff, 1);
line3.pivot.set(0,140);
line3.rotation = 1.5709;
line3.x = 500;
line3.y = 150 + add_y;
line3.moveTo(0,0);
line3.lineTo(0, 700);

// line 4
var line4 = new PIXI.Graphics();
line4.lineStyle(line_height, 0xffffff, 1);
line4.pivot.set(0,140);
line4.rotation = 1.5709;
line4.x = 500;
line4.y = 200 + add_y;
line4.moveTo(0,0);
line4.lineTo(0, 700);

// line 5
var line5 = new PIXI.Graphics();
line5.lineStyle(line_height, 0xffffff, 1);
line5.pivot.set(0,140);
line5.rotation = 1.5709;
line5.x = 500;
line5.y = 250 + add_y;
line5.moveTo(0,0);
line5.lineTo(0, 700);

// line 6
var line6 = new PIXI.Graphics();
line6.lineStyle(line_height, 0xffffff, 1);
line6.pivot.set(0,140);
line6.rotation = 1.5709;
line6.x = 500;
line6.y = 300 + add_y;
line6.moveTo(0,0);
line6.lineTo(0, 700);

// line 7
var line7 = new PIXI.Graphics();
line7.lineStyle(line_height, 0xffffff, 1);
line7.pivot.set(0,140);
line7.rotation = 1.5709;
line7.x = 500;
line7.y = 350 + add_y;
line7.moveTo(0,0);
line7.lineTo(0, 700);

// line 8
var line8 = new PIXI.Graphics();
line8.lineStyle(line_height, 0xffffff, 1);
line8.pivot.set(0,140);
line8.rotation = 1.5709;
line8.x = 500;
line8.y = 400 + add_y;
line8.moveTo(0,0);
line8.lineTo(0, 700);

// line 9
var line9 = new PIXI.Graphics();
line9.lineStyle(line_height, 0xffffff, 1);
line9.pivot.set(0,140);
line9.rotation = 1.5709;
line9.x = 500;
line9.y = 450 + add_y;
line9.moveTo(0,0);
line9.lineTo(0, 700);

// line 10
var line10 = new PIXI.Graphics();
line10.lineStyle(line_height, 0xffffff, 1);
line10.pivot.set(0,140);
line10.rotation = 1.5709;
line10.x = 500;
line10.y = 500 + add_y;
line10.moveTo(0,0);
line10.lineTo(0, 700);

// line 11
var line11 = new PIXI.Graphics();
line11.lineStyle(line_height, 0xffffff, 1);
line11.pivot.set(0,140);
line11.rotation = 1.5709;
line11.x = 500;
line11.y = 550 + add_y;
line11.moveTo(0,0);
line11.lineTo(0, 700);

// vertical lines
var vLine1 = new PIXI.Graphics();
vLine1.lineStyle(line_height, 0xffffff, 1);
vLine1.pivot.set(0, 0);
vLine1.rotation = 0;
vLine1.x = 150;
vLine1.moveTo(0,0);
vLine1.lineTo(0, 600);

// line 11
var vLine2 = new PIXI.Graphics();
vLine2.lineStyle(line_height, 0xffffff, 1);
vLine2.pivot.set(0, 0);
vLine2.rotation = 0;
vLine2.x = 400;
vLine2.moveTo(0, 0);
vLine2.lineTo(0, 600);


// adding all the tiles
app.stage.addChild(tile1, tile2, tile3, tile4, tile5, tile6);
app.stage.addChild(tile7, tile8, tile9, tile10, tile11, tile12);
app.stage.addChild(line, line2, line3, line4, line5);
app.stage.addChild(line6, line7, line8, line9, line10, line11);
app.stage.addChild(vLine1, vLine2);
