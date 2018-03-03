var Player = function(_name, _loc) {
	this.name = _name;
	this.loc = _loc;		
	this.status = "free" 	//Could be free, blocked, ball, tackled
	this.yards = 0; 		//how many yards made by player with the ball
	this.end = false;		//at final position
	this.index = 0;			//position into steps

	this.steps = [this.loc];

	this.addLeg = function(loc, time) {
		var lastLoc = this.steps[this.steps.length - 1];
		for(int i = 1; i =< time*60; i++) {
			var newX = (lastLoc.x + ((loc.x - lastLoc.x) / (time * 60)) * i);
			var newY = (lastLoc.y + ((loc.y - lastLoc.y) / (time * 60)) * i);
			this.steps.push(new Location(newX, newY));
		}
	}

	this.move = function() {
		if(index < this.steps.length && this.status != "blocked" && this.status != "tackled") {
			this.loc = this.steps[this.index];
			this.index++;
		}
	}
}

var Location = function(_x, _y) {
	this.x = _x;
	this.y = _y;
}

var Defensive_Back = function(_name, _loc, _coverage) {
	Player.call(this, _name, _loc);

	this.coverage = _coverage; //man or zone
	this.range;

	this.ROC = function(loc, dist) {  
		return (dist / Math.sqrt(Math.pow(loc.x, 2) + Math.pow(loc.y, 2) ) );
	}

	this.slide = function(target) {
		this.loc.x = target.loc.x();
	}

	this.chase = function(target, speed) { //speed being distance per second
		this.loc.x = this.loc.x * this.ROC(target.loc, speed / 60);
	}

	this.setRange = function(center, xRadius, yRadius) {
		this.range = {topLeft: center.plus(new Location(-xRadius, yRadius)), 
			topRight: center.plus(new Location(xRadius, yRadius)), 
			botLeft: center.plus(new Location(-xRadius, -yRadius)), 
			botRight: center.plus(new Location(xRadius, -yRadius))}
	}

	this.move = function(target, speed, thresh) {
		if(this.coverage == "man"){
			if(target.loc.y <= thresh) {
				this.slide(target);
			}
			else {
				this.chase(target, speed);
			}
		}

		if(this.coverage == "zone") {

		}
	}
}