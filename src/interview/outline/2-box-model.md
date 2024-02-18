---
  category: CSS
---

# 盒模型与BFC

## 盒模型

- 盒模型是 CSS 规范中的一个模块，规定浏览器渲染时将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性。
- 盒模型从内到外分为 width/height -> padding -> border -> margin

### 如何设置

通过 CSS 属性 _box-sizing: content-box | border-box | inherit;_ 来设置

### W3C 标准盒模型

属性 width，height 只包含内容 content，不包含 border 和 padding，其 _box-sizing_ 属性是 _content-box_

### IE 怪异盒模型

属性 width，height 包含 border 和 padding，指的是 _content + padding + border_ ，其 _box-sizing_ 属性是 _border-box_

## 获取元素尺寸

- `dom.style.width/height` 只能获取内联样式
- `dom.currentStyle.width/height` 获取所有样式宽高，只有 IE 支持
- `window.getComputedStyle(dom)` 获取所有样式宽高，现代浏览器支持
- `dom.getBoundingClientRect()` 返回元素的宽高及相对于视口的位置

:::warning 注意
浏览器渲染页面是根据 html 页面头部的 _DOCTYPE_ 声明来执行的，所以开发时一定要声明页面的 _DOCTYPE_
:::

## BFC

BFC 是块级格式化上下文（Block formatting context）的缩写，具有 BFC 特性的元素可以看作是隔离的独立容器，容器里面的元素在布局上不会影响外面的元素，并且 BFC 具有普通容器所没有的一些特性

### 生成条件

- 根元素（html）
- float 不为 none 的元素
- overflow 不为 visible 的元素
- display 为 inline-block、flow-root、table-cell、table-caption 等 table 相关的元素
- position 不为 static、relative、sticky 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）

### 特性

- BFC 是页面上一个隔离的容器，容器内的子元素不会影响容器外的元素，反之亦然
- 内部的 box 会在垂直方向依次排列
- box 垂直方向的距离由 margin 决定，同一 BFC 的相邻 box 会发生 margin 重叠
- BFC 的区域不会与 float box 重叠
- 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
- 计算 BFC 的高度时，浮动元素也参与计算

### 作用

1. 解决边距重叠

   > 处于同一个 BFC 下的盒子外边距会重叠，下方代码中的两个 div 之间的边距 margin 是 50，而不是 100，要解决这个问题，可以将它们放在不同的 BFC 中

   ```html
   <style>
     .box {
       width: 300px;
       height: 100px;
       margin: 50px;
       background-color: #ff6600;
     }
   </style>
   <body>
     <div class="box"></div>
     <div class="box"></div>
   </body>
   ```

2. 清除内部浮动

   > BFC 可以包含浮动的元素，利用 BFC 中的元素不影响 BFC 外面元素布局的特性来清除内部浮动

   ```html
   <style>
     .parent {
       border: 2px solid #f33;
       /* 添加此属性创建BFC来清除 child 的浮动 */
       /* overflow: hidden; */
     }
     .child {
       float: left;
       width: 300px;
       height: 100px;
       background-color: #ff6600;
     }
   </style>
   <body>
     <div class="parent">
       <div class="child"></div>
     </div>
   </body>
   ```

3. 多栏布局

   参考前一章中的[多栏布局](/basic/1-layout.html#创建-bfc)小节
