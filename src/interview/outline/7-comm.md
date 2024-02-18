---
  category: Javascript
---

# 前后端通信

:::tip
前后端通信方法有哪些？同源与跨域？
:::

## 同源策略及限制

同源是指域名、端口与协议全都相同。

非同源通信会存在以下限制：

1. Cookie、LocalStorage、IndexDB 无法获取
2. DOM 无法获取与操作
3. Ajax 不能发送，只适用于同源通信

## 前后端通信方法

### Ajax

Asynchronous JavaScript and XML 同源通信

1. 创建 XMLHTTPRequest 对象 `xhr = new XMLHttpRequest()`  
   兼容 IE：`new window.ActiveXObject('Microsoft.XMLHTTP')`
2. 使用 `open` 方法设置请求的参数：`xhr.open(method, url, 是否异步)`  
   `GET` 与 `POST` 传输数据格式以及请求头设置  
   `xhr.setRequestHeader('Content-Type': 'application/x-www-form=urlencoded')`
3. 发送请求 xhr.send()
4. 注册事件 xhr.onreadystatechange 事件监听请求的状态 `xhr.readyState` 和 `xhr.status`
5. 获取返回的数据并操作

```js
function ajax(options, callback) {
  let url = options.url;
  const method = options.method.toLocaleLowerCase() || 'get';
  const async = options.async != false; // default is true
  const data = options.data;
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    //如果是IE5或者IE6浏览器，则使用ActiveX对象
    xhr = ActiveXObject('Microsoft.XMLHTTP');
  }
  let paramArr = [];
  let encodeData;
  if (data instanceof Object) {
    for (let key in data) {
      // 参数拼接需要通过 encodeURIComponent 进行编码
      paramArr.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      );
    }
    encodeData = paramArr.join('&');
  }
  if (method === 'get') {
    // 检测 url 中是否已存在 ? 及其位置
    const index = url.indexOf('?');
    if (index === -1) url += '?';
    else if (index !== url.length - 1) url += '&';
    // 拼接 url
    url += encodeData;
  }
  xhr.open(method, url, async);
  if (method === 'get') {
    xhr.send(null);
  } else {
    // post 方式需要设置请求头
    xhr.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=UTF-8'
    );
    xhr.send(encodeData);
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        callback(xhr.responseText);
      }
    }
  };
  xhr.onerror = err => callback(err);
}

ajax(
  {
    url: 'api',
    method: 'get',
    async: true,
    data: {}
  },
  callback(res)
);
```

### WebSocket

不受同源策略限制

特点:

- 基于 TCP 协议，服务端易实现
- 与 HTTP 协议兼容性好，默认端口为 80 和 443，握手阶段采用 HTTP 协议
- 数据格式轻量、性能开销小、通信高效
- 可发送文本，也可发送二进制数据
- 无同源限制，客户端可以与任意服务器通信
- 协议标识为 `ws` 或 `wss`
- 服务器可主动向客户端发送数据

客户端实现：

1. 创建 WebSocket 对象：`ws = new WebSocket(url)`
2. 打开连接：`ws.open = fn(e){}`
3. 接收信息：`ws.onmessage = fn(e){}`
4. 关闭连接：`ws.onclose = fn(e){}`
5. 错误捕获：`ws.onerror = fn(e){}`

### CORS

Corss-Origin Resource Sharing 支持跨域与同源

简单请求：

- GET、HEAD、POST
- Accept、Accept-Language、Content-Language
- Content-Type：application/x-www-form-urlencoded、multipart/form-data、text\plain

非简单请求：

- OPTIONS 方法发起预请求以获知服务器是否允许该实际请求
- 预检请求对 JS 是透明的，JS 无法获取预检请求的任何信息
- 预检请求不是每次都发生，可以在服务端设置 Access-Control-Max-Age 来控制预检请求的有效期，有效期内不再发送

携带身份凭证(token)的请求:

- CORS 默认不带身份凭证，需要前端设置 withCredentials=true 来使请求发送凭据
- 附带凭证后
  1. 服务端 `Access-Control-Allow-Origin` 不能设置为 \*
  2. 服务端 `Access-Control-Allow-Credentials` 需要设置为 true

## 跨域通信

- JSONP(JSON Padding)

  - 利用 `script` 标签跨域，由服务端返回预先设定好的全局函数的调用，并将服务端数据以参数传递
  - 只能用于 GET 请求，且在接收数据处理完后要删除这个全局变量

  ```html
  <script
    type="text/javascript"
    src="/api?jsoncallback=callbackFunction"
  ></script>
  <script type="text/javascript">
    function callbackFunction(response) {
      console.log(response);
    }
  </script>
  ```

- Hash

  - 利用 Hash 改变后页面不会刷新的特点跨域
  - A 页面将要改善的数据转换为 JSON 字符串发给 B 页面，`B.src = B.src + '#' + 'jsonString';`
  - B 页面监听 hash 变化取得数据，`var data = window.location.hash;`
  - 数据长度有限制，由浏览器地址栏长度限制

- WebSocket
- CORS
