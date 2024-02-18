---
category: Javascript
---

# Javascript

## 数据类型

```js
// 原始类型
undefined, boolean, number, string, null, symbol, bigint;
// 引用类型
object; // 包括：function, array, date, regexp, error
```

## ES6 有哪些新属性

- let 和 const
- Promise
- for...of
- 展开语法和对象数组解构
- 箭头函数
- 函数传默认参数
- Map，Set，WeakMap，WeakSet
- 类
- 模板字符串
- Proxy

## let、var、const 的区别

- let 不能重复定义变量，而 var 可以
- var 存在变量提升，可在声明前使用变量，而 let 由于存在暂时性死区不能在声明变量前使用
- var 声明的变量会挂载到 window 下面，而 let 不会挂到 window 下面，而是形成一个块级作用域
- const 定义的是常量，定义之后就不可更改，而且初始化的时候必须赋值，其他和 let 一样

## Map 与 Object 的区别

1. 键的类型——Map 的键可以是任何类型，而 Object 的键只能是 String 或 Symbol(虽然可以看起来是其他类型，但实际上会被转化为字符串)
2. 大小属性——Map 的键值对个数可以通过 size 属性获取，而 Object 的键值对个数只能手动计算
3. 顺序——Map 的键值对是有序的，而 Object 的键值对是无序的
4. 遍历——Map 的键值对可以被 for...of 循环遍历，而 Object 的键值对只能被 for...in 循环遍历
5. 内置方法——Map 内置了一些方法如(`get`, `set`, `has`, `delete`)，而 Object 没有
6. 性能——Map 的增删操作性能比 Object 好，而 Object 查找操作的性能会更好(Object 更适用于作为记录（record）或者字典（dictionary）)
7. 兼容性——Map 在 IE11 及以下不支持，而 Object 在 IE8 及以下不支持

## Map 和 Set 的区别

- Map: 存储键-值对。键可以是任何类型（包括对象、函数等）
- Set: 存储唯一值，不允许重复。值可以是任何类型

## Map 和 WeakMap，WeakMap 和 WeakSet

- Map
  - 存储键-值对，键必须是对象
  - 键可以是任何类型
  - 键和值都可以被枚举
  - 强引用键，即使你删除了对键的引用，它也不会被垃圾回收
- WeakMap
  - 存储键-值对，键必须是对象
  - 键只能是对象
  - 键和值都不可枚举
  - 弱引用键，即使你删除了对键的引用，它就会被垃圾回收
- WeakSet
  - 存储唯一对象值

## WeakMap 的应用场景

- 缓存和记忆化：WeakMap 可用于缓存已经计算过的结果，以便将来快速检索。由于它是弱引用的，所以当对象不再需要时，它们可以被垃圾收集

```js
const cache = new WeakMap();
function expensiveOperation(obj) {
  if (cache.has(obj)) return cache.get(obj);
  // perform expensive calculation（执行昂贵的计算）
  const result = cache.set(obj, result);
  return result;
}
```

- 关联额外数据：当你想给一个对象（比如网页上的一个按钮或图像）添加一些额外信息，但又不想直接改变这个对象，那么可以用 WeakMap。这样做的好处是，当这个对象不再需要时，它和你添加的额外信息都会自动被清除，不会占用多余的内存

```js
const domData = new WeakMap();
// 在某个 DOM 元素上设置数据
domData.set(document.getElementById('myDiv'), { clicks: 0 });
// 在事件监听器中更新或读取数据
document.addEventListener('click', (event) => {
  const data = domData.get(event.target);
  if (data) data.clicks++;
});
```

## ES6 中的 Proxy

- 定义：Proxy 对象用于创建一个对象的代理，从而实现基本的拦截和自定义（属性查找，赋值，枚举，函数调用等）
- 语法

```js
const p = new Proxy(target, handler);
```

- 参数：
  - target：要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
  - handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为
- 作用：用于拦截和自定义对象的一些操作
- 特点：Proxy 对象的所有用法，都是上面这种形式，不同的只是 handler 参数的写法。其中，new Proxy()表示创建一个 Proxy 实例，target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。
- 应用场景
  - 拦截和监视外部对对象的访问
  - 降低函数或类的复杂度
  - 在复杂操作前对操作进行校验或对所需资源进行管理

## :star: 浏览器事件循环(Event Loop)

- 起源

  因为 JS 是单线程执行的，所以它一次只能执行一个任务，如果这个任务时间过长就会造成阻塞，因此需要一个异步执行代码的机制，从而产生了事件循环

