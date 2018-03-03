var app = new PIXI.Application(500, 600);

document.body.appendChild(app.view);

var texture = PIXI.Texture.fromImage("dark_green.png");
var texture2 = PIXI.Texture.fromImage("light_green.jpg");

var tile1 = new PIXI.TilingSprite(texture, 500, 100);
var tile2 = new PIXI.TilingSprite(texture2, 500, 100);

app.stage.addChild(tile1, tile2);
