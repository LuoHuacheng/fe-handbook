---
  category: JS
---

# this的指向

## 调用位置的判定

- 分析调用栈，调用位置就是当前正在执行的函数的前一个调用中
- 使用开发者工具得到，设置断点或插入 debugger 会同时展示当前位置的函数列表（调用栈），栈中的第二个元素即是真正的调用位置

## 绑定规则

- 默认绑定
  - 独立函数调用，可看作是无法应用其他规则时的默认规则，指向全局对象
  - 严格模式下，不能将全局对象用于默认绑定，会绑定到 undefined；
  - 非严格模式下默认绑定才能绑定到全局对象；
  - 严格模式下调用函数则不影响默认绑定
- 隐式绑定
  - 当函数引用有上下文对象时，此规则会把函数中的this绑定到该上下文对象中
  - 特定情况会丢失绑定对象，此时应用默认绑定规则，绑定到全局对象或者 undefined 上
  - 参数传递即常用的隐式绑定，传入函数时会被隐式绑定，因此回调函数丢失 this 是常见现象
- 显式绑定
  - 使用 call、apply、bind 方法，可以强制绑定 this 指向
  - 硬绑定
    - 可以将 this 强制绑定到除 new 以外的指定对象，但是会降低函数灵活性，硬绑定后无法再使用隐式绑定或显式绑定修改 this
    - 使用 ES5 的 Function.prototype.bind，返回一个硬绑定的新函数
    - 使用 apply 创建一个包裹函数，接收要绑定的对象并返回值
    - 在函数内部手动调用 fn.call(obj)，强制将 fn 的 this 绑定到 obj 上
  - API调用的上下文
    - 许多内置函数提供了一个可选的上下文（context）参数，其作用与 bind 相同，确保回调函数使用指定的 this；这些函数实际上是通过 call 或 apply 实现了显式绑定
- new 绑定
  - 构造函数（构造函数调用），使用 new 操作符时被调用的普通函数
  - 顺序
    1. 创建（构造）一个新对象
    2. 新对象会被执行 Prototype 连接
    3. 新对象会绑定函数调用的 this
    4. 如果函数没有返回其它对象，那么 new 表达式中的函数调用会自动返回这个新对象 var bar = new foo(2); 会将 bar 绑定到 foo 的 this 上

## 绑定优先级

- new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定
- 绑定规则的优先级由高到低排列，高优先级的规则会覆盖低优先级的规则

## 绑定例外

- 被忽略的this
  - 将 null 或 undefined 作为 this 的绑定对象传入 call , apply 或 bind 时会被忽略并应用默认规则
  - 使用 apply 展开一个数组并作为参数传入一个函数
  - 使用 bind 对参数进行柯里化（预先设置一些参数）
  - 传入 null 可能会产生副作用，可能会对某个确实使用了 this 的函数应用默认规则更安全的做法是传入一个特殊的对象（空对象）Object.create(null)不会创建 Object.prototype这个委托，比 {} 更好

- 间接引用
  - 赋值时容易发生间接引用，此时调用函数会应用默认规则

- 软绑定
  - 给默认绑定指定一个全局对象和 undefined 以外的值以实现硬绑定相同的效果并且保留了隐式或显式修改 this 的能力

  ```js
  // 默认绑定规则，优先级排最后
  // 如果this绑定到全局对象或者undefined
  // 那就把指定的默认对象obj绑定到this
  // 否则不会修改this
  if(!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
    var fn = this;
    // 捕获所有curried参数
    var curried = [].slice.call(arguments, 1);
    var bound = function() {
        return fn.apply(
          (!this || this === (window || global)) ? obj : this,
          curried.concat.apply(curried, arguments)
        );
    };
    bound.prototype = Object.create(fn.prototype); return bound; };
  }
  ```

## this 词法

- ES6 的箭头函数无法使用上述的绑定规则，而是根据外层函数或全局作用域（词法作用域）来决定 this
- ES6 之前采用赋值（var self = this）来使用 this 词法作用域