- 过程

  主线程首先从上到下将 JS 代码放到执行栈中执行，当执行到异步代码的时候，会将这部分要执行的代码放到异步的任务队列里面，如果是宏任务，就会放到宏任务队列里，如果是微任务，就会放到微任务队列里。当同步代码执行完成后，这时候执行栈为空，JS 引擎会先查看当前微任务队列里面有没有要执行的任务，如果有的话一个一个的拿出来放到执行栈中执行，执行完看当前宏任务队列里面有没有要执行的任务，有的话也一个一个的拿出来放到执行栈中执行，执行完开始执行下一个宏任务代码。这个过程是循环的，因此称为“事件循环”

- 宏任务

  - 整个 script 标签里的代码块
  - setTimeout / setInterval / setImmediate
  - I/O 操作
  - UI 渲染

- 微任务
  - Promise.then / catch / finally
  - MutaionObserver
  - Object.observe

## :star: 深浅拷贝

- 深浅拷贝是针对引用类型说的，原始类型不存在深浅拷贝
- 浅拷贝是复制的是对象的引用，而深拷贝是拷贝了一个完全一模一样的对象
- 浅拷贝的方式
  1. Object.assign()
  2. 展开运算符
  3. 循环遍历
- 深拷贝的方式
  1. `JSON.parse(JSON.stringify(obj))`
  2. 递归
  3. 一些工具库如 lodash 中的 cloneDeep() 方法
     :::tip
     JSON.stringify()的缺陷，处理不了 function 对象、undefined 以及 symbol 类型，原因是 JSON.stringify()在处理这些类型，这些类型会被忽略，不会被处理。并且 JSON.stringify()也解决不了循环引用的问题
     :::
- 深拷贝怎么解决循环引用
  - 解决循环引用问题，你通常需要维护一个“已访问”的对象列表。当你试图拷贝一个对象时，你首先检查这个对象是否已经被拷贝过了。如果是，你直接返回之前拷贝过的新对象的引用，不需要重新拷贝它
- 实现一个深拷贝函数

```js
const obj = { quote: null };
obj.quote = obj;
function deepCopy(obj, visited = new Map()) {
  // 基础类型或 null，直接返回
  if (!obj || typeof obj !== 'object') return obj;
  // 检查是否循环引用
  if (visited.has(obj)) return visited.get(obj);
  // 对于数组或对象，创建一个新的空数组或对象
  const copyObj = Array.isArray(obj) ? [] : {};
  // 将当前正在拷贝的对象加入已访问列表
  visited.set(obj, copyObj);
  // 递归拷贝所有属性
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copyObj[key] = deepCopy(obj[key], visited);
    }
  }
  return copyObj;
}
console.log(deepCopy(obj));
```

## :star: 防抖和节流

### 防抖

- 在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
- 应用场景
  - 输入框验证：输入框中内容发生变化时，用防抖来减少请求或判断次数。
  - 窗口调整（resize）：窗口调整时会触发事件的回调函数，用防抖来让其只触发一次。
- 实现方式

  - 定义一个变量来保存定时器
  - 触发事件时，清除之前的定时器，并设置新的定时器
  - 定时器结束后，执行事件回调函数

  ```js
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  ```

### 节流

- 规定在一个单位时间内，只能触发一次事件，如果这个单位时间内触发多次事件，只有一次生效。

- 应用场景

  - 按钮提交：用户提交表单时，用来防止多次提交按钮操作。
  - 监听滚动事件，在用户滚动时定期检查页面的位置，而不是每次滚动都检查
  - 窗口调整大小。间隔一段时间更新一次，让你在调整的过程中能看到布局的变化

- 实现方式

  - 定义一个变量来保存定时器
  - 触发事件时，判断是否有定时器在执行，如果有则不执行
  - 定时器结束后，执行事件回调函数

  ```js
  function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn.apply(this, args);
      }
    };
  }
  ```

## :star: 原型和原型链

- 原型的定义：每一个除了 null 之外的 JS 对象在创建的时候都会与之关联另一个对象，这个对象就是它的原型。并且可以从这个对象继承属性和方法
- 原型链定义：当你试图访问一个对象的属性时，JS 会首先在对象本身查找，如果没有找到，则会继续在该对象的原型上查找，然后就是原型的原型，以此类推。这样构成的一条链路我们称之为原型链
- 对象原型：JS 中所有对象的原型最终都会指向 `Object.prototype`，而 `Object.prototype` 的原型等于 `null`
- 函数原型：当函数作为对象时，它的原型是 `__proto__`，最终指向都是 `Function.prototype`。当函数作为构造函数时，它的原型是 `prototype`

