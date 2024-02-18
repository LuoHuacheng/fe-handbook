---
  category: 浏览器
---

# 浏览器渲染机制

:::tip
DOCTYPE 作用？浏览器渲染过程？触发及避免回流/重绘？
:::

## DOCTYPE 作用

DOCTYPE 声明文档类型和 DTD 规范，验证文件合法性

DTD(document type definition)：

- 定义文档类型使浏览器根据其定义来决定使用哪种协议来解析文档并切换浏览器模式

HTML5：`<!DOCTYPE html>`

HTML4.01：

- Strict 模式
- Transitional loose 模式

## 渲染过程

![渲染过程](/assets/image/basic/render_process.png '浏览器渲染过程')

## 回流

回流(Reflow)：DOM 结构中各个元素都有自己的盒模型，浏览器根据各种样式计算并根据计算结果将元素放置在页面上的具体位置，当 Render Tree 中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流(重排)

触发条件：

- 页面首次渲染
- 增加、删除、修改可见的 DOM 元素
- DOM 的位置或尺寸变化
- 元素字体字号变化
- 激活 CSS 伪类（例如：:hover）
- 改变窗口大小或滚动（有可能）
- 查询某些属性或调用某些方法
  - client 尺寸及位置：`clientWidth / clientHeight / clientTop / clientLeft`
  - 元素尺寸及位置：`offsetWidth / offsetHeight / offsetTop / offsetLeft`
  - 滚动位置：`scrollWidth / scrollHeight / scrollTop / scrollLeft`
  - 滚动：`scrollIntoView() / scrollIntoViewIfNeeded() / scrollTo()`
  - 获取元素尺寸：`getComputedStyle()`
  - 获取元素位置：`getBoundingClientRect()`

## 重绘

重绘(Repaint)：当页面中元素样式的改变并不影响它在文档流中的位置时，浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘

触发条件：

- `color / background-color / visibility`等不影响元素位置及尺寸的属性变化

## 如何避免

CSS：

- 避免使用 `table` 布局
- 尽量在 DOM 树的最末端改变 `class`
- 避免设置多层内联样式
- 将动画应用到 `position` 属性为 `absolute` 或 `fixed` 的元素上
- 避免使用 `CSS` 表达式，如 `calc()`

JS:

- 避免频繁操作样式，最好一次性改变 `style` 或者 `class`
- 避免频繁操作 DOM，创建一个 `documentFragmeng` 并在其上应用所有 DOM 操作然后一次性添加进文档

:::warning 总结
回流必将引起重绘，重绘不一定会引起回流，并且回流比重绘的代价要更高。
:::
