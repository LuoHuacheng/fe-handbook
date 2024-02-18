---
  category: 错误监控
---

# 错误监控

:::tip
错误分类？如何捕获？如何上报？
:::

## 错误分类

- 即时运行错误（代码错误）
- 资源加载错误

## 捕获方式

- 即时错误捕获方式

  - `try {} catch (error) {}`
  - `window.onerror / window.addEventListener('error')`
  - 跨域 JS 运行错误捕获
    - 只能捕获到错误，无法获取的具体的错误信息，要获取详细信息需要做到以下两步：
    1. 前端在 script 标签上增加 crossorigin 属性
    2. 服务器端设置 Access-Control-Allow-Origin

- 加载错误捕获方式
  - `object.onerror` 资源加载错误无法冒泡，所以不能用 `window.onerror`
  - `performace.getEntries()` 浏览器提供的显示当前页面所加载的所有资源列表 api
  - Error 捕获事件

## 上报原理

- 使用 Ajax 通信上报
- 利用 Image 对象上报，`(new Image()).src=错误上报地址`
