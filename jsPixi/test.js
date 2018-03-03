var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

// create a new Sprite from an image path
var dot1 = PIXI.Sprite.fromImage('Black_dot.png')
var dot2 = PIXI.Sprite.fromImage('Black_dot.png')
var dot3 = PIXI.Sprite.fromImage('Black_dot.png')

// center the sprite's anchor point
dot1.anchor.set(0.5);
dot2.anchor.set(0.5);
dot3.anchor.set(0.5);


// move the sprite to the center of the screen
dot1.x = app.screen.width / 2 + 10;
dot1.y = app.screen.height / 2;

app.stage.addChild(dot1);

dot2.x = app.screen.width / 2 + 15;
dot2.y = app.screen.height / 2;

app.stage.addChild(dot2);

dot3.x = app.screen.width / 2 + 20;
dot3.y = app.screen.height / 2;

app.stage.addChild(dot3s);

// Listen for animate update
app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    dot1.y += delta;
    dot2.y += delta;
    dot3.y += delta;
});
