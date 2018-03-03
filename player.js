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

var range = function(tl, br) {
	this.topLeft = tl;
	this.botRight = br;

	this.inRange = function(target){
		if(target.loc.x >= topLeft.x && target.loc.x <= botRight.x 
			&& target.loc.y <= topLeft.y && target.loc.y >= botRight.y){

			return true;
		}

		return false;
	}
}

var Defensive_Back_Man = function(_name, _loc, _coverage) {
	Player.call(this, _name, _speed, _loc);

	this.coverage = _coverage; //man or zone
	this.speed = _speed;	// being distance per second

	this.ROC = function(loc, dist) {  
		return (dist / Math.sqrt(Math.pow(loc.x, 2) + Math.pow(loc.y, 2) ) );
	}

	this.slide = function(target) {
		this.loc.x = target.loc.x();
	}

	this.chase = function(target) { 
		this.loc.x = this.loc.x * this.ROC(target.loc, this.speed / 60);
	}


	this.move = function(target, thresh) {
		if(target.loc.y <= thresh) {
			this.slide(target);
		}
		else {
			this.chase(target, this.speed);
		}
	}
}

var Defensive_Back_Zone = function(_name, _loc, _coverage) {
	Player.call(this, _name, _speed, _loc);

	this.coverage = _coverage; //man or zone
	this.speed = _speed;	// being distance per second
	this.range;

	this.ROC = function(loc, dist) {  
		return (dist / Math.sqrt(Math.pow(loc.x, 2) + Math.pow(loc.y, 2) ) );
	}


	this.chase = function(target) { 
		this.loc.x = this.loc.x * this.ROC(target.loc, this.speed / 60);
	}

	this.setRange = function(center, xRadius, yRadius) {
		this.range = new range(
			center.plus(new Location(-xRadius, yRadius)), 
			center.plus(new Location(xRadius, -yRadius))
		);
	}

	this.moveMan = function(targets) {
		targets.forEach(function(target) {
			if(this.range.inRange(target){
				this.chase(target, this.speed);
				return;
			}
		});
	}

}