var Location = function(_x, _y) {
	this.x = _x;
	this.y = _y;

	this.plus = function(otherLoc) {
		var outX = this.x + otherLoc.x;
		var outY = this.y + otherLoc.y;
		return new Location(outX, outY);
	}
}

var range = function(tl, br) {
	this.topLeft = tl;
	this.botRight = br;
	this.center = new Location(((br.x - tl.x) / 2)
		+ tl.x, ((tl.y - br.y) / 2) + br.y);

	this.inRange = function(target){
		if(target.loc.x >= this.topLeft.x && target.loc.x <= this.botRight.x
			&& target.loc.y >= this.topLeft.y && target.loc.y <= this.botRight.y){

			return true;
		}

		return false;
	}
}

var Ball = function(play_type) {
	if(play_type == "pass") {
		this.thrown = false;		// has the ball been thrown
		this.caught = false;		// has the ball been caught
	}
  this.play = play_type;
	this.player;
	this.yards = -5;				//starting gain in yards at snap
	this.steps = [];
	this.index = 0;

	this.setPlayer = function(newPlayer) {
		this.player = newPlayer;
	};

	this.handoff = function(newPlayer) {
		this.player = newPlayer;
		newPlayer.takeBall();
	}


	this.down = function(player) {
		if(this.thrown == true) {
			if(this.caught == true) {
				this.yards = player.yards;
			}
			else {
				this.yards = 0;
			}
		}
	}

	this.throw = function(targetLoc) {
		if(this.thrown == false){
			this.steps.push(this.player.loc);

			for(i = 1; i <= 90; i++) {
				var newX = (targetLoc.x + ((this.player.loc.x - targetLoc.x) / 90) * i);
				var newY = (targetLoc.y + ((this.player.loc.y - targetLoc.y) / 90) * i);
				this.steps.push(new Location(newX, newY));
			}
		}
	}

	this.move = function() {
		if(this.caught == true || this.thrown == false){
			this.loc = this.player.loc;
		}
		else if(this.thrown == true){
			this.loc = this.steps[this.index];
			this.index++;
		}
	}
}

var Player = function(_name, _loc) {
	this.name = _name;
	this.loc = _loc;
	this.status = "free" 	//Could be free, blocked, ball, tackled
	this.yards = 0; 		//how many yards made by player with the ball
	this.index = 0;			//position into steps
  this.hasBall = false;

  this.steps = [this.loc];


  this.takeBall = function() {
    this.hasBall = true;
  }

  this.addLeg = function(loc, time) {
		var lastLoc = this.steps[this.steps.length - 1];

		for(i = 1; i <= time * 60; i++) {
			var newX = (lastLoc.x + ((loc.x - lastLoc.x) / (time * 60)) * i);
			var newY = (lastLoc.y + ((loc.y - lastLoc.y) / (time * 60)) * i);
			this.steps.push(new Location(newX, newY));
		}
	}

	this.move = function() {
		if(this.index < this.steps.length && this.status != "blocked" && this.status != "tackled") {
			this.loc = this.steps[this.index];
		}
		this.index++;
	}
}

var Receiver = function(_name, _loc) {
	Player.call(this, _name, _loc);
}

var Defensive_Back = function(_name, _speed, _loc) {
	Player.call(this, _name, _loc);

	this.speed = _speed;	// being distance per second

	this.ROC = function(loc, dist) {
		return (dist / Math.sqrt(Math.pow(loc.x, 2) + Math.pow(loc.y, 2) ) );
	}

	this.chase = function(targetLoc, speed_multiplier) {
		this.loc.x = this.loc.x + ((targetLoc.x - this.loc.x)
			* this.ROC(targetLoc, speed_multiplier * (this.speed / 60)));

		this.loc.y = this.loc.y + ((targetLoc.y - this.loc.y)
			* this.ROC(targetLoc, speed_multiplier * (this.speed / 60)));
	}
}

var Defensive_Back_Man = function(_name, _speed, _target, _loc) {
	Defensive_Back.call(this, _name, _speed, _loc);
	this.target = _target;
	this.thresh = this.loc.y + 25;

	this.slide = function() {
		this.loc.x = this.target.loc.x;
	}

	this.move = function() {
		if(this.target.loc.y >= this.thresh) {
			this.slide(this.target);
		}
		else {
			this.chase(this.target.loc, 12);
		}
	}
}

var Defensive_Back_Zone = function(_name, _speed, _loc, _coverage) {
	Defensive_Back.call(this, _name, __speed, _loc);

	this.range;

	this.setRange = function(center, xRadius, yRadius) {
		this.range = new range(
			center.plus(new Location(-xRadius, yRadius)),
			center.plus(new Location(xRadius, -yRadius))
		);
	}

	this.move = function(targets) {
		targets.forEach(function(target) {
			if(this.range.inRange(target)) {
				this.chase(target, 1);
				return;
			}
			else {
				this.chase(this.range.center, .4);
			}
		});
	}
}

