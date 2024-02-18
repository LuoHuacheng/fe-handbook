---
  category: Javascript
---

# 原型/链

:::tip
什么是原型/链？如何生成？原型、构造函数、实例、原型链的关系？instanceof/new 原理？
:::

## 定义

JavaScript 规定，所有对象都有自己的原型对象（prototype），一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型，如此层层上溯，所有对象的原型都可以上溯到 `Object.prototype`，其本身的原型为 `null`，也是原型链的尽头

## 创建原型对象

- 字面量

  ```javascript
  let a = {};
  let b = new Object({});
  ```

- 构造函数

  ```javascript
  let M = function() {};
  let c = new M();
  ```

  - 保留原构造函数属性
  - 原型链在原构造函数的 `prototype` 属性
  - 作用对象为 `function`
- `Object.create()`

  ```javascript
  let P = {};
  let d = Object.create(P);
  ```

  - 丢失原构造函数属性
  - 原型链为原构造函数/(对象)本身
  - 作用对象为 `function` 和 `object`

## 原型、构造函数、实例、原型链

- 原型链的顶端是 `Object.prototype`
- 实例的原型对象是上一层对象（父对象）的实例
- 每个函数都有 `prototype` 属性，函数在声明的时候 JS 引擎会初始化一个空对象给 `prototype`（原型对象）
- 原型对象中有 `contructor` 属性，默认指向引用其自身的函数（构造函数）

![prototype_1](/assets/image/basic/prototype_1.png '原型、构造函数、实例、原型链的关系')

## instanceof 原理

- 实例对象的 `__proto__` 指向其构造函数的原型对象
- `instanceOf` 的原理是判断实例对象的 `__proto__` 和构造函数的 `prototype` 是不是统一引用
- 同一条原型链上使用 `instanceOf` 判断都会返回 true，此时可以使用 `__proto__.constructor` 判定

![prototype_2](/assets/image/basic/prototype_2.png 'instanceof 原理')

## new 运算符

执行顺序:

1. 创建一个空对象，作为将要返回的对象实例
2. 将这个空对象的原型，指向构造函数的 `prototype` 属性
3. 传入相应参数，并将这个空对象赋值给函数内部的 `this` 关键字
4. 若构造函数返回一个“对象”则该“对象”会取代整个 `new` 的结果，若不返回，则 `new` 的结果为步骤 1 创建的对象

模拟实现:

```javascript
function _new() {
  // 将 arguments 对象转为数组
  const args = [].slice.call(arguments);
  // 取出构造函数
  const constructor = args.shift();
  if (typeof constructor !== 'function') {
    throw 'constructor param must be a function';
  }
  // 创建一个空对象，继承构造函数的 prototype 属性
  const context = Object.create(constructor.prototype);
  // 执行构造函数
  const result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return typeof result === 'object' && result != null ? result : context;
}
```
