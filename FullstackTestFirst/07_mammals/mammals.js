function Mammal(name){
	this.name = name;
	this.offspring = [];
}

// Mammal.prototype.sayHello = function(){
// 	return "My name is " + this.name + ", I'm a " + this.constructor.name;
// }

// Mammal.prototype.haveBaby = function(){
// 	var currentBaby = new this.constructor("Baby " + this.name, arguments[0]);
// 	this.offspring.push(currentBaby);
// 	return currentBaby;
// }

Mammal.prototype.sayHello = function(){
	return "My name is " + this.name + ", I'm a Mammal";
}

Mammal.prototype.haveBaby = function(){
	var myBaby = new Mammal("Baby " + this.name);
	this.offspring.push(myBaby);
	return myBaby;
}

function Cat(name, color){
	Mammal.call(this, name);
	this.color = color;
}

Cat.prototype = Object.create(Mammal.prototype);

Cat.prototype.constructor = Cat;
// this is an extremely optimized solution

// Cat.prototype.haveBaby = function(color){
// 	return Mammal.prototype.haveBaby.call(this, color);
// }

Cat.prototype.haveBaby = function(color){
	var myCat = new Cat("Baby " + this.name, color);
	this.offspring.push(myCat);
	return myCat
}