var Quarter_Back = function(_name, _loc, wait, _ball) {
	Player.call(this, _name, _loc);
	this.wait_time = wait * 60;	//nums of secs to wait
	this.index = 0;
	this.range;
	this.ball = _ball;
  this.hasBall = true;

	this.setRange = function() {
		this.range = new range(
			this.loc.plus(new Location(-100, -100)),
			this.loc.plus(new Location(100, 100))
		);
	}

	this.throw = function(target){
		if(target.steps[target.index + 90] != undefined) {
			this.ball.throw(target.steps[target.index + 90])
		}
	}

	this.action = function(target){
		if(ball.play == "run" && this.wait_time <= this.index) {
			this.setRange();
			if(this.range.inRange(target) && this.hasBall == true){
				this.ball.handoff(target);
        this.hasBall = false;
			}
			else {
				this.play = "pass";
				this.wait_time += 60;
			}
		}
		if(this.ball.play == "pass" && this.ball.thrown == false && this.wait_time * 60 <= index) {
			this.throw(target);
		}
		if(this.index < this.steps.length && this.status != "tackled") {
			this.loc = this.steps[this.index];
		}
		this.index++;
	}
}

var width = 770;
var height = 70;
var app = new PIXI.Application(width, 12 * height);

document.body.appendChild(app.view);

// make textures
var texture = PIXI.Texture.fromImage("light_green.jpg");
var texture2 = PIXI.Texture.fromImage("dark_green.png");

// create tiling sprites
var tiles = [];
for(i = 0; i < 12; i ++) {
  if(i % 2 == 1) var tile = new PIXI.TilingSprite(texture2, width, height);
  else var tile = new PIXI.TilingSprite(texture, width, height);
  tile.y = height * i;
  tiles.push(tile);
}

var line_height = 6;
var add_y = line_height / 2;

// create horizontal lines
var Lines = [];
for (i = 1; i < 12; i++) {
  var line = new PIXI.Graphics();
  line.lineStyle(line_height, 0xffffff, 1);
  line.rotation = 1.5709;
  line.x = width;
  line.y = tiles[i].y + add_y;
  line.moveTo(0,0);
  line.lineTo(0, width);
  Lines.push(line);
}

// vertical lines
var vLine1 = new PIXI.Graphics();
vLine1.lineStyle(line_height, 0xffffff, 1);
vLine1.pivot.set(0, 0);
vLine1.rotation = 0;
vLine1.x = 250;
vLine1.moveTo(0,0);
vLine1.lineTo(0, height * 12);
Lines.push(vLine1);

var vLine2 = new PIXI.Graphics();
vLine2.lineStyle(line_height, 0xffffff, 1);
vLine2.pivot.set(0, 0);
vLine2.rotation = 0;
vLine2.x = 520;
vLine2.moveTo(0, 0);
vLine2.lineTo(0, height * 12);
Lines.push(vLine2);

// game
var Sprites = [];
var objs = [];

var ball = new Ball("run");
objs.push(new Quarter_Back("qb", new Location(width / 2 - 20, 700), 0, ball));
objs.push(new Receiver("r1", new Location(125, 8 * height)));
objs.push(new Receiver("r2", new Location(225, 8 * height)));
objs.push(new Receiver("r3", new Location(width - 225, 8 * height)));
objs.push(new Receiver("r4", new Location(width - 125, 8 * height)));
objs.push(new Defensive_Back_Man('d1', 120, objs[1], new Location(125, 6 * height)));
objs.push(new Defensive_Back_Man('d2', 120, objs[2], new Location(225, 6 * height)));
objs.push(new Defensive_Back_Man('d3', 120, objs[3], new Location(width - 225, 6 * height)));
objs.push(new Defensive_Back_Man('d4', 120, objs[4], new Location(width - 125, 6 * height)));


Sprites.push(PIXI.Sprite.fromImage("Lol_circle.png"));
Sprites.push(PIXI.Sprite.fromImage("Pan_Blue_Circle.png"));
Sprites.push(PIXI.Sprite.fromImage("Pan_Blue_Circle.png"));
Sprites.push(PIXI.Sprite.fromImage("Pan_Blue_Circle.png"));
Sprites.push(PIXI.Sprite.fromImage("Pan_Blue_Circle.png"));
Sprites.push(PIXI.Sprite.fromImage("red_thing.png"));
Sprites.push(PIXI.Sprite.fromImage("red_thing.png"));
Sprites.push(PIXI.Sprite.fromImage("red_thing.png"));
Sprites.push(PIXI.Sprite.fromImage("red_thing.png"));

function loadSprites(_objs){
	for(i = 0; i < Sprites.length; i++) {
		Sprites[i].x = _objs[i].loc.x;
		Sprites[i].y = _objs[i].loc.y;
	}
}

for(i = 0; i < 12; i++) {
	app.stage.addChild(tiles[i]);
}
for(i = 0; i < 13; i++) {
	app.stage.addChild(Lines[i]);
}
for(i = 0; i < Sprites.length; i++) {
	app.stage.addChild(Sprites[i]);
}

objs[1].addLeg(new Location(objs[1].loc.x - 125, 200), 2);
objs[1].addLeg(new Location(objs[1].loc.x - 125, 0), .75);
objs[2].addLeg(new Location(objs[2].loc.x, 500), .5);
objs[2].addLeg(new Location(objs[2].loc.x + 250, 450), .7);
objs[2].addLeg(new Location(objs[2].loc.x + 250, 150), .7);
objs[3].addLeg(new Location(objs[3].loc.x, 0), 1.5);
objs[4].addLeg(new Location(objs[4].loc.x + 85, 180), 1.75);
objs[4].addLeg(new Location(objs[4].loc.x + 85, 0), .70);


app.ticker.add(function(delta) {
	//console.log(dm.loc);
	ball.move();
	objs[0].action(objs[1]);
	for(i = 1; i < objs.length; i++) {
		objs[i].move();
	}

	loadSprites(objs);
});
