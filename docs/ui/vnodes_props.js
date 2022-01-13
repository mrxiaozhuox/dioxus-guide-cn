import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/ui/vnodes.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/ui/vnodes.html",
    'title': "使用元素声明UI",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>使用元素声明UI</h1>\n<p>每一个 用户UI 都是由多个元素交叉组织而成，一堆堆元素组成了一切复杂的应用程序界面。\n在 Dioxus 中，我们可以使用组件来包装元素，再将组件当成一个更到的元素。\n这样一层一层的包裹，便形成了最终的应用程序！</p>\n<h2 id="%E5%A3%B0%E6%98%8E%E5%85%83%E7%B4%A0">声明元素<a class="anchor" href="#%E5%A3%B0%E6%98%8E%E5%85%83%E7%B4%A0">§</a></h2>\n<p>Dioxus 基于 HTML\CSS 渲染器，所以说我们可以直接使用 HTML 所支持的所有标签，我们需要将声明包含在 <code>rsx!()</code> 宏中：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>或者使用 <code>Dioxus-SSR</code> 直接获取有效的 HTML 元素：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token namespace">dioxus<span class="token punctuation">::</span>ssr<span class="token punctuation">::</span></span><span class="token function">render_lazy</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre>\n<p>它的结果为：（这就是一个HTML标签）</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n</code></pre>\n<p>我们可以使用 <code>$tag_name {}</code> 生成任何一个有效的 HTML 标签。</p>\n<h2 id="%E7%BC%96%E6%8E%92%E5%85%83%E7%B4%A0">编排元素<a class="anchor" href="#%E7%BC%96%E6%8E%92%E5%85%83%E7%B4%A0">§</a></h2>\n<p>当然，我们也可以像 HTML 一样在元素中嵌入其他子元素，它非常简单：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        h1 <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        h2 <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        p <span class="token punctuation">{</span><span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>它会渲染为这样的 HTML 代码：</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n</code></pre>\n<p>这看起来很酷！我们可以用它来直接构建我们想要的 UI 结构了！</p>\n<h2 id="%E5%85%83%E7%B4%A0%E6%96%87%E6%9C%AC">元素文本<a class="anchor" href="#%E5%85%83%E7%B4%A0%E6%96%87%E6%9C%AC">§</a></h2>\n<p>光有元素标签可远远不够，我们还需要在元素中加入一些文本吧：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        h1 <span class="token punctuation">{</span> <span class="token string">"标题"</span> <span class="token punctuation">}</span>\n        p <span class="token punctuation">{</span> <span class="token string">"一些文本内容"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>文本往往不可能一成不变，因为我们需要动态应用，而不是定义好的内容！</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">"mrxiaozhuox"</span><span class="token punctuation">;</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span><span class="token string">"hello {name}"</span><span class="token punctuation">)</span>\n</code></pre>\n<p>上方代码会将 <code>name</code> 内容绑定到内容 <code>{name}</code> 中，类似于 Rust 的 <code>format!(&quot;{}&quot;, &quot;hi&quot;);</code></p>\n<p>但是您不能在字符串内部进行任何逻辑判断，或者完成调用方法之类的操作。但是我们可以使用：<code>format_args!()</code></p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token punctuation">{</span><span class="token macro property">format_args!</span><span class="token punctuation">(</span><span class="token string">"Hello {}"</span><span class="token punctuation">,</span> <span class="token keyword">if</span> enabled <span class="token punctuation">{</span> <span class="token string">"Jack"</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token string">"Bob"</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">)</span>\n</code></pre>\n<p>或者这样进行字符串拼接：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token string">"Hello "</span><span class="token punctuation">,</span>  <span class="token punctuation">[</span><span class="token keyword">if</span> enabled <span class="token punctuation">{</span> <span class="token string">"Jack"</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token string">"Bob"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span> <span class="token punctuation">)</span>\n</code></pre>\n<p>但是我们建议您在 <code>rsx!()</code> 外将字符串处理好，再输入到元素中。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token keyword">if</span> enabled <span class="token punctuation">{</span> <span class="token string">"Jack"</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token string">"Bob"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token macro property">rsx!</span> <span class="token punctuation">(</span> <span class="token string">"hello {name}"</span> <span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E5%85%83%E7%B4%A0%E5%B1%9E%E6%80%A7">元素属性<a class="anchor" href="#%E5%85%83%E7%B4%A0%E5%B1%9E%E6%80%A7">§</a></h2>\n<p>除了渲染的文本，HTML 元素中还可以设置很多自定义属性（这非常重要）</p>\n<p>在 Dioxus 中，声明元素属性的方法也非常的简洁：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        hidden<span class="token punctuation">:</span> <span class="token string">"true"</span><span class="token punctuation">,</span>\n        background_color<span class="token punctuation">:</span> <span class="token string">"blue"</span><span class="token punctuation">,</span>\n        class<span class="token punctuation">:</span> <span class="token string">"card color-{mycolor}"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>我们在所有元素标签内部定义了它们常用的属性，这样你在定义时可以防止拼写错误，同时还很方便。\n但是如果你想向元素加入一个 <code>Dioxus-HTML</code> 相应元素标签中未声明的属性时，你可以这么做：</p>\n<pre class="language-autoit"><code class="language-autoit">rsx!<span class="token punctuation">(</span>\n    div {\n        <span class="token string">"customAttr"</span><span class="token punctuation">:</span> <span class="token string">"这是一个自定义属性"</span>\n    }\n<span class="token punctuation">)</span>\n</code></pre>\n<blockquote>\n<p>注：如果一个属性是常用的，请向我们发起 Issue 并告知这个 <code>Attrbuite</code> 是需要的！</p>\n</blockquote>\n<p>任何属性必须放置在 <code>内容</code> 和 <code>子元素</code> 之前：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token comment">// 正确的示例</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        background_color<span class="token punctuation">:</span> <span class="token string">"blue"</span><span class="token punctuation">,</span>\n        <span class="token string">"hello world"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n\n<span class="token comment">// 错误的示例</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        <span class="token string">"hello world"</span>\n        background_color<span class="token punctuation">:</span> <span class="token string">"blue"</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E7%9B%91%E5%90%AC%E5%99%A8">监听器<a class="anchor" href="#%E7%9B%91%E5%90%AC%E5%99%A8">§</a></h2>\n<p>元素监听器是一种特殊的属性，它接受一个闭包函数（回调函数），当事件发生时，回调函数会被调用。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token namespace">log<span class="token punctuation">::</span></span><span class="token macro property">debug!</span><span class="token punctuation">(</span><span class="token string">"div clicked!"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>我们将在后面的章节中着重讲解这方面的内容。</p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u4F7F\u7528\u5143\u7D20\u58F0\u660EUI"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>每一个 用户UI 都是由多个元素交叉组织而成，一堆堆元素组成了一切复杂的应用程序界面。\n在 Dioxus 中，我们可以使用组件来包装元素，再将组件当成一个更到的元素。\n这样一层一层的包裹，便形成了最终的应用程序！</p>\n<h2 id="%E5%A3%B0%E6%98%8E%E5%85%83%E7%B4%A0">声明元素<a class="anchor" href="#%E5%A3%B0%E6%98%8E%E5%85%83%E7%B4%A0">§</a></h2>\n<p>Dioxus 基于 HTML\CSS 渲染器，所以说我们可以直接使用 HTML 所支持的所有标签，我们需要将声明包含在 <code>rsx!()</code> 宏中：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>或者使用 <code>Dioxus-SSR</code> 直接获取有效的 HTML 元素：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token namespace">dioxus<span class="token punctuation">::</span>ssr<span class="token punctuation">::</span></span><span class="token function">render_lazy</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre>\n<p>它的结果为：（这就是一个HTML标签）</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n</code></pre>\n<p>我们可以使用 <code>$tag_name {}</code> 生成任何一个有效的 HTML 标签。</p>\n<h2 id="%E7%BC%96%E6%8E%92%E5%85%83%E7%B4%A0">编排元素<a class="anchor" href="#%E7%BC%96%E6%8E%92%E5%85%83%E7%B4%A0">§</a></h2>\n<p>当然，我们也可以像 HTML 一样在元素中嵌入其他子元素，它非常简单：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        h1 <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        h2 <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        p <span class="token punctuation">{</span><span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>它会渲染为这样的 HTML 代码：</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n</code></pre>\n<p>这看起来很酷！我们可以用它来直接构建我们想要的 UI 结构了！</p>\n<h2 id="%E5%85%83%E7%B4%A0%E6%96%87%E6%9C%AC">元素文本<a class="anchor" href="#%E5%85%83%E7%B4%A0%E6%96%87%E6%9C%AC">§</a></h2>\n<p>光有元素标签可远远不够，我们还需要在元素中加入一些文本吧：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        h1 <span class="token punctuation">{</span> <span class="token string">"标题"</span> <span class="token punctuation">}</span>\n        p <span class="token punctuation">{</span> <span class="token string">"一些文本内容"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>文本往往不可能一成不变，因为我们需要动态应用，而不是定义好的内容！</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">"mrxiaozhuox"</span><span class="token punctuation">;</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span><span class="token string">"hello {name}"</span><span class="token punctuation">)</span>\n</code></pre>\n<p>上方代码会将 <code>name</code> 内容绑定到内容 <code>{name}</code> 中，类似于 Rust 的 <code>format!(&quot;{}&quot;, &quot;hi&quot;);</code></p>\n<p>但是您不能在字符串内部进行任何逻辑判断，或者完成调用方法之类的操作。但是我们可以使用：<code>format_args!()</code></p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token punctuation">{</span><span class="token macro property">format_args!</span><span class="token punctuation">(</span><span class="token string">"Hello {}"</span><span class="token punctuation">,</span> <span class="token keyword">if</span> enabled <span class="token punctuation">{</span> <span class="token string">"Jack"</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token string">"Bob"</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">)</span>\n</code></pre>\n<p>或者这样进行字符串拼接：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span> <span class="token string">"Hello "</span><span class="token punctuation">,</span>  <span class="token punctuation">[</span><span class="token keyword">if</span> enabled <span class="token punctuation">{</span> <span class="token string">"Jack"</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token string">"Bob"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span> <span class="token punctuation">)</span>\n</code></pre>\n<p>但是我们建议您在 <code>rsx!()</code> 外将字符串处理好，再输入到元素中。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token keyword">if</span> enabled <span class="token punctuation">{</span> <span class="token string">"Jack"</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token string">"Bob"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token macro property">rsx!</span> <span class="token punctuation">(</span> <span class="token string">"hello {name}"</span> <span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E5%85%83%E7%B4%A0%E5%B1%9E%E6%80%A7">元素属性<a class="anchor" href="#%E5%85%83%E7%B4%A0%E5%B1%9E%E6%80%A7">§</a></h2>\n<p>除了渲染的文本，HTML 元素中还可以设置很多自定义属性（这非常重要）</p>\n<p>在 Dioxus 中，声明元素属性的方法也非常的简洁：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        hidden<span class="token punctuation">:</span> <span class="token string">"true"</span><span class="token punctuation">,</span>\n        background_color<span class="token punctuation">:</span> <span class="token string">"blue"</span><span class="token punctuation">,</span>\n        class<span class="token punctuation">:</span> <span class="token string">"card color-{mycolor}"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>我们在所有元素标签内部定义了它们常用的属性，这样你在定义时可以防止拼写错误，同时还很方便。\n但是如果你想向元素加入一个 <code>Dioxus-HTML</code> 相应元素标签中未声明的属性时，你可以这么做：</p>\n<pre class="language-autoit"><code class="language-autoit">rsx!<span class="token punctuation">(</span>\n    div {\n        <span class="token string">"customAttr"</span><span class="token punctuation">:</span> <span class="token string">"这是一个自定义属性"</span>\n    }\n<span class="token punctuation">)</span>\n</code></pre>\n<blockquote>\n<p>注：如果一个属性是常用的，请向我们发起 Issue 并告知这个 <code>Attrbuite</code> 是需要的！</p>\n</blockquote>\n<p>任何属性必须放置在 <code>内容</code> 和 <code>子元素</code> 之前：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token comment">// 正确的示例</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        background_color<span class="token punctuation">:</span> <span class="token string">"blue"</span><span class="token punctuation">,</span>\n        <span class="token string">"hello world"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n\n<span class="token comment">// 错误的示例</span>\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        <span class="token string">"hello world"</span>\n        background_color<span class="token punctuation">:</span> <span class="token string">"blue"</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<h2 id="%E7%9B%91%E5%90%AC%E5%99%A8">监听器<a class="anchor" href="#%E7%9B%91%E5%90%AC%E5%99%A8">§</a></h2>\n<p>元素监听器是一种特殊的属性，它接受一个闭包函数（回调函数），当事件发生时，回调函数会被调用。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token namespace">log<span class="token punctuation">::</span></span><span class="token macro property">debug!</span><span class="token punctuation">(</span><span class="token string">"div clicked!"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>我们将在后面的章节中着重讲解这方面的内容。</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%A3%B0%E6%98%8E%E5%85%83%E7%B4%A0" }, "\u58F0\u660E\u5143\u7D20")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E7%BC%96%E6%8E%92%E5%85%83%E7%B4%A0" }, "\u7F16\u6392\u5143\u7D20")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%85%83%E7%B4%A0%E6%96%87%E6%9C%AC" }, "\u5143\u7D20\u6587\u672C")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%85%83%E7%B4%A0%E5%B1%9E%E6%80%A7" }, "\u5143\u7D20\u5C5E\u6027")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E7%9B%91%E5%90%AC%E5%99%A8" }, "\u76D1\u542C\u5668")))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-01-13T14:07:17.000Z",
    'updated': null,
    'excerpt': "每一个 用户UI 都是由多个元素交叉组织而成，一堆堆元素组成了一切复杂的应用程序界面。 在 Dioxus 中，我们可以使用组件来包装元素，再将组件当成一个更到的元素。 这样一层一层的包裹，便形成了最终的应用程序！ 声明元素 Di...",
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
