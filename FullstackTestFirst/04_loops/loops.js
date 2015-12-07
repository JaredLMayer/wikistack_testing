/* REPEAT SOLUTION */

function repeat(str, multi){
	var finalString = "";
	for(multi; multi > 0; multi--){
		finalString += str;
	}
	return finalString;
}


/* SUM SOLUTION */

function sum(inputArr){
	var total = 0;
	for(var i =0; i < inputArr.length; i++){
		total += inputArr[i]
	}
	return total;
}


/* GRID GENERATOR SOLUTION */

// function gridGenerator(size){
// 	var board = "";
// 	// i is the lines
// 	for(var i = 0; i < size; i++){
// 		// j is the characters
// 		for(var j =0; j < size; j++){
// 			if((i+j) % 2 === 0){
// 				board += "#";
// 			} else {
// 				board += " ";
// 			}
// 		}
// 	board += "\n";
// 	}
// 	return board;
// }


var gridGenerator = function(dim){
	var grid="";
	//for (var col=0;col<dim; col++)
		for (var row=0;row<dim; row++)
			if (row%2===0){
		   	grid=grid+'#' + ' ' + '\n';}
	//console.log(grid);
	return grid;
		
	

};


/* LARGESTRIPLET SOLUTION */

function largestTriplet(num){
	var a;
	for(var c = num; c > 0; c--){
		for(var b = c-1; b > 0; b--){
			a = Math.sqrt((c*c) - (b*b));
			// tests if it is a whole number, integer (non fraction/decimal)
			if(a % 1 === 0){
				return [a,b,c];
			}
		}
	}
}

// recursive solution

// var largestTriplet = function (c) {
//   for (var b = c - 1; b > 0; b--) {
//     for (var a = b; a > 0; a--) {
//       if (a * a + b * b === c * c) {
//         //return the result if one is found
//         return [a, b, c];
//       }
//     }
//   }
//   //otherwise try with the next-smallest number for c
//   return largestTriplet(c - 1);
// }

/* LARGESTTRIPLET SOLUTION */

// function largestTriplet(num){
//   for(var c=num; c>0;c--){
//     for(var b=c-1;b>0;b--){
//         // checks all values of b
// 			for(var a=c-1;a>0;a--){
// 			    // checks all values of a
// 			    //  a*a + b*b
// 				if (Math.pow(a,2)+Math.pow(b,2)===Math.pow(c,2)){
// 				    return [a,b,c];
// 				}
// 			}
// 		}
//  	}
// }



/* JOIN SOLUTION */


function join(inputArr, delimiter){
	var finalString = "";
	for(var i = 0; i < inputArr.length; i++){
		finalString += inputArr[i];
		if(typeof delimiter === "undefined"){
			delimiter = "";
		}
		if(i !== inputArr.length - 1){
			finalString += delimiter
		}
	}
	return finalString;
}

/* PARAMIFY SOLUTION */

function paramify(obj){
	var params = [];
	for(var prop in obj){
		if(Object.hasOwnProperty.call(obj, prop)){
			params.push(prop + "=" + obj[prop]);
		}
	}
	params.sort();
	// used the join function created earlier
	return join(params,"&");
}

// var paramify = function(object) {
// 	var newString = ""
// 	var yourArray = [];

//   for(var key in object) {
//     if (typeof key !== "undefined") {
//        yourArray.push(key + "=" + object[key]);
//       if((Object.keys(object)).length > 1) {
//         if(key !== Object.keys(object).pop()) {
//           newString += "&"
//         }
//       }
//   }
// return yourArray.sort().join("&");
// }
