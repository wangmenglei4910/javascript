function Fn() {
  this.x = 100;
  this.y = 200;
  this.getX = function () {
    console.log(this.x);
  }
}

Fn.prototype.y = 400;
Fn.prototype.x = 300;
Fn.prototype.getX = function () {
  console.log(this.x);
};
Fn.prototype.getY = function () {
  console.log(this.y);
};
var f1 = new Fn; // {x: 100, y: 200, getX: function() {...}}
var f2 = new Fn; // {x: 100, y: 200, getX: function() {...}}
console.log(f1.getX === f2.getX); // false
console.log(f1.getY === f2.getY); // true
console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(f1.getX === Fn.prototype.getX); // false
console.log(f1.constructor); // Fn
f1.getX(); // 100
f1.__proto__.getX(); // 300
f2.getY(); // 200
Fn.prototype.getY(); // 400