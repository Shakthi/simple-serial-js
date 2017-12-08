"use strict";
var Serializable = require('./serializable.js');

debugger;
var ast = {};

class expression extends Serializable {

	factory() {
		return ast;
	}

}


class terminalExpression extends expression {

	constructor(terminalValue) {
		super();
		this.terminalValue = terminalValue;

	}
}


class unaryExpression extends expression {

	constructor(operator, left) {
		super();
		this.argument = left;
		this.operator = operator;
	}



}



class binaryExpression extends expression {

	constructor(left, operator, right) {
		super();
		this.operator = operator;
		this.left = left;
		this.right = right;

	}
}

try {

	throw ("");
} catch (e) {}


ast.expression = expression;
ast.terminalExpression = terminalExpression;
ast.unaryExpression = unaryExpression;
ast.binaryExpression = binaryExpression;


console.log("Lets construct (10*-20)+30");

var anExpression = new binaryExpression(
	new binaryExpression(new terminalExpression(10), '*', new unaryExpression('-', new terminalExpression(20))),
	'+', new terminalExpression(30));

console.log(anExpression);
var str = JSON.stringify(anExpression.toJson(), null, 2);
console.log(str);

var anotherExpression = Object.create(expression.prototype);
anotherExpression.fromJson(JSON.parse(str));

console.log(anotherExpression);

var str2 = JSON.stringify(anotherExpression.toJson(), null, 2);

if (str != str2) {
	console.error("Test failed");
	process.exit(1);
}


