var concat_string = function(){
	var finalString = "";
	for(var i = 0; i < arguments.length; i++){
		finalString += arguments[i];
	}
	return finalString
}


var yourFunctionRunner = function(){
	var finalString = "";
	for(var i = 0; i < arguments.length; i++){
		finalString += arguments[i]();
	}
	return finalString;
}

var yourFunctionRunner = function(fnToRun, secondFnToRun){
	var finalString ="";

	for(var i = 0; i < arguments.length; i++){
		var fnToRun = arguments[i];
		finalString += fnToRun();
	}
	return finalString;
}

var makeAdder = function(numberToRemember){
	return function(numberToAdd){
		return numberToAdd + numberToRemember;
	};
};


var once = function(fnToRunOnceOnly){
	var hasRan = false;
	return function(){
		if(hasRan === false){
			fnToRunOnceOnly();
			hasRan = true;
		}
	}
}

var createObjectWithTwoClosures = function(){
	var num = 0;
	return {
		oneIncrementer: function(){
			num += 1;
		},
		tensIncrementer: function(){
			num += 10;
		},
		getValue: function(){
			return num;
		}
	};
}
