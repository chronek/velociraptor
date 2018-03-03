var Player = function(_name, _loc) {
	this.name = _name;
	this.loc = _loc;		
	this.status = "free" 	//Could be free, blocked, ball, tackled
	this.yards = 0; 		//how many yards made by player with the ball
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
		}
		this.index++;	
	}
}

var Defensive_Back_Man = function(_name, _loc, _coverage) {
	Player.call(this, _name, _speed, _loc);

	this.speed = _speed;	// being distance per second

	this.ROC = function(loc, dist) {  
		return (dist / Math.sqrt(Math.pow(loc.x, 2) + Math.pow(loc.y, 2) ) );
	}

	this.slide = function(target) {
		this.loc.x = target.loc.x();
	}

	this.chase = function(target) { 
		this.loc.x = this.loc.x * this.ROC(target.loc, this.speed / 60);
		this.loc.y = this.loc.y * this.ROC(target.loc, this.speed / 60);
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

	this.speed = _speed;	// being distance per second
	this.range;

	this.setRange = function(center, xRadius, yRadius) {
		this.range = new range(
			center.plus(new Location(-xRadius, yRadius)), 
			center.plus(new Location(xRadius, -yRadius))
		);
	}

	this.ROC = function(loc, dist) {  
		return (dist / Math.sqrt(Math.pow(loc.x, 2) + Math.pow(loc.y, 2) ) );
	}


	this.chase = function(targetLoc, speed_multiplier) { 
		this.loc.x = this.loc.x + (targetLoc.x - this.loc.x) 
			* this.ROC(targetLoc, speed_multiplier * (this.speed / 60));
			
		this.loc.y = this.loc.y + (targetLoc.y - this.loc.y) 
			* this.ROC(targetLoc, speed_multiplier * (this.speed / 60));
	}


	this.moveMan = function(targets) {
		targets.forEach(function(target) {
			if(this.range.inRange(target){
				this.chase(target, 1);
				return;
			}
			else {
				this.chase(this.range.center, .4);
			}
		});
	}

}

var Location = function(_x, _y) {
	this.x = _x;
	this.y = _y;

	this.plus = function(otherLoc) {
		var outX = this.x + otherLoc.x;
		var outY = this.y + otherLoc.y;
		return = new Location(outX, outY)
	}
}

var range = function(tl, br) {
	this.topLeft = tl;
	this.botRight = br;
	this.center = new Location(((br.x - tl.x) / 2) 
		+ tl.x, ((tl.y - br.y) / 2) + br.y);

	this.inRange = function(target){
		if(target.loc.x >= topLeft.x && target.loc.x <= botRight.x 
			&& target.loc.y <= topLeft.y && target.loc.y >= botRight.y){

			return true;
		}

		return false;
	}
}