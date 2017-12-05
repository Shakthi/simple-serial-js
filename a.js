var S=require('./serializable.js');


var test = function ()
{
 this.a="asdasd";
}

S.mixin(test.prototype);

test.prototype.factory = { test}

var k = new test();

console.log(k.toJson());




