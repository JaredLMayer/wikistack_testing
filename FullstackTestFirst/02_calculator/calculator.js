function createCalculator(){

	var objToReturn = {total: 0};
	// objToReturn.total = 0;

	objToReturn.value = function(){
		return this.total;
	}

	objToReturn.add = function(num){
		this.total += num;
	}

	objToReturn.subtract = function(num){
		this.total -= num;
	}


	return objToReturn;
}

