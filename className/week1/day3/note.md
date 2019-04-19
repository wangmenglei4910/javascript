# day3

## 什么是堆栈内存

### 堆内存创建和释放

### 栈内存创建和释放

- 形成栈内存不销毁的条件

### 不销毁栈内存的应用

- 累加计数

### 作业题

```javascript

// 题一
function fn(n) {
    return function(a) {
      a++;
      n += a
      console.log(n);
    };
  }
  var f = fn(10);
  f(1);
  f(2);

  // 题二
  function fn(n) {
    n = n;
    return function(a) {
      a++;
      console.log((n += a));
    };
  }
  var f = fn(10);
  f(1);

  // 题三
  var num = 20;
  var obj = {
    num: 30,
    fn: (function(num) {
      num += 5;
      return function() {
        console.log(num);
      };
    })(num)
  };
  obj.fn(num);

  // 题四
function fun(n, o) {//
  console.log(o); //
  return {
    fun: function (m) { //
        return fun(m, n);
    }
  };
}
var a = fun(0);
a.fun(1);
a.fun(2);
a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);

var c = fun(0).fun(1);
c.fun(2);
c.fun(3);
console.log(a);
console.log(b);
console.log(c);

```