## :star: 闭包

- 定义：函数和与其相关的引用环境的组合就是闭包
- 创建：当一个内部函数在一个外部函数里被定义，并且内部函数引用了外部函数的变量或参数，就会创建闭包
- 缺点：
  1. 闭包使用不当会导致内存泄漏
  2. 过度使用闭包会导致代码难以理解和维护
- 作用：
  - 数据封装和私有变量：闭包可以用来模拟私有变量，提供公开的 API 而隐藏内部实现细节

  ```js
  function createCounter() {
    let count = 0; // 私有变量

    return {
      increment: function () {
        count++;
        return count;
      },
      decrement: function () {
        count--;
        return count;
      },
      getCount: function () {
        return count;
      },
    };
  }

  const counter = createCounter(); // 创建一个新的计数器

  console.log(counter.getCount()); // 输出 0，通过 API 获取 count 的值
  counter.increment(); // 通过 API 增加 count
  console.log(counter.getCount()); // 输出 1
  counter.decrement(); // 通过 API 减少 count
  console.log(counter.getCount()); // 输出 0

  console.log(counter.count); // 输出 undefined，因为 count 是私有变量，无法直接访问
  ```

  - 动态生成函数：根据不同的参数或条件生成具有特定行为的函数

  ```js
  function greeting(language) {
    return function (name) {
      if (language === 'English') {
        return `Hello, ${name}!`;
      }
      if (language === 'Spanish') {
        return `Hola, ${name}!`;
      }
      if (language === 'Chinese') {
        return `你好, ${name}！`;
      }
      return `Hi, ${name}!`;
    };
  }
  const greetInEnglish = greeting('English');
  const greetInSpanish = greeting('Spanish');
  const greetInChinese = greeting('Chinese');

  console.log(greetInEnglish('John')); // 输出 "Hello, John!"
  console.log(greetInSpanish('Juan')); // 输出 "Hola, Juan!"
  console.log(greetInChinese('张三')); // 输出 "你好, 张三！"
  ```

## for in 和 for of 的区别

- for in 遍历的是 key，for of 遍历的是 value
- for in 可以遍历普通对象，而 for of 只能遍历可迭代类型对象
- for in 遍历对象的时候会遍历对象原型链上面的属性
- for in 一般被用来遍历对象，for of 一般被用来遍历数组
- for in 迭代对象的顺序是不确定的
  :::tip
  hasOwnProperty()方法可以判断属性是否是属于对象本身，属于的话为 true，不属于为 false
  :::

## :star: 箭头函数和普通函数的区别

- 箭头函数没有自己的 this，this 来自于执行上下文
- 箭头函数不能用作构造函数，所以它也没有 prototype
- 箭头函数没有 arguments，不能使用 arguments 取函数的参数

## :star: new 的执行过程及实现

- 创建一个空对象
- 这个空对象内部的`__proto__`属性指向构造函数的`prototype`属性
- 将新创建的对象作为 this 的上下文
- 如果函数没有返回其他对象，则返回新创建的对象

```js
function myNew(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```

## :star: ES6 中的 Promise

- 定义：Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大
- 特点：Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）
- 缺点
  1. 无法取消 Promise，一旦新建它就会立即执行，无法中途取消
  2. 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
  3. 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
- 实例方法
  1. then：用于指定 Promise 成功或失败时的回调函数
  2. catch：用于指定 Promise 失败时的回调函数
  3. finally：用于指定 Promise 是否成功或失败都会执行的回调函数
- 静态方法
  1. Promise.resolve：创建一个立即成功的 Promise 对象，其结果就是你给它的值
  2. Promise.reject：创建一个立即失败的 Promise 对象，其拒绝原因就是你指定的值
  3. Promise.all：接收一个 Promise 对象数组，等对象数组中的 Promise 全部都成功解决后，返回一个包含所有成功结果的数组，按照输入的顺序排列
  4. Promise.race：接收一个 Promise 对象数组，立即返回第一个解决的结果，不论结果是成功还是失败
  5. Promise.allSettled: 接收一个 Promise 对象数组，等对象数组中的 Promise 全部都解决后，不论结果是成功还是失败都会全部返回，返回一个包含所有结果的数组，按照输入的顺序排列
  6. Promise.any: 接收一个 Promise 对象数组，立即返回第一个成功解决的结果。如果全部失败，返回一个被拒绝的带有拒绝原因的数组
