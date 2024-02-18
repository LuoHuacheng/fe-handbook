---
  category: DOM
---

# DOM 事件

:::tip
什么是 DOM 事件/流？事件委托(代理)是什么？分哪些级别？有什么方法和属性？
:::

## 定义

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。事件的本质是程序各个组成部分之间的一种通信方式，也是异步编程的一种实现。DOM 支持大量的事件。

## DOM 事件流

当触发页面中某个元素的某一事件时，JS 引擎会从 window 对象依次向下层节点进行事件的捕获直到捕获到触发事件的目标节点，然后再从目标节点依次向上进行冒泡

### 现代浏览器

流程：捕获 => 目标节点 => 冒泡

监听：`element.add/removeEventListener(event, func, isExexInCapture)`

### IE8 及更早 IE 版本

流程：捕获 => 冒泡

监听：`element.attach/detachEvent(event, func)`

### this 的指向

==监听函数内部的 this 指向触发事件的那个元素节点==

### 事件委托(代理)

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，即事件的代理（delegation）

经典使用场景：

当需要为一个列表中的每个子项添加监听事件时，可以给其父元素添加事件监听函数，并判断该事件的触发元素是否为子项然后再执行函数，此时对动态增加的子项也可生效。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
<script>
  const ul = document.querySelector('ul');
  ul.addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
      // some code
    }
  });
</script>
```

## DOM 事件级别

DOM 事件一般分为 3 个等级，依次为 DOM0 ，DOM2 及 DOM3 三个等级。

### DOM0 级别

将一个函数赋值给一个事件处理属性，可以通过给事件处理属性赋值为 `null` 来解绑事件

```html
<button id="btn" type="button"></button>
<script>
  const btn = document.getElementById('btn');
  btn.onclick = function() {
    console.log('Hello World');
  };
</script>
```

缺点：_无法同时在一个处理程序上绑定多个处理函数_

### DOM2 级别

定义了 `add/removeEventListener` 两个方法用来绑定和解绑事件，并且还添加了是否在捕获阶段执行处理函数的参数

```html
<button id="btn" type="button"></button>
<script>
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    console.log('hello');
  });
  btn.addEventListener('click', () => {
    console.log('world');
  });
  // hello
  // world
</script>
```

### DOM3 级别

DOM3 事件并未做太多改变，只是在 DOM2 事件上添加了更多支持的类型。

1. UI 事件，当用户与页面上的元素交互时触发，如：load、scroll
2. 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
3. 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
4. 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
5. 文本事件，当在文档中输入文本时触发，如：textInput
6. 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
7. 合成事件，当为 IME（输入法编辑器）输入字符时触发，如：compositionstart
8. 变动事件，当底层 DOM 结构发生变化时触发，如：DOMsubtreeModified
9. 同时 DOM3 级事件也允许使用者自定义一些事件

## 常用方法

1. `event.preventDefault()` 阻止浏览器对当前事件的默认行为
2. `event.stopPropagation()` 阻止事件在 DOM 中继续传播
3. `event.stopImmediatePropagation()` 阻止同一事件的其他监听函数被调用，不管监听函数定义在哪个节点，如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了 `Event.stopImmediatePropagation` 方法，其他的监听函数就不会再执行
4. `event.composedPath()` 返回一个数组，其包含事件的最底层节点和依次冒泡经过的所有上层节点
5. `CustomEvent()`通过 `new CustomEvent(type, options)` 生成自定义事件，通过 `element.dispatchEvent(event)` 触发函数

## 常用属性

1. `event.bubbles` 返回一个只读的布尔值表示当前事件是否会冒泡，除非显式声明，否则用构造函数自定义的事件默认不冒泡
2. `event.eventPhase` 返回只读的整数常量表示目前所处阶段，此属性可能会返回 4 个值
   - 0，事件目前还未发生
   - 1，事件处于捕获阶段
   - 2，事件到达目标节点
   - 3，事件处于冒泡阶段
3. `event.cancelable` 返回只读的布尔值表示是否可以取消
   - 大多数浏览器原生事件都可以取消，除非显式声明，构造函数生成的事件不可取消
   - 当 `cancelable` 为 `ture` 时，调用 `preventDefault()` 可以取消，如果为 `false`，则 `preventDefault()` 不起作用
4. `event.cancelBubble` 表示是否阻止事件冒泡的布尔值，若设为 `true`，则与 `event.stopPropagation()` 作用相同
5. `event.defaultPrevented` 表示事件是否调用过 `event.preventDefault()` 方法的只读布尔值
6. `event.target` 返回原始触发事件的节点，即事件最初发生的那个节点
7. `event.targetTarget` 返回事件的当前节点，即正在执行的监听函数所绑定的那个节点
