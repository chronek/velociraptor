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

var Ball = function(play_type, QB) {
	if(play_type == "pass") {
		this.speed = 80;			// customize speed FIX @@@@@@@@@@@@@@@@
		this.thrown = false;		// has the ball been thrown
		this.caught = false;		// has the ball been caught
	}

	this.player = QB;
	this.yards = -5;				//starting gain in yards at snap
	this.steps = [];
	this.index = 0;

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

			for(int i = 1; i =< 90; i++) {
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

	this.steps = [this.loc];

	this.addLeg = function(loc, time) {
		var lastLoc = this.steps[this.steps.length - 1];
	}

	this.move = function() {
		if(index < this.steps.length && this.status != "blocked" && this.status != "tackled") {
			this.loc = this.steps[this.index];
		}
		this.index++;	
	}
}

var Defensive_Back = function(_name, _speed, _loc) {
	Player.call(this, _name, _loc);

	this.speed = _speed;	// being distance per second

	this.ROC = function(loc, dist) {  
		return (dist / Math.sqrt(Math.pow(loc.x, 2) + Math.pow(loc.y, 2) ) );
	}

	this.chase = function(targetLoc, speed_multiplier) { 
		this.loc.x = this.loc.x + (targetLoc.x - this.loc.x) 
			* this.ROC(targetLoc, speed_multiplier * (this.speed / 60));
			
		this.loc.y = this.loc.y + (targetLoc.y - this.loc.y) 
			* this.ROC(targetLoc, speed_multiplier * (this.speed / 60));
	}
}

var Defensive_Back_Man = function(_name, _speed, _loc) {
	Defensive_Back.call(this, _name, __speed, _loc);

	this.slide = function(target) {
		this.loc.x = target.loc.x();
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

var Quater_Back = function(_name, _loc, wait) {
	Player.call(this, _name, _loc);
	this.wait_time = wait;	//nums of secs to wait
	this.index = 0;
	this.range;

	this.setRange = function() {
		this.range = new range(
			this.loc.plus(new Location(-20, 20)), 
			this.loc.plus(new Location(20, -20))
		);
	}

	this.throw = function(target, ball){
		if(target.steps[target.index + 90] != undefined) {
			ball.throw(target.steps[target.index + 90])
		}
	}

	this.addLeg = function(loc, time) {
		var lastLoc = this.steps[this.steps.length - 1];
	}

	this.action = function(play, ball, target){
		if(play == "run" && this.wait_time == index) {
			this.setRange();
			if(this.range.inRange(target)){
				ball.handoff(target);
			}
			else {
				this.play = "pass";
				this.wait_time += 60;
			}
		}
		if(play == "pass" && ball.thrown == false && this.wait_time * 60 <= index) {
			this.throw(target, ball);
		}
		if(index < this.steps.length && this.status != "tackled") {
			this.loc = this.steps[this.index];
		}
		this.index++;
	}
}

var Running_Back = function(_name, _loc) {
	Player.call(this, _name, _loc);
	this.hasBall = false;

	this.takeBall = function() {
		this.hasBall = true;
	}
}