- 实现 Promise.all

  ```js
  function promiseAll(promiseArr) {
    return new Promise((resolve, reject) => {
      const res = [],
        len = promiseArr.length;
      let count = 0;
      for (let i = 0; i < len; i++) {
        Promise.resolve(promiseArr[i])
          .then((val) => {
            res[i] = val;
            count++;
            if (count === len) resolve(res);
          })
          .catch((err) => reject(err));
      }
    });
  }
  ```

- 实现 Promise.race

  ```js
  function promiseRace(promiseArr) {
    return new Promise((resovle, reject) => {
      const len = promiseArr.length;
      if (len === 0) return;
      for (let promiseItem of promiseArr) {
        Promise.resolve(promiseItem).then(resovle, reject);
      }
    });
  }
  ```

- 实现 Promise.any

  ```js
  function promiseAny(promiseArr) {
    return new Promise((resolve, reject) => {
      const errors = [],
        len = promiseArr.length;
      let count = 0;
      for (let i = 0; i < len; i++) {
        Promise.resolve(promiseArr[i])
          .then((val) => resolve(val))
          .catch((err) => {
            errors[i] = err;
            count++;
            if (count === len) {
              reject(new AggregateError(errors, '所有的Promise都被拒绝'));
            }
          });
      }
    });
  }
  ```

## :star: async/await

- 定义：async/await 是 JS 中处理异步操作的一种语法，是基于 Promise 的一种更简洁、更易读的方式。这种语法让异步代码看起来和写起来更像同步代码，从而减少了代码的复杂性
- 原理：async/await 实际上是使用了 Promise 和 Generator 的语法糖，它通过将 Generator 函数和 Promise 对象结合起来，实现了异步操作的同步化表达。
- 使用：async/await 通常与 async 函数一起使用，async 函数用于定义一个异步操作，而 await 关键字用于暂停异步操作的执行，等待 Promise 对象的状态发生变化后再继续执行。
- 优点：async/await 语法使得异步操作更加简洁和易读，并且可以更好地处理错误处理和流程控制，同时减少了回调函数。
- 缺点：async/await 语法在某些情况下可能会导致性能问题，因为它会阻塞代码的执行，直到异步操作完成。因此，在性能要求较高的场景下，应该尽量避免使用 async/await。

## :star: 函数柯里化

- 定义：函数柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
- 原理：函数柯里化通过创建一个函数，该函数接收一部分参数，返回一个新的函数，新函数接收余下的参数，然后执行原函数。
- 优点：函数柯里化可以提高代码的可读性和复用性，减少重复代码，提高代码的灵活性和可扩展性。
- 缺点：函数柯里化可能会增加代码的复杂性，降低代码的可维护性。
- 场景
  1. 参数复用：在你需要多次调用同一个函数，但每次调用时某些参数保持不变的情况下，通过柯里化，你可以创建预设了一些参数的新函数，这些新函数更专注于特定的任务，更易于维护和重用。
  2. 延迟执行：当你在不能立马获得所有参数的时候，柯里化可以让你在不同的时间点接收不同的参数，从而提高灵活性和复用性。例如你做个计算，100+200+X，你不知道第 3 个参数的情况下，你可以先将前 2 个参数传给函数，等第 3 个参数有了，才执行返回。
  3. 提前返回：在某些情况下，你可能会提前返回一个函数的结果，使用柯里化，你可以提前返回一个函数的执行结果，减少不必要的计算和资源消耗。
- 实现

  ```js
  function curry(fn) {
    return function curryFn(...args) {
      if (args.length >= fn.length) {
        return fn.apply(this, args);
      } else {
        return function (...newArgs) {
          return curryFn.apply(this, [...args, ...newArgs]);
        };
      }
    };
  }
  ```

## :star: 设计模式

### 单例模式

- 定义：确保某个类只有一个实例，并提供一个全局访问点。
- 优点
  1. 唯一实例：单例模式确保一个类只有一个实例，避免重复创建资源
  2. 共享资源：由于只存在一个实例，所以它可以方便的共享数据，使得数据的访问和操作更为集中和一致
- 缺点：没有接口，不能继承，与单一职责原则冲突，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化。
- 场景：需要频繁的创建和销毁实例，比如管理首页页面缓存。
- 实现：使用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。

  ```js
  class Singleton {
    constructor() {
      if (!Singleton.instacne) {
        Singleton.instacne = this;
      }
      return Singleton.instacne;
    }
  }
  ```

