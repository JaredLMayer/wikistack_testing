function RPNCalculator() {
  this.numStack = [];
}

RPNCalculator.prototype.push = function(num) {
  this.numStack.push(num);
};

RPNCalculator.prototype.popCompute = function(operationFunc){
    if (this.numStack.length < 2) {
      throw("rpnCalculator is empty");
    } else {
      var num1 = this.numStack.pop();
      var num2 = this.numStack.pop();

      this.push(operationFunc(num1,num2));
    }  
}

RPNCalculator.prototype.plus = function() {
	this.popCompute(function(first,second){
		return first + second;
	})
};

RPNCalculator.prototype.value = function() {
  return this.numStack[this.numStack.length-1];
};

RPNCalculator.prototype.minus = function() {
  this.popCompute(function(first, second){
  	return second - first;
  })
};

RPNCalculator.prototype.times = function() {
	this.popCompute(function(first,second){
		return first*second;
	})
};

RPNCalculator.prototype.divide = function() {
  this.popCompute(function(first,second){
  	return second / first;
  })
};

// IIFE Refactor:

/*

function RPNCalculator() {
  this.numStack = [];
}

(function (rpnPrototype){
  rpnPrototype.push = function(num) {
    this.numStack.push(num);
  };

  rpnPrototype.popCompute = function(operationFunc){
    if (this.numStack.length < 2) {
      throw("rpnCalculator is empty");
    } else {
      var num1 = this.numStack.pop();
      var num2 = this.numStack.pop();

      this.push(operationFunc(num1,num2));
    }
  }

  rpnPrototype.plus = function() {
    this.popCompute(function(first,second){
      return first + second;
    })
  };

  rpnPrototype.value = function() {
    return this.numStack[this.numStack.length-1];
  };

  rpnPrototype.minus = function() {
    this.popCompute(function(first, second){
      return second - first;
    })
  };

  rpnPrototype.times = function() {
    this.popCompute(function(first,second){
      return first*second;
    })
  };

  rpnPrototype.divide = function() {
    this.popCompute(function(first,second){
      return second / first;
    })
  };
})(RPNCalculator.prototype);

*/