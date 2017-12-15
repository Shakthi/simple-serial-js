#  Serializable class in ES6 

## Use case
Its common scenario in javscript development where we want to store js object into file/string. Js provides a powerfull built-in format **JSON**. However by default json format cannot contain arbitary type of object. Also restoring of original object needs little bit of work. **Serializable** class help you in this regard- serlizing and deserializing of javascript object in json format.

## General Use 

```javascript

var ast = {};

class expression extends Serializable {
	factory() {
		return ast;
		}
}
class unaryExpression extends expression {
    constructor(operator, left) {
		super();
		this.argument = left;
		this.operator = operator;
    }
}

ast.expression = expression;
var str = JSON.stringify(anExpression.toJson(), null, 2);

//Deserialzing
var createdExpression = Object.create(expression.prototype);
createdExpression.fromJson(JSON.parse(str));
```
Alternate to subclassing
```javascript
class expression {
	factory() {
		return ast;
	}
}

Serializable.mixin(expression.prototype);
````

With explcit attributes for serialization.
```javascript
class unaryExpression extends expression {
	constructor(operator, left) {
		super();
		this.argument = left;
		this.operator = operator;
	}
	serialize(){
	    return super.serialize().add('left','operator');
	}
}
```

### Unit Tests
For now, a basic test has been implmneted using ast/expression as example.
```
npm test
```

### TODO
- Support for cyclic object reference
- Add more test cases