### 观察者模式

- 定义：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。
- 优点：观察者和主题之间是抽象耦合的，可以独立的扩展或修改它们。
- 缺点：在观察者模式中，抽象类和具体类之间、观察者和主题之间都存在依赖关系，这会增加代码的复杂度，同时也降低了代码的可读性。
- 场景：关联行为场景，如 A 对象的状态改变需要 B 对象相应改变。
- 实现：定义一个主题（Subject）和多个观察者（Observer），主题（Subject）维持一个观察者（Observer）的集合，当主题（Subject）的状态发生改变时，通知所有观察者（Observer）做出相应的反应，这样就实现了观察者模式。

  ```js
  class Subject {
    constructor() {
      this.obervers = [];
    }
    subscribe(obs) {
      this.obervers.push(obs);
    }
    unsubscribe(obs) {
      this.obervers = this.obervers.filter((item) => item !== obs);
    }
    nofity(data) {
      this.obervers.forEach((obs) => {
        obs.update(data);
      });
    }
  }
  class Observer {
    constructor(name) {
      this.name = name;
    }
    update(data) {
      console.log(`${this.name}收到的数据：${data}`);
    }
  }
  const sub = new Subject();
  const obs1 = new Observer('obs1');
  const obs2 = new Observer('obs2');
  sub.subscribe(obs1);
  sub.subscribe(obs2);
  sub.nofity('Hello');
  sub.unsubscribe(obs1);
  sub.nofity('JS');
  ```

### 发布订阅模式

- 定义：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。
- 优点：发布订阅模式比观察者模式多了一个调度中心，从而支持了中间状态的传递。
- 缺点：在实现上要复杂一些，并且需要引入一个调度中心。
- 场景：需要发送通知的场景，如消息推送、广告推送等。
- 实现：定义一个调度中心（Event Channel），订阅者（Subscriber）可以向调度中心订阅事件（Subject），发布者（Publisher）可以向调度中心发布事件（Subject），订阅者和发布者都不需要知道对方的存在。

  ```js
  class PubSub {
    constructor() {
      this.subscribers = {};
    }
    // 订阅
    subscribe(topic, callback) {
      if (!this.subscribers[topic]) {
        this.subscribers[topic] = [];
      }
      this.subscribers[topic].push(callback);
      return () => {
        this.unsubscribe(topic, callback);
      };
    }
    // 取消订阅
    unsubscribe(topic, callback) {
      if (this.subscribers[topic]) {
        this.subscribers[topic] = this.subscribers[topic].filter(
          (item) => item !== callback
        );
      }
    }
    // 发布
    publish(topic, data) {
      if (this.subscribers[topic]) {
        this.subscribers[topic].forEach((cb) => {
          cb(data);
        });
      }
    }
  }
  const pubSub = new PubSub();
  const subscribe = pubSub.subscribe('news', (data) =>
    console.log(`收到的信息：${data}`)
  );
  pubSub.publish('news', 'hello');
  subscribe();
  pubSub.publish('news', 'hello');
  ```

## :star: Web Worker 的使用

- 定义：Web Worker 是 HTML5 中的一个新功能，它允许在后台线程中运行 JavaScript 脚本，而不会影响页面的性能，Web Worker 可以将数据传递给其他线程，也可以将其他线程传递过来的数据传递给主线程。
- 使用：
  1. 创建一个新的 Worker 对象，并传入要执行的脚本的 URL。
  2. 调用 Worker 对象的 postMessage 方法，将数据传递给 Worker。
  3. 监听 Worker 对象上的 message 事件，获取从 Worker 返回的数据。
- 优点：可以实现多线程，提高性能。
- 缺点：无法访问 DOM，无法直接操作 DOM 元素，也不能操作某些浏览器的内置对象，例如Window、Document等。
- 场景：需要处理大量数据或耗时的操作，可以提高页面性能。
- 数据特点：
  1. Web Worker传递的数据是经过序列化的
  2. 传递给 Worker 的数据是复制而不是共享的。这意味着数据在传递过程中会被复制，主线程和 Worker 之间的数据不是共享状态
  3. 由于数据是复制的，传递大量数据可能会导致性能问题。对于大数据量的场景，考虑使用 Transferable 对象（如 ArrayBuffer），这种方式允许数据被转移而不是复制，但转移后原来的上下文将无法再使用该数据
