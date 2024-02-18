---
  category: CSS
---

# 页面布局

## 水平居中

### 行内元素水平居中

给其父元素设置 _text-align: center;_

```html
<style>
  .parent-line {
    text-align: center;
  }
</style>

<div class="parent-line">
  行内元素水平居中——text-align
</div>
```

### 块级元素水平居中

- 宽度固定的块级元素

  1. 给其本身设置 _margin: 0 auto;_

     ```html
     <style>
       .item-center-margin {
         margin: 0 auto;
         width: 300px;
         border: 2px solid red;
       }
     </style>

     <div class="item-center-margin">
       宽度固定的块级水平居中——margin
     </div>
     ```

  2. 给其本身设置 _position_ 和 _负 margin_

     ```html
     <style>
       .item-center-position-negative-margin {
         position: absolute;
         margin-left: -150px;
         width: 300px;
         border: 2px solid red;
       }
     </style>

     <div class="item-center-position-negative-margin">
       宽度固定的块级水平居中——position && negative-margin
     </div>
     ```

  3. 给其本身设置 _position_ 和 _margin_，和第一种相似

     ```html
     <style>
       .item-center-position-margin {
         position: absolute;
         left: 0;
         right: 0;
         margin: auto;
         width: 300px;
         border: 2px solid red;
       }
     </style>

     <div class="item-center-position-margin">
       宽度固定的块级水平居中——position && margin
     </div>
     ```

- 宽度不固定的块级元素，两种思路，设置其本身或父元素的 _display_ 属性，设置 _position_ 和 _transform_

  1. 给其本身设置 _display: table;_

     ```html
     <style>
       .item-center-table {
         display: table;
         margin: 0 auto;
         border: 2px solid red;
       }
     </style>

     <div class="item-center-table">
       宽度不固定的块级水平居中——table
     </div>
     ```

  2. 给其本身设置 _display: inline-block;_

     ```html
     <style>
       .parent-inline-block {
         text-align: center;
       }
       .item-center-inline-block {
         display: inline-block;
         border: 2px solid red;
       }
     </style>

     <div class="parent-inline-block">
       <div class="item-center-inline-block">
         宽度不固定的块级水平居中——inline-block
       </div>
     </div>
     ```

  3. 给其父元素设置 _display: flex;_

     ```html
     <style>
       .parent-flex {
         display: flex;
         justify-content: center;
       }
       .item-center-flex {
         border: 2px solid red;
       }
     </style>

     <div class="parent-flex">
       <div class="item-center-flex">
         宽度不固定的块级水平居中——flex
       </div>
     </div>
     ```

  4. 给其父元素设置 _display: grid;_

     ```html
     <style>
       .parent-grid {
         display: grid;
         /* 宽度为auto的一列 */
         grid-template-columns: auto;
         justify-items: center;
         /* 垂直居中 */
         /* align-items: center; */
       }
       .item-center-grid {
         border: 2px solid red;
       }
     </style>

     <div class="parent-grid">
       <div class="item-center-grid">
         宽度不固定的块级水平居中——grid
       </div>
     </div>
     ```

  5. 给其本身设置 _position_ 和 _transform_

     ```html
     <style>
       .item-center-position-transform {
         position: absolute;
         left: 50%;
         transform: translateX(-50%);
         border: 2px solid red;
       }
     </style>

     <div class="item-center-position-transform">
       宽度不固定的块级水平居中——position && transform
     </div>
     ```

## 垂直居中

### 行内元素垂直居中

- 单行，给其本身设置 _line-height_ 或者 _paddig-top = padding-bottom_

  ```html
  <style>
    .inline-center-vertical {
      line-height: 28px; /* 或者 padding: 10px 0; */
      border: 2px solid red;
    }
  </style>

  <span class="inline-center-vertical">
    单行文本居中——line-height || paddig-top = padding-bottom
  </span>
  ```

