---
  category: 性能优化
---

# 页面性能

:::tip
如何优化页面性能？浏览器缓存？
:::

## 常用优化方法

- 资源压缩合并，减少 HTTP 请求

- 非核心代码异步加载，提高加载速度
  - 动态脚本加载，动态创建 script 节点
  - `defer`，HTML 解析完再执行，按照加载顺序依次执行
  - `async`，脚本加载完立即执行，执行顺序与加载顺序无关

- 浏览器缓存

- CDN内容分发网络，将资源部署到世界各地，用户在访问时按照就近原则访问资源

- 预解析 DNS
  - `<meta http-equiv="x-dns-predetch-control" content = "on">`，一般默认打开，HTTPS 默认关闭，此处可以强制打开 dns 预解析
  - `<link rel="dns-prefetch" href="//host_name_to_prefetch">`预解析 dns

- 使用 SSR 服务端渲染，直接返回 HTML 页面

## 缓存

- 强制缓存

  - 服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行协商缓存策略
  - `Cache-Control: max-age` 相对时间长度
  - `Expires` 服务器绝对时间点

- 协商缓存
  - 将缓存信息中的 Etag 和 Last-Modified 通过请求发送给服务器，由服务器校验，返回 304 状态码时，浏览器直接使用缓存
  - `If-None-Match(Etag)` tag 唯一哈希值
  - `If-Modified-Since(Last-Modified)` 修改时间
