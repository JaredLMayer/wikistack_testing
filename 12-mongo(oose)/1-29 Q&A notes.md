/* ------------------------ */
/* QUERYING FOR COOL PEOPLE */

<query>:
	- find
	- findOne
	- findById
	- create
	- ...

// shape
<model>.<query>
.exec()
.then(function () {})

// example
Page.find({
	name: {
		$ne: 'Foobar'
	}
})
.exec() // optional
.then(successHandler, errorHandler)

// Page.create() ≈ new Page().save()

/* ---------------------------------- */
/* "JOINING" POPULATING FOR MONGOOSES */

Page.findOne()
.populate('author')
.exec()
.then(function (page) {
	console.log(page.author); // {...}
});

Page.findOne()
.exec()
.then(function (page) {
	return User.findById(page.author).exec();
})
.then(function (author) {
	console.log(author); // {...}
});

Page.findOne()
.exec()
.then(function (page) {
	return page.populate('author').execPopulate();
})
.then(function (page) {
	console.log(page.author); // {...}
});

/* ------------------------ */
/* METHODS/STATICS FOR CATS */
// hint: it's all about modularity

// statics
// i.e. <someSchema>.statics.<someName> = function () {};
// "more broad"
// execution context (`this`) will be the model
// example use case: operate on all/multiple pages
// basically, for custom query building

pageSchema.statics.findShortArticles = function () {
	return this.find({
		content: {$size: {$lt: 20}}
	})
	.exec();
};

// methods
// i.e. <someSchema>.methods.<someName> = function () {};
// "more specific"
// execution context (`this`) will be the document
// example use case: formatting a query based on a single document
// generally, just for giving documents a method

pageSchema.methods.titleCase = function (bool) {
	if (bool) {
		return this.title.toUpperCase();
	} else {
		return this.title.toLowerCase();
	}
};

/* ------------------------ */
/* NEXT/DONE AND FRIENDS */

the point of a "next" callback
is to trigger completion of some task

pattern in...
- express
- mocha async specs
- mongoose hooks

all these share asyncness
potentially many async operations

parallel OR series
- series, next triggers execution of following operation
- parllel, next triggers simply being done