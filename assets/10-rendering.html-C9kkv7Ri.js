import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as i,e as o}from"./app-CgZv1aOY.js";const l="/fe-handbook/assets/image/basic/render_process.png",n={},a=o('<h1 id="浏览器渲染机制" tabindex="-1"><a class="header-anchor" href="#浏览器渲染机制"><span>浏览器渲染机制</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>DOCTYPE 作用？浏览器渲染过程？触发及避免回流/重绘？</p></div><h2 id="doctype-作用" tabindex="-1"><a class="header-anchor" href="#doctype-作用"><span>DOCTYPE 作用</span></a></h2><p>DOCTYPE 声明文档类型和 DTD 规范，验证文件合法性</p><p>DTD(document type definition)：</p><ul><li>定义文档类型使浏览器根据其定义来决定使用哪种协议来解析文档并切换浏览器模式</li></ul><p>HTML5：<code>&lt;!DOCTYPE html&gt;</code></p><p>HTML4.01：</p><ul><li>Strict 模式</li><li>Transitional loose 模式</li></ul><h2 id="渲染过程" tabindex="-1"><a class="header-anchor" href="#渲染过程"><span>渲染过程</span></a></h2><figure><img src="'+l+'" alt="渲染过程" tabindex="0" loading="lazy"><figcaption>浏览器渲染过程</figcaption></figure><h2 id="回流" tabindex="-1"><a class="header-anchor" href="#回流"><span>回流</span></a></h2><p>回流(Reflow)：DOM 结构中各个元素都有自己的盒模型，浏览器根据各种样式计算并根据计算结果将元素放置在页面上的具体位置，当 Render Tree 中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流(重排)</p><p>触发条件：</p><ul><li>页面首次渲染</li><li>增加、删除、修改可见的 DOM 元素</li><li>DOM 的位置或尺寸变化</li><li>元素字体字号变化</li><li>激活 CSS 伪类（例如：:hover）</li><li>改变窗口大小或滚动（有可能）</li><li>查询某些属性或调用某些方法 <ul><li>client 尺寸及位置：<code>clientWidth / clientHeight / clientTop / clientLeft</code></li><li>元素尺寸及位置：<code>offsetWidth / offsetHeight / offsetTop / offsetLeft</code></li><li>滚动位置：<code>scrollWidth / scrollHeight / scrollTop / scrollLeft</code></li><li>滚动：<code>scrollIntoView() / scrollIntoViewIfNeeded() / scrollTo()</code></li><li>获取元素尺寸：<code>getComputedStyle()</code></li><li>获取元素位置：<code>getBoundingClientRect()</code></li></ul></li></ul><h2 id="重绘" tabindex="-1"><a class="header-anchor" href="#重绘"><span>重绘</span></a></h2><p>重绘(Repaint)：当页面中元素样式的改变并不影响它在文档流中的位置时，浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘</p><p>触发条件：</p><ul><li><code>color / background-color / visibility</code>等不影响元素位置及尺寸的属性变化</li></ul><h2 id="如何避免" tabindex="-1"><a class="header-anchor" href="#如何避免"><span>如何避免</span></a></h2><p>CSS：</p><ul><li>避免使用 <code>table</code> 布局</li><li>尽量在 DOM 树的最末端改变 <code>class</code></li><li>避免设置多层内联样式</li><li>将动画应用到 <code>position</code> 属性为 <code>absolute</code> 或 <code>fixed</code> 的元素上</li><li>避免使用 <code>CSS</code> 表达式，如 <code>calc()</code></li></ul><p>JS:</p><ul><li>避免频繁操作样式，最好一次性改变 <code>style</code> 或者 <code>class</code></li><li>避免频繁操作 DOM，创建一个 <code>documentFragmeng</code> 并在其上应用所有 DOM 操作然后一次性添加进文档</li></ul><div class="hint-container warning"><p class="hint-container-title">总结</p><p>回流必将引起重绘，重绘不一定会引起回流，并且回流比重绘的代价要更高。</p></div>',25),c=[a];function r(d,s){return t(),i("div",null,c)}const m=e(n,[["render",r],["__file","10-rendering.html.vue"]]),g=JSON.parse(`{"path":"/interview/outline/10-rendering.html","title":"浏览器渲染机制","lang":"zh-CN","frontmatter":{"category":"浏览器","description":"浏览器渲染机制 提示 DOCTYPE 作用？浏览器渲染过程？触发及避免回流/重绘？ DOCTYPE 作用 DOCTYPE 声明文档类型和 DTD 规范，验证文件合法性 DTD(document type definition)： 定义文档类型使浏览器根据其定义来决定使用哪种协议来解析文档并切换浏览器模式 HTML5：<!DOCTYPE html> HT...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/fe-handbook/interview/outline/10-rendering.html"}],["meta",{"property":"og:site_name","content":"HC的前端手册"}],["meta",{"property":"og:title","content":"浏览器渲染机制"}],["meta",{"property":"og:description","content":"浏览器渲染机制 提示 DOCTYPE 作用？浏览器渲染过程？触发及避免回流/重绘？ DOCTYPE 作用 DOCTYPE 声明文档类型和 DTD 规范，验证文件合法性 DTD(document type definition)： 定义文档类型使浏览器根据其定义来决定使用哪种协议来解析文档并切换浏览器模式 HTML5：<!DOCTYPE html> HT..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/fe-handbook/assets/image/basic/render_process.png '浏览器渲染过程'"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-18T10:45:41.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"浏览器渲染机制"}],["meta",{"property":"article:author","content":"Mr.HC"}],["meta",{"property":"article:modified_time","content":"2024-02-18T10:45:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"浏览器渲染机制\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/fe-handbook/assets/image/basic/render_process.png '浏览器渲染过程'\\"],\\"dateModified\\":\\"2024-02-18T10:45:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.HC\\"}]}"]]},"headers":[{"level":2,"title":"DOCTYPE 作用","slug":"doctype-作用","link":"#doctype-作用","children":[]},{"level":2,"title":"渲染过程","slug":"渲染过程","link":"#渲染过程","children":[]},{"level":2,"title":"回流","slug":"回流","link":"#回流","children":[]},{"level":2,"title":"重绘","slug":"重绘","link":"#重绘","children":[]},{"level":2,"title":"如何避免","slug":"如何避免","link":"#如何避免","children":[]}],"git":{"createdTime":1708253141000,"updatedTime":1708253141000,"contributors":[{"name":"LuoHuacheng","email":"154224099@qq.com","commits":1}]},"readingTime":{"minutes":1.95,"words":585},"filePathRelative":"interview/outline/10-rendering.md","localizedDate":"2024年2月18日","autoDesc":true}`);export{m as comp,g as data};
