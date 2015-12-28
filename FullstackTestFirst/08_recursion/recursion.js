function factorialIterative(n){
	var total = 1;
	for(n; n >= 2; n--){
		total *= n
	}
	return total;
}


function factorial(n){
	if( n === 0){
		return 1;
	}
	return n * factorial(n-1);
}


function fib(n){
	if(n === 0 || n === 1){
		return 1;
	}
	return fib(n-1) + fib(n-2);
}

 function type(val){
 	 return Object.prototype.toString.call(val).slice(8,-1);
 	 // '[Object String]'
 }

function stringify(obj){
// 	// if(type(obj) === "Function"){
// 	// 	return obj + "";
// 	// }

// 	// if(type(obj) === "Undefined"){
// 	// 	return obj + "";
// 	// }
// 	// if(type(obj) === "Null"){
// 	// 	return obj + "";
// 	// }
// 	// if(type(obj) === "Boolean"){
// 	// 	return obj + "";
// 	// }
// 	// if(type(obj) === "Number"){
// 	// 	return obj + "";
// 	// }

	if(type(obj) === "String"){
		return '"' + obj + '"';
	}

	if(type(obj) === "Array"){


	return "[" +
		obj.map(function(o){
			return stringify(o);
		}).join(',') + "]"
	}

	// if(type(obj) === "Array"){
	// 	var myArr = [];
	// 	for(var i = 0; i < obj.length; i++){
	// 		myArr.push(stringify(obj[i]));
	// 	}
	// 	return "[" + myArr.join(',') + "]";
	// }

	if(type(obj) === "Object"){
		var result = [];
		// returns an array
		Object.keys(obj).forEach(function(key){
			var val = stringify(obj[key]);
				result.push('"' + key + '": ' + val);

		});
		return "{" + result.join(",") + "}";
	}

	return obj + ""
	// String(obj);
}
