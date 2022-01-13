import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/ui/conditional-render.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/ui/conditional-render.html",
    'title': "条件渲染",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>条件渲染</h1>\n<p>组件往往需要在不同的情况下渲染不同的内容到页面上，页面的内容并不是一成不变的。\n我们常常需要根据不同的情况去渲染界面。</p>\n<h2 id="%E6%9C%89%E6%9D%A1%E4%BB%B6%E7%9A%84%E8%BF%94%E5%9B%9E%E5%85%83%E7%B4%A0">有条件的返回元素<a class="anchor" href="#%E6%9C%89%E6%9D%A1%E4%BB%B6%E7%9A%84%E8%BF%94%E5%9B%9E%E5%85%83%E7%B4%A0">§</a></h2>\n<p>在一些组件中，你可能需要在不同的判断语句下返回不同的 Element 元素，我们来完成一个简单的 Demo ：</p>\n<ul>\n<li>在线：显示应用页面</li>\n<li>离线：显示登陆页面</li>\n</ul>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props, PartialEq)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">AppProps</span> <span class="token punctuation">{</span>\n    logged_in<span class="token punctuation">:</span> <span class="token keyword">bool</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>我们在 <code>道具(Props)</code> 中定义了一个是否登陆的 Bool 值，它将用于判断我们的登陆状态。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">AppProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> props<span class="token punctuation">.</span>logged_in <span class="token punctuation">{</span>\n        cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n            <span class="token class-name">DashboardScreen</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n            <span class="token class-name">LoginScreen</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>在上方代码中，我们判断了道具中 <code>logged_in</code> 变量的状态，并返回了相应的自定义组件渲染。</p>\n<blockquote>\n<p>自定义组件将在后续内容中讲解到。</p>\n</blockquote>\n<h2 id="%E4%BD%BF%E7%94%A8%E5%8C%B9%E9%85%8D%E8%AF%AD%E5%8F%A5">使用匹配语句<a class="anchor" href="#%E4%BD%BF%E7%94%A8%E5%8C%B9%E9%85%8D%E8%AF%AD%E5%8F%A5">§</a></h2>\n<p>匹配语句其实和上面的判断方法很像，以下是大概的使用演示：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span><span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">match</span> <span class="token function">get_name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Ok</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">=></span> cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token string">"你好，{name}"</span> <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token class-name">Err</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token string">"对不起，我还不知道你的名字，因为出现错误了： {err}"</span> <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>如果你想让代码变得更加简洁，省略掉 <code>cx.render</code> 这一部分，你可以这样：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span><span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">match</span> <span class="token function">get_name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token string">"jack"</span> <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span>cx<span class="token punctuation">,</span> <span class="token string">"你好啊杰克，最近怎么样？"</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token string">"diane"</span> <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span>cx<span class="token punctuation">,</span> <span class="token string">"你好啊黛安娜，最近怎么样？"</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>\n        name <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span>cx<span class="token punctuation">,</span> <span class="token string">"你好：{name}"</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>为 <code>rsx!()</code> 在第一个参数处传递 cx 可以让宏自动调用 render 方法。</p>\n<h2 id="rsx-%E5%B5%8C%E5%A5%97">RSX 嵌套<a class="anchor" href="#rsx-%E5%B5%8C%E5%A5%97">§</a></h2>\n<p>我们可以在 <code>rsx!()</code> 中嵌套一个新的 <code>rsx!()</code>，类似于这样：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        <span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n            <span class="token string">"more rsx!"</span>\n        <span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>也可以将它们分开调用（比如保存到一个变量值中）：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> title <span class="token operator">=</span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token string">"more rsx!"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        title\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>如果我们希望条件运行后的结果同时包含一个 <strong>头组件</strong> 和 <strong>尾组件</strong>，那这对我们来说很有用：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> screen <span class="token operator">=</span> <span class="token keyword">match</span> logged_in <span class="token punctuation">{</span>\n    <span class="token boolean">true</span> <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span><span class="token class-name">DashboardScreen</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token boolean">false</span> <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span><span class="token class-name">LoginScreen</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\ncx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n    <span class="token class-name">Navbar</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n    screen<span class="token punctuation">,</span>\n    <span class="token class-name">Footer</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E5%B8%83%E5%B0%94%E6%98%A0%E5%B0%84">布尔映射<a class="anchor" href="#%E5%B8%83%E5%B0%94%E6%98%A0%E5%B0%84">§</a></h2>\n<p>我们建议您尝试有条件地 隐藏/显示 一个元素时使用 “布尔映射” 模式。</p>\n<p>Rust 允许您通过调用 <code>and_then()</code> 将任何布尔值转换为任何其他类型。我们可以在组件中通过映射到某些元素来利用这个功能。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> show_title <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        show_title<span class="token punctuation">.</span><span class="token function">and_then</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n            <span class="token string">"这是文章标题"</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>我们可以用它做很多事情，再比如：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> user_name <span class="token operator">=</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        user_name<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>name<span class="token closure-punctuation punctuation">|</span></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span><span class="token string">"你好 {name}"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E7%A9%BA%E5%85%83%E7%B4%A0">空元素<a class="anchor" href="#%E7%A9%BA%E5%85%83%E7%B4%A0">§</a></h2>\n<p>有时候，你并不打算返回任何元素时，你可以直接返回一个 <code>None</code>，因为 <code>Element</code> 本质就是 <code>Option&lt;VNode&gt;</code> 的别名。\n所以说它支持你返回 <code>None</code> 这个空的值。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">demo</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token class-name">None</span>\n<span class="token punctuation">}</span>\n</code></pre>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u6761\u4EF6\u6E32\u67D3"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>组件往往需要在不同的情况下渲染不同的内容到页面上，页面的内容并不是一成不变的。\n我们常常需要根据不同的情况去渲染界面。</p>\n<h2 id="%E6%9C%89%E6%9D%A1%E4%BB%B6%E7%9A%84%E8%BF%94%E5%9B%9E%E5%85%83%E7%B4%A0">有条件的返回元素<a class="anchor" href="#%E6%9C%89%E6%9D%A1%E4%BB%B6%E7%9A%84%E8%BF%94%E5%9B%9E%E5%85%83%E7%B4%A0">§</a></h2>\n<p>在一些组件中，你可能需要在不同的判断语句下返回不同的 Element 元素，我们来完成一个简单的 Demo ：</p>\n<ul>\n<li>在线：显示应用页面</li>\n<li>离线：显示登陆页面</li>\n</ul>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props, PartialEq)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">AppProps</span> <span class="token punctuation">{</span>\n    logged_in<span class="token punctuation">:</span> <span class="token keyword">bool</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>我们在 <code>道具(Props)</code> 中定义了一个是否登陆的 Bool 值，它将用于判断我们的登陆状态。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">AppProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> props<span class="token punctuation">.</span>logged_in <span class="token punctuation">{</span>\n        cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n            <span class="token class-name">DashboardScreen</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n            <span class="token class-name">LoginScreen</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>在上方代码中，我们判断了道具中 <code>logged_in</code> 变量的状态，并返回了相应的自定义组件渲染。</p>\n<blockquote>\n<p>自定义组件将在后续内容中讲解到。</p>\n</blockquote>\n<h2 id="%E4%BD%BF%E7%94%A8%E5%8C%B9%E9%85%8D%E8%AF%AD%E5%8F%A5">使用匹配语句<a class="anchor" href="#%E4%BD%BF%E7%94%A8%E5%8C%B9%E9%85%8D%E8%AF%AD%E5%8F%A5">§</a></h2>\n<p>匹配语句其实和上面的判断方法很像，以下是大概的使用演示：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span><span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">match</span> <span class="token function">get_name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Ok</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">=></span> cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token string">"你好，{name}"</span> <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token class-name">Err</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token string">"对不起，我还不知道你的名字，因为出现错误了： {err}"</span> <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>如果你想让代码变得更加简洁，省略掉 <code>cx.render</code> 这一部分，你可以这样：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span><span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">match</span> <span class="token function">get_name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token string">"jack"</span> <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span>cx<span class="token punctuation">,</span> <span class="token string">"你好啊杰克，最近怎么样？"</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token string">"diane"</span> <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span>cx<span class="token punctuation">,</span> <span class="token string">"你好啊黛安娜，最近怎么样？"</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>\n        name <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span>cx<span class="token punctuation">,</span> <span class="token string">"你好：{name}"</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>为 <code>rsx!()</code> 在第一个参数处传递 cx 可以让宏自动调用 render 方法。</p>\n<h2 id="rsx-%E5%B5%8C%E5%A5%97">RSX 嵌套<a class="anchor" href="#rsx-%E5%B5%8C%E5%A5%97">§</a></h2>\n<p>我们可以在 <code>rsx!()</code> 中嵌套一个新的 <code>rsx!()</code>，类似于这样：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        <span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n            <span class="token string">"more rsx!"</span>\n        <span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>也可以将它们分开调用（比如保存到一个变量值中）：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> title <span class="token operator">=</span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token string">"more rsx!"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        title\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>如果我们希望条件运行后的结果同时包含一个 <strong>头组件</strong> 和 <strong>尾组件</strong>，那这对我们来说很有用：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> screen <span class="token operator">=</span> <span class="token keyword">match</span> logged_in <span class="token punctuation">{</span>\n    <span class="token boolean">true</span> <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span><span class="token class-name">DashboardScreen</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token boolean">false</span> <span class="token operator">=></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span><span class="token class-name">LoginScreen</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\ncx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n    <span class="token class-name">Navbar</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n    screen<span class="token punctuation">,</span>\n    <span class="token class-name">Footer</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E5%B8%83%E5%B0%94%E6%98%A0%E5%B0%84">布尔映射<a class="anchor" href="#%E5%B8%83%E5%B0%94%E6%98%A0%E5%B0%84">§</a></h2>\n<p>我们建议您尝试有条件地 隐藏/显示 一个元素时使用 “布尔映射” 模式。</p>\n<p>Rust 允许您通过调用 <code>and_then()</code> 将任何布尔值转换为任何其他类型。我们可以在组件中通过映射到某些元素来利用这个功能。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> show_title <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        show_title<span class="token punctuation">.</span><span class="token function">and_then</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n            <span class="token string">"这是文章标题"</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>我们可以用它做很多事情，再比如：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> user_name <span class="token operator">=</span> <span class="token class-name">Some</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        user_name<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>name<span class="token closure-punctuation punctuation">|</span></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span><span class="token string">"你好 {name}"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E7%A9%BA%E5%85%83%E7%B4%A0">空元素<a class="anchor" href="#%E7%A9%BA%E5%85%83%E7%B4%A0">§</a></h2>\n<p>有时候，你并不打算返回任何元素时，你可以直接返回一个 <code>None</code>，因为 <code>Element</code> 本质就是 <code>Option&lt;VNode&gt;</code> 的别名。\n所以说它支持你返回 <code>None</code> 这个空的值。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">demo</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token class-name">None</span>\n<span class="token punctuation">}</span>\n</code></pre>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E6%9C%89%E6%9D%A1%E4%BB%B6%E7%9A%84%E8%BF%94%E5%9B%9E%E5%85%83%E7%B4%A0" }, "\u6709\u6761\u4EF6\u7684\u8FD4\u56DE\u5143\u7D20")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BD%BF%E7%94%A8%E5%8C%B9%E9%85%8D%E8%AF%AD%E5%8F%A5" }, "\u4F7F\u7528\u5339\u914D\u8BED\u53E5")),
            React.createElement("li", null,
                React.createElement("a", { href: "#rsx-%E5%B5%8C%E5%A5%97" }, "RSX \u5D4C\u5957")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%B8%83%E5%B0%94%E6%98%A0%E5%B0%84" }, "\u5E03\u5C14\u6620\u5C04")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E7%A9%BA%E5%85%83%E7%B4%A0" }, "\u7A7A\u5143\u7D20")))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-01-13T14:07:17.000Z",
    'updated': null,
    'excerpt': "组件往往需要在不同的情况下渲染不同的内容到页面上，页面的内容并不是一成不变的。 我们常常需要根据不同的情况去渲染界面。 有条件的返回元素 在一些组件中，你可能需要在不同的判断语句下返回不同的 Element 元素，我们来完...",
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
                }
            ]
        }
    ]
};
