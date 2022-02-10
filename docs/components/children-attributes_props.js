import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/components/children-attributes.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/components/children-attributes.html",
    'title': "传递子元素和属性",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>传递子元素和属性</h1>\n<p>有时候，你会希望将一些重要的功能封装在你的状态中，而不是直接嵌套在另一个组件中。\n在这些情况下，你需要将元素和属性传递到组件中，并让组件适当地放置它们。</p>\n<p>本章我们主要会了解到：</p>\n<ul>\n<li>传递子元素到组件。</li>\n<li>传递属性到组件。</li>\n</ul>\n<h2 id="%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5">使用情况<a class="anchor" href="#%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5">§</a></h2>\n<p>假设你正在构建一个网站，你需要对一个 <code>&lt;a&gt;</code> 标签进行封装：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    a <span class="token punctuation">{</span>\n        href<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://google.com">https://google.com</a>"</span>\n        <span class="token string">"Link to google"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>如果你需要把 <code>a</code> 标签封装成一个组件：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    href<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span><span class="token punctuation">,</span>\n    title<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">Clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span>\n            href<span class="token punctuation">:</span> <span class="token string">"{cx.props.href}"</span>\n            <span class="token string">"{cx.props.title}"</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>接下来你可以这么使用它：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Clickable</span> <span class="token punctuation">{</span>\n        href<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://google.com">https://google.com</a>"</span>\n        title<span class="token punctuation">:</span> <span class="token string">"Link to Google"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E4%BC%A0%E9%80%92%E5%AD%90%E5%85%83%E7%B4%A0">传递子元素<a class="anchor" href="#%E4%BC%A0%E9%80%92%E5%AD%90%E5%85%83%E7%B4%A0">§</a></h2>\n<p>如果我们希望在我们的组件内可以嵌入其他子 元素/组件，那我们只需要定义一个类型为 Element 的道具：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    href<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span><span class="token punctuation">,</span>\n    body<span class="token punctuation">:</span> <span class="token class-name">Element</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">Clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span>\n            href<span class="token punctuation">:</span> <span class="token string">"{cx.props.href}"</span><span class="token punctuation">,</span>\n            <span class="token operator">&amp;</span>cx<span class="token punctuation">.</span>props<span class="token punctuation">.</span>body\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>使用它：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Clickable</span> <span class="token punctuation">{</span>\n        href<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://google.com">https://google.com</a>"</span>\n        body<span class="token punctuation">:</span> cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n            img <span class="token punctuation">{</span> src<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://www.google.com/logos/doodles/...">https://www.google.com/logos/doodles/...</a>"</span> <span class="token punctuation">}</span>\n        <span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<h2 id="children-%E7%89%B9%E6%AE%8A%E9%A1%B9"><code>Children</code> 特殊项<a class="anchor" href="#children-%E7%89%B9%E6%AE%8A%E9%A1%B9">§</a></h2>\n<p>上面所介绍的在 <code>Props</code> 中嵌入一个子元素有时候使用起来并不方便，所以我们还内置了 <code>Children</code> 这种属性：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    href<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span><span class="token punctuation">,</span>\n    children<span class="token punctuation">:</span> <span class="token class-name">Element</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span>\n            href<span class="token punctuation">:</span> <span class="token string">"{cx.props.href}"</span><span class="token punctuation">,</span>\n            <span class="token operator">&amp;</span>cx<span class="token punctuation">.</span>props<span class="token punctuation">.</span>children\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>使用它则会方便很多：</p>\n<pre class="language-autoit"><code class="language-autoit">rsx!<span class="token punctuation">(</span>\n    Clickable {\n        href<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://google.com">https://google.com</a>"</span>\n        img { src<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://www.google.com/logos/doodles/....">https://www.google.com/logos/doodles/....</a>"</span> }\n    }\n<span class="token punctuation">)</span>\n</code></pre>\n<p>它更像我们原生的 HTML 标签组件那种嵌入子元素了。</p>\n<h2 id="%E4%BC%A0%E9%80%92%E5%B1%9E%E6%80%A7">传递属性<a class="anchor" href="#%E4%BC%A0%E9%80%92%E5%B1%9E%E6%80%A7">§</a></h2>\n<p>你也可以将属性信息在 <code>Props</code> 中传递：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Clickable</span> <span class="token punctuation">{</span>\n        <span class="token string">"class"</span><span class="token punctuation">:</span> <span class="token string">"blue-button"</span><span class="token punctuation">,</span>\n        <span class="token string">"style"</span><span class="token punctuation">:</span> <span class="token string">"background: red;"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>传递属性，你需要添加 <code>attributes</code> 字段：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    attributes<span class="token punctuation">:</span> <span class="token class-name">Attributes</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span> \n            <span class="token punctuation">..</span>cx<span class="token punctuation">.</span>props<span class="token punctuation">.</span>attributes<span class="token punctuation">,</span>\n            <span class="token string">"Any link, anywhere"</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<h2 id="%E4%BC%A0%E9%80%92%E5%A4%84%E7%90%86%E5%99%A8">传递处理器<a class="anchor" href="#%E4%BC%A0%E9%80%92%E5%A4%84%E7%90%86%E5%99%A8">§</a></h2>\n<p>Dioxus 支持对 <code>on</code> 事件的传递，你可以为你的组件绑定各类事件：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    onclick<span class="token punctuation">:</span> <span class="token class-name">EventHandler</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token punctuation">,</span> <span class="token class-name">MouseEvent</span><span class="token operator">></span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span> \n            onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>evt<span class="token closure-punctuation punctuation">|</span></span> cx<span class="token punctuation">.</span>props<span class="token punctuation">.</span>onclick<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>evt<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>我们可以在使用组件的时候这样绑定它：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Clickable</span> <span class="token punctuation">{</span>\n        onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token namespace">log<span class="token punctuation">::</span></span><span class="token macro property">info!</span><span class="token punctuation">(</span><span class="token string">"Clicked"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>这样子当 <code>a</code> 标签被点击时，就会触发 <code>log::info!</code> 的功能。</p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u4F20\u9012\u5B50\u5143\u7D20\u548C\u5C5E\u6027"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>有时候，你会希望将一些重要的功能封装在你的状态中，而不是直接嵌套在另一个组件中。\n在这些情况下，你需要将元素和属性传递到组件中，并让组件适当地放置它们。</p>\n<p>本章我们主要会了解到：</p>\n<ul>\n<li>传递子元素到组件。</li>\n<li>传递属性到组件。</li>\n</ul>\n<h2 id="%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5">使用情况<a class="anchor" href="#%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5">§</a></h2>\n<p>假设你正在构建一个网站，你需要对一个 <code>&lt;a&gt;</code> 标签进行封装：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    a <span class="token punctuation">{</span>\n        href<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://google.com">https://google.com</a>"</span>\n        <span class="token string">"Link to google"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>如果你需要把 <code>a</code> 标签封装成一个组件：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    href<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span><span class="token punctuation">,</span>\n    title<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">Clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span>\n            href<span class="token punctuation">:</span> <span class="token string">"{cx.props.href}"</span>\n            <span class="token string">"{cx.props.title}"</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>接下来你可以这么使用它：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Clickable</span> <span class="token punctuation">{</span>\n        href<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://google.com">https://google.com</a>"</span>\n        title<span class="token punctuation">:</span> <span class="token string">"Link to Google"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E4%BC%A0%E9%80%92%E5%AD%90%E5%85%83%E7%B4%A0">传递子元素<a class="anchor" href="#%E4%BC%A0%E9%80%92%E5%AD%90%E5%85%83%E7%B4%A0">§</a></h2>\n<p>如果我们希望在我们的组件内可以嵌入其他子 元素/组件，那我们只需要定义一个类型为 Element 的道具：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    href<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span><span class="token punctuation">,</span>\n    body<span class="token punctuation">:</span> <span class="token class-name">Element</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">Clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span>\n            href<span class="token punctuation">:</span> <span class="token string">"{cx.props.href}"</span><span class="token punctuation">,</span>\n            <span class="token operator">&amp;</span>cx<span class="token punctuation">.</span>props<span class="token punctuation">.</span>body\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>使用它：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Clickable</span> <span class="token punctuation">{</span>\n        href<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://google.com">https://google.com</a>"</span>\n        body<span class="token punctuation">:</span> cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n            img <span class="token punctuation">{</span> src<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://www.google.com/logos/doodles/...">https://www.google.com/logos/doodles/...</a>"</span> <span class="token punctuation">}</span>\n        <span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<h2 id="children-%E7%89%B9%E6%AE%8A%E9%A1%B9"><code>Children</code> 特殊项<a class="anchor" href="#children-%E7%89%B9%E6%AE%8A%E9%A1%B9">§</a></h2>\n<p>上面所介绍的在 <code>Props</code> 中嵌入一个子元素有时候使用起来并不方便，所以我们还内置了 <code>Children</code> 这种属性：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    href<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span><span class="token punctuation">,</span>\n    children<span class="token punctuation">:</span> <span class="token class-name">Element</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span>\n            href<span class="token punctuation">:</span> <span class="token string">"{cx.props.href}"</span><span class="token punctuation">,</span>\n            <span class="token operator">&amp;</span>cx<span class="token punctuation">.</span>props<span class="token punctuation">.</span>children\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>使用它则会方便很多：</p>\n<pre class="language-autoit"><code class="language-autoit">rsx!<span class="token punctuation">(</span>\n    Clickable {\n        href<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://google.com">https://google.com</a>"</span>\n        img { src<span class="token punctuation">:</span> <span class="token string">"<a class="token url-link" href="https://www.google.com/logos/doodles/....">https://www.google.com/logos/doodles/....</a>"</span> }\n    }\n<span class="token punctuation">)</span>\n</code></pre>\n<p>它更像我们原生的 HTML 标签组件那种嵌入子元素了。</p>\n<h2 id="%E4%BC%A0%E9%80%92%E5%B1%9E%E6%80%A7">传递属性<a class="anchor" href="#%E4%BC%A0%E9%80%92%E5%B1%9E%E6%80%A7">§</a></h2>\n<p>你也可以将属性信息在 <code>Props</code> 中传递：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Clickable</span> <span class="token punctuation">{</span>\n        <span class="token string">"class"</span><span class="token punctuation">:</span> <span class="token string">"blue-button"</span><span class="token punctuation">,</span>\n        <span class="token string">"style"</span><span class="token punctuation">:</span> <span class="token string">"background: red;"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>传递属性，你需要添加 <code>attributes</code> 字段：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    attributes<span class="token punctuation">:</span> <span class="token class-name">Attributes</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span> \n            <span class="token punctuation">..</span>cx<span class="token punctuation">.</span>props<span class="token punctuation">.</span>attributes<span class="token punctuation">,</span>\n            <span class="token string">"Any link, anywhere"</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<h2 id="%E4%BC%A0%E9%80%92%E5%A4%84%E7%90%86%E5%99%A8">传递处理器<a class="anchor" href="#%E4%BC%A0%E9%80%92%E5%A4%84%E7%90%86%E5%99%A8">§</a></h2>\n<p>Dioxus 支持对 <code>on</code> 事件的传递，你可以为你的组件绑定各类事件：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">ClickableProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    onclick<span class="token punctuation">:</span> <span class="token class-name">EventHandler</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token punctuation">,</span> <span class="token class-name">MouseEvent</span><span class="token operator">></span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">clickable</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">ClickableProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        a <span class="token punctuation">{</span> \n            onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>evt<span class="token closure-punctuation punctuation">|</span></span> cx<span class="token punctuation">.</span>props<span class="token punctuation">.</span>onclick<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>evt<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>我们可以在使用组件的时候这样绑定它：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Clickable</span> <span class="token punctuation">{</span>\n        onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token namespace">log<span class="token punctuation">::</span></span><span class="token macro property">info!</span><span class="token punctuation">(</span><span class="token string">"Clicked"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>这样子当 <code>a</code> 标签被点击时，就会触发 <code>log::info!</code> 的功能。</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5" }, "\u4F7F\u7528\u60C5\u51B5")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BC%A0%E9%80%92%E5%AD%90%E5%85%83%E7%B4%A0" }, "\u4F20\u9012\u5B50\u5143\u7D20")),
            React.createElement("li", null,
                React.createElement("a", { href: "#children-%E7%89%B9%E6%AE%8A%E9%A1%B9" }, "Children \u7279\u6B8A\u9879")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BC%A0%E9%80%92%E5%B1%9E%E6%80%A7" }, "\u4F20\u9012\u5C5E\u6027")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BC%A0%E9%80%92%E5%A4%84%E7%90%86%E5%99%A8" }, "\u4F20\u9012\u5904\u7406\u5668")))),
    'author': "YuKun Liu",
    'contributors': [
        "YuKun Liu"
    ],
    'date': "2022-02-10T11:57:47.000Z",
    'updated': null,
    'excerpt': "有时候，你会希望将一些重要的功能封装在你的状态中，而不是直接嵌套在另一个组件中。 在这些情况下，你需要将元素和属性传递到组件中，并让组件适当地放置它们。 本章我们主要会了解到： - 传递子元素到组件。 - 传递属性到组...",
    'cover': undefined,
    'sidebar': [
        {
            "text": "介绍",
            "link": "index.html",
            "pagePath": "README.md"
        },
        {
            "text": "安装",
            "link": "/docs/setup.html"
        },
        {
            "text": "入门",
            "link": "/docs/hello-world.html"
        },
        {
            "text": "UI设计",
            "link": "/docs/ui/index.html",
            "children": [
                {
                    "text": "元素介绍",
                    "link": "/docs/ui/vnodes.html"
                },
                {
                    "text": "条件渲染",
                    "link": "/docs/ui/conditional-render.html"
                },
                {
                    "text": "列表渲染",
                    "link": "/docs/ui/lists.html"
                },
                {
                    "text": "特殊属性",
                    "link": "/docs/ui/special-attributes.html"
                }
            ]
        },
        {
            "text": "组件封装",
            "link": "/docs/components/index.html",
            "children": [
                {
                    "text": "组件属性",
                    "link": "/docs/components/properties.html"
                },
                {
                    "text": "传递子元素和属性",
                    "link": "/docs/components/children-attributes.html"
                }
            ]
        },
        {
            "text": "交互性",
            "link": "/docs/interactivity/index.html",
            "children": [
                {
                    "text": "钩子与内部状态",
                    "link": "/docs/interactivity/hooks-state.html"
                }
            ]
        }
    ]
};
