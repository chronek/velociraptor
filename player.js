var Player = function(_type, _loc){
	this.type = _type;
	this.loc = _loc;		
	this.status = "free" 	//Could be free, blocked, ball, tackled
	this.yards = 0; 		//how many yards made by player with the ball
	this.end = false;		//at final position
	this.index = 0;			//position into steps

	this.steps = [this.loc];

	this.addLeg = function(loc, time){
		var lastLoc = this.steps[this.steps.length - 1];
		for(int i = 1; i =< time*60; i++){
			var newX = (lastLoc.x + ((loc.x - lastLoc.x) / (time * 60)) * i);
			var newY = (lastLoc.y + ((loc.y - lastLoc.y) / (time * 60)) * i);
			this.steps.push(new Location(newX, newY));
		}
	}

	this.move = function(){
		if(index < this.steps.length && this.status != "blocked" && this.status != "tackled"){
			this.loc = this.steps[this.index];
			this.index++;
		}
	}
}

var Location = function(_x, _y){
	this.x = _x;
	this.y = _y;
}