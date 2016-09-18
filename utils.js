Math.DegrToRad = function(degr){
	return (Math.PI / 180) * degr;
}

Math.RadToDegr = function(rad){
	return (180 / Math.PI) * rad;
}
function Vector2(x, y){	this.x = x;	this.y = y;}Vector2.Normalize = function(vector2){if (arguments.length == 1){	var length = this.Length(vector2);	var vector = new Vector2(vector2.x, vector2.y);	if (length != 0){		vector.x /= length;		vector.y /= length;	}		return vector;}throw "Error: Vector2.Normalize requires 1 argument\nArguments: " + arguments.length;}Vector2.Length = function(vector2){if (arguments.length == 1){	return Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);}throw "Error: Vector2.Length requires 1 argument\nArguments: " + arguments.length;}Vector2.Distance = function(vectorStart, vectorEnd){if (arguments.length == 2){	var vectorDistance = new Vector2(vectorStart.x - vectorEnd.x, vectorStart.y - vectorEnd.y);		return Vector2.Length(vectorDistance);}throw "Error: Vector2.Distance requires 2 arguments\nArguments: " + arguments.length;}Vector2.direction = function(vectorStart, vectorEnd){	var heading = new Vector2(vectorStart.x - vectorEnd.x, vectorStart.y - vectorEnd.y);	var distance = Vector2.Distance(vectorStart, vectorEnd);		var direction = new Vector2(heading.x / distance.x, heading.y / distance.y);		return direction;}