- 多行，给其本身设置 _table-cell_，父元素设置 _display: table_

  ```html
  <style>
    .inline-parent-center-vertical {
      display: table;
      /* 父元素需要设置高度 */
      height: 300px;
      /* 水平居中 */
      /* text-align: center; */
      border: 2px solid red;
    }
    .inline-item-center-vertical {
      display: table-cell;
      vertical-align: middle;
    }
  </style>

  <div class="inline-parent-center-vertical">
    <span class="inline-multiple-center-vertical">
      多行文本居中——table && height && table-cell && vertical
    </span>
  </div>
  ```

### 块级元素垂直居中

- 高度固定，可以参考[宽度固定的块级元素](### 块级元素水平居中)中方法 2 和方法 3
- 高度不固定，可以参考[宽度不固定的块级元素](### 块级元素水平居中)中方法 3、4、5 以及[行内元素](### 行内元素垂直居中)中的多行居中

## 水平垂直居中

- 宽高固定，可以参考[宽度固定的块级元素](### 块级元素水平居中)中方法 2 和方法 3
- 高度不固定，可以参考[宽度不固定的块级元素]### 块级元素水平居中)中方法 3、4、5 以及[行内元素](### 行内元素垂直居中)中的多行居中

:::tip 总结

- 宽高不固定的居中方法适用宽高不固定的元素
- 当对元素或其父元素设置过 _display_ 属性后，就已经改变了原始元素的块与行内属性
- 总体来说 _flex_ 与 _grid_ 布局方式可以很容易地解决居中问题，但鉴于 _grid_ 属性的兼容性，所以还是推荐使用 _flex_ 布局解决
:::

## 浮动

> - 原理：元素浮动，脱离文档流
> - 注意事项：如果总宽度小于左右以及中间元素的内容宽度之和，布局会被破坏变的混乱
> - 优点：兼容性好

### 普通浮动

> - 要求：**需要将中间的元素放在最后，否则右边的元素会下沉到中间元素的下方，并且要使用 _margin_ 为中间元素设置宽度**
> - 缺点：影响 dom 渲染顺序，当三个元素高度不一致时显示丑陋

```html
<style>
  .layout.float .left {
    float: left;
    width: 300px;
    background-color: red;
  }
  .layout.float .right {
    float: right;
    width: 300px;
    background-color: blue;
  }
  .layout.float .center {
    margin: 0 300px;
    background-color: green;
  }
</style>

<article class="layout float">
  <div class="left">左</div>
  <div class="right">右</div>
  <div class="center">中</div>
</article>
```

### 创建 BFC

> - 要求：**需要将中间的元素放在最后，使用 _overflow: hidden;_ 创建 BFC**
> - 缺点：影响 dom 渲染顺序，当三个元素高度不一致时显示丑陋
> - [BFC](/basic/2-box/bfc.html)的内容会在第 2 章盒模型中详细讲解

```html
<style>
  .layout.bfc .left {
    float: left;
    width: 300px;
    background-color: red;
  }
  .layout.bfc .right {
    float: right;
    width: 300px;
    background-color: blue;
  }
  .layout.bfc .center {
    overflow: hidden;
    background-color: green;
  }
</style>

<article class="layout bfc">
  <div class="left">左</div>
  <div class="right">右</div>
  <div class="center">中</div>
</article>
```

### 双飞翼布局

> - 要求：**需要将中间的元素包裹起来并放在最前**
> - 原理：利用负 _margin_ 值
> - 优点：可以使中间的元素优先渲染
> - 缺点：dom 结构稍复杂，当三个元素高度不一致时显示丑陋

```html
<style>
  .content {
    float: left;
    width: 100%;
  }
  .center {
    margin: 0 300px;
    height: 100px;
    background-color: green;
  }
  .left {
    float: left;
    width: 300px;
    height: 100px;
    margin-left: -100%;
    background-color: red;
  }
  .right {
    width: 300px;
    float: right;
    height: 100px;
    margin-left: -300px;
    background-color: blue;
  }
</style>

<div class="content">
  <div class="center">中</div>
</div>
<div class="left">左</div>
<div class="right">右</div>
```

### 圣杯布局

> - 要求：**需要将中间的元素放在最后，使用 _overflow: hidden;_ 创建 BFC**
> - 原理：利用负 _margin_ 值
> - 优点：可以使中间的元素优先渲染
> - 缺点：css 结构稍复杂，当三个元素高度不一致时显示丑陋

```html
<style>
  .layout.holy {
    margin: 0 300px;
  }
  .layout.holy .left {
    position: relative;
    left: -300px;
    float: left;
    width: 300px;
    height: 100px;
    margin-left: -100%;
    background-color: red;
  }
  .layout.holy .right {
    position: relative;
    right: -300px;
    float: left;
    width: 300px;
    height: 100px;
    margin-left: -300px;
    background-color: blue;
  }
  .layout.holy .center {
    float: left;
    width: 100%;
    height: 100px;
    background-color: green;
  }
</style>

<article class="layout holy">
  <div class="center">中</div>
  <div class="left">左</div>
  <div class="right">右</div>
</article>
```

## 绝对定位

> - 原理：元素绝对定位，脱离文档流
> - 注意事项：如果总宽度小于左右以及中间元素的内容宽度之和，右侧元素会覆盖中间内容
> - 优点：兼容性好，相比于浮动，可以不用改变元素顺序
> - 缺点：当三个元素高度不一致时显示丑陋

```html
<style>
  .layout.position > div {
    position: absolute;
  }
  .layout.position .left {
    left: 0;
    width: 300px;
    background-color: blue;
  }
  .layout.position .right {
    right: 0;
    width: 300px;
    background-color: blue;
  }
  .layout.position .center {
    left: 300px;
    right: 300px;
    background-color: green;
  }
</style>
<article class="layout position">
  <div class="left">左</div>
  <div class="center">中</div>
  <div class="right">右</div>
</article>
```

## flex

> - 原理：_flex_ 弹性盒子布局
> - 注意事项：低版本浏览器兼容
> - 优点：简单实用，子元素高度会保持一致
> - 缺点：需要处理兼容性

```html
<style>
  .layout.flex {
    display: flex;
  }
  .layout.flex .left {
    width: 300px;
    background-color: blue;
  }
  .layout.flex .right {
    width: 300px;
    background-color: blue;
  }
  .layout.flex .center {
    flex: 1;
    /* 或者 flex-grow: 1; */
    background-color: green;
  }
</style>

<article class="layout flex">
  <div class="left">左</div>
  <div class="center">中</div>
  <div class="right">右</div>
</article>
```

## table

> - 原理：模拟 _table_ 布局
> - 优点：兼容性好，子元素高度会保持一致
> - 缺点：无法设置栏间距

```html
<style>
  .layout.table {
    display: table;
    width: 100%;
  }
  .layout.table > div {
    display: table-cell;
  }
  .layout.table .left {
    width: 300px;
    background-color: blue;
  }
  .layout.table .right {
    width: 300px;
    background-color: blue;
  }
  .layout.table .center {
    background-color: green;
  }
</style>

<article class="layout table">
  <div class="left">左</div>
  <div class="center">中</div>
  <div class="right">右</div>
</article>
```

## grid

> - 原理：_grid_ 网格布局
> - 优点：设置简单，专为网格类布局设计，高度由父元素控制
> - 缺点：浏览器兼容性差

```html
<style>
  .layout.grid {
    display: grid;
    width: 100%;
    /* 行高 */
    grid-template-rows: 100px;
    /* 列数及列宽 */
    grid-template-columns: 300px auto 300px;
  }
  .layout.grid .left {
    width: 300px;
    background-color: blue;
  }
  .layout.grid .right {
    width: 300px;
    background-color: blue;
  }
  .layout.grid .center {
    background-color: green;
  }
</style>

<article class="layout grid">
  <div class="left">左</div>
  <div class="center">中</div>
  <div class="right">右</div>
</article>
```
