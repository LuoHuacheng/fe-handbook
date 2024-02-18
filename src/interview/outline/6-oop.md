---
  category: Javascript
---

# 面向对象

:::tip
JS 面向对象的原理？如何声明与实例化？如何继承？
:::

## 原理

JS 的对象体系，不是基于“类”，而是基于构造函数 `constructor` 与原型链 `prototype`

## 声明与实例化

类的声明一般区分 _ES5_ 与 _ES6_ 两种方式，类名一般都遵循首字母大写的约定

- ES5

  ```js
  function World() {
    this.greeting = 'hello';
  }
  ```

- ES6

  ```js
  class World2 {
    constructor() {
      this.name = name;
    }
  }
  ```

通过 `new` 运算符来实例化，如果一个类没有参数，则可以省略括号

```js
console.log(new World(), new World2());
```

## 类的继承

类的继承区分 _ES5_ 与 _ES6_ 两种方式，其中

- ES6 采用关键字 `extends` 实现继承，使用 `super` 调用父类的构造函数

  ```js
  class Person {
    constructor(name) {
      // Person 类
      this.name = name;
    }
    showName() {
      console.log(this.name);
    }
  }
  class Student extends Person {
    // Student 类继承至 Person 类
    constructor(name, age) {
      super(name);
      this.age = age;
    }
  }
  const student = new Student('李雷', 20);
  student.showName();
  ```

- ES5 实现继承的方法较多，下面列出常见的几种

### 借助构造函数实现

  **原理：**

- JS 通过构造函数生成新对象，因此构造函数可以视为对象的模板，实例对象的属性和方法，可以定义在构造函数内部，通过改变构造函数运行时的 `this` 指向实现继承

  **优点：**

- 父类的引用属性不会被共享
- 子类构建实例时可以向父类传递参数

  **缺点：**

- 父类的方法不能复用，子类实例的方法每次都要单独创建
- 只能继承构造函数中已经定义的属性和方法，无法继承后续在父类的原型上添加的属性和方法，因为没有用到原型

  ```js
  function ParentContructor() {
    this.name = 'parent_contructor';
  }
  function ChildContructor() {
    ParentContructor.call(this); // apply 也可以
    this.type = 'contructor';
  }
  ```

### 借助原型链实现

  **原理：**

- JS 中原型对象的所有属性和方法，都能被实例对象共享；即如果属性和方法定义在原型上，那么所有实例都能共享，不用新生成，因此将父类的实例作为子类的原型可以实现继承

  **优点：**

- 父类方法可以复用

  **缺点：**

- 父类的引用属性会被所有子类实例共享，因此如果一个子类修改了其继承而来的引用类型，其他子类对应的引用类型也会被改变
- 子类构建实例时不能向父类传递参数

  ```js
  function ParentProtoChain() {
    this.name = 'parent_protochain';
  }
  function ChildProtoChain() {
    this.type = 'protochain';
  }
  ChildProtoChain.prototype = new ParentProtoChain();
  ```

### 组合继承

  **原理：**

- 通过调用父类构造函数，继承父类的属性并保留传参，然后通过将父类实例作为子类实现继承

  **优点：**

- 保留构造函数的优点：创建子类实例，可以向父类构造函数传参数
- 保留原型链的优点：父类的实例方法定义在父类的原型对象上，可以实现方法复用
- 不共享父类的引用属性

  **缺点：**

- 由于调用了两次次父类的构造方法，会存在一份多余的父类实例属性
- 第一次：ChildCombine.prototype = new ParentCombine();
- 第二次：ParentCombine.call(this);

  ```js
  function ParentCombine() {
    this.name = 'parent_combine';
    this.list = [1, 2, 3];
  }
  function ChildCombine() {
    ParentCombine.call(this);
    this.type = 'combine';
  }
  ChildCombine.prototype = new ParentCombine();
  ```

### 组合继承优化

  **原理：**

- 通过将父类的原型对象赋值给子类的原型对象，避免初始化两次实例

  **优点：**

- 保留了组合继承的优点
- 只调用一次父类构造函数

  **缺点：**

- 子类修改构造函数的指向之后，父类实例的构造函数指向也会同时也发生变化，因为不能判断子类实例的直接构造函数到底是子类构造函数还是父类构造函数

  ```js
  function ParentCombineOpt() {
    this.name = 'parent_combineopt';
    this.list = [1, 2, 3];
  }
  function ChildCombineOpt() {
    ParentCombineOpt.call(this);
    this.type = 'combineopt';
  }
  ChildCombineOpt.prototype = ParentCombineOpt.prototype;
  ```

### 组合继承完美版

  **原理：**

- 通过 `Object.create` 创建中间对象隔离开子类原型和父类原型

  ```js
  function ParentCombinePrefect() {
    this.name = 'parent_combinePrefect';
    this.list = [1, 2, 3, 4];
  }
  function ChildCombinePrefect() {
    ParentCombinePrefect.call(this);
    this.type = 'combinePrefect';
  }
  // 隔离父子原型
  ChildCombinePrefect.prototype = Object.create(ParentCombinePrefect.prototype);
  // 创建子类自己的构造函数
  ChildCombinePrefect.prototype.constructor = ChildCombinePrefect;
  ```
