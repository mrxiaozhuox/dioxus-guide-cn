import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/ui/special-attributes.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/ui/special-attributes.html",
    'title': "特殊属性",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>特殊属性</h1>\n<p>在这一章节中，我们需要了解 Dioxus 的特殊类型：</p>\n<ul>\n<li>dangerous_inner_html</li>\n<li>boolean attributes</li>\n<li>prevent_default</li>\n<li>..attributes</li>\n<li>event handlers as string attributes</li>\n<li>value checked and selected</li>\n</ul>\n<h2 id="%E5%8E%9F%E7%94%9Fhtml">原生HTML<a class="anchor" href="#%E5%8E%9F%E7%94%9Fhtml">§</a></h2>\n<p>在 React 中，我们可以直接返回一段原生的 HTML/CSS/JS 代码到渲染器中，\n而在 Dioxus 中我们使用 <code>dangerous_inner_html</code> 也能完成这一点。</p>\n<p>比如说，我们希望被 <code>Markdown</code> 转换后的 <code>post.html</code> 能直接内嵌到 <code>Dioxus</code> 应用中。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">BlogPost</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> contents <span class="token operator">=</span> <span class="token macro property">include_str!</span><span class="token punctuation">(</span><span class="token string">"../post.html"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        div <span class="token punctuation">{</span>\n            class<span class="token punctuation">:</span> <span class="token string">"markdown"</span><span class="token punctuation">,</span>\n            dangerous_inner_html<span class="token punctuation">:</span> <span class="token string">"{contents}"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>上方代码就相当于直接把 HTML 代码写入到这个 div 中去了。</p>\n<blockquote>\n<p>请一定要注意：<code>dangerous_inner_html</code> 的使用非常危险，因为它无法直接的防止注入攻击（XSS）所以说，请确保您传入的 HTML 是安全的。\n否则直接使用所造成的问题是不可逆的，它非常危险！！</p>\n</blockquote>\n<h2 id="%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7">布尔属性<a class="anchor" href="#%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7">§</a></h2>\n<p>大多数属性都是 <code>K = V</code> 的结构，但是 HTML 中也有一些特殊的属性，它们的值为 Boolean 类型。\n比如说我们最常用的 hidden 属性，它会隐藏这个标签的显示。比如说这样的一个 Demo 代码：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n    div <span class="token punctuation">{</span>\n        hidden<span class="token punctuation">:</span> <span class="token string">"false"</span><span class="token punctuation">,</span>\n        <span class="token string">"hello"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>它的 HTML 结果为：</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span> \n</code></pre>\n<p>最终并不会包含 <code>hidden</code> 属性，因为它的值为 <code>false</code>，除了 <code>false</code> 的所有值都为 <code>true</code> 。</p>\n<p>以下是我们整理出的 Boolean 属性列表（只有它们支持 Boolean 设置）：</p>\n<ul>\n<li>allowfullscreen</li>\n<li>allowpaymentrequest</li>\n<li>async</li>\n<li>autofocus</li>\n<li>autoplay</li>\n<li>checked</li>\n<li>controls</li>\n<li>default</li>\n<li>defer</li>\n<li>disabled</li>\n<li>formnovalidate</li>\n<li>hidden</li>\n<li>ismap</li>\n<li>itemscope</li>\n<li>loop</li>\n<li>multiple</li>\n<li>muted</li>\n<li>nomodule</li>\n<li>novalidate</li>\n<li>open</li>\n<li>playsinline</li>\n<li>readonly</li>\n<li>required</li>\n<li>reversed</li>\n<li>selected</li>\n<li>truespeed</li>\n</ul>\n<p>对于任何其他属性，<code>false</code> 的值将被直接发送到 DOM。</p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u7279\u6B8A\u5C5E\u6027"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>在这一章节中，我们需要了解 Dioxus 的特殊类型：</p>\n<ul>\n<li>dangerous_inner_html</li>\n<li>boolean attributes</li>\n<li>prevent_default</li>\n<li>..attributes</li>\n<li>event handlers as string attributes</li>\n<li>value checked and selected</li>\n</ul>\n<h2 id="%E5%8E%9F%E7%94%9Fhtml">原生HTML<a class="anchor" href="#%E5%8E%9F%E7%94%9Fhtml">§</a></h2>\n<p>在 React 中，我们可以直接返回一段原生的 HTML/CSS/JS 代码到渲染器中，\n而在 Dioxus 中我们使用 <code>dangerous_inner_html</code> 也能完成这一点。</p>\n<p>比如说，我们希望被 <code>Markdown</code> 转换后的 <code>post.html</code> 能直接内嵌到 <code>Dioxus</code> 应用中。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">BlogPost</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> contents <span class="token operator">=</span> <span class="token macro property">include_str!</span><span class="token punctuation">(</span><span class="token string">"../post.html"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        div <span class="token punctuation">{</span>\n            class<span class="token punctuation">:</span> <span class="token string">"markdown"</span><span class="token punctuation">,</span>\n            dangerous_inner_html<span class="token punctuation">:</span> <span class="token string">"{contents}"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>上方代码就相当于直接把 HTML 代码写入到这个 div 中去了。</p>\n<blockquote>\n<p>请一定要注意：<code>dangerous_inner_html</code> 的使用非常危险，因为它无法直接的防止注入攻击（XSS）所以说，请确保您传入的 HTML 是安全的。\n否则直接使用所造成的问题是不可逆的，它非常危险！！</p>\n</blockquote>\n<h2 id="%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7">布尔属性<a class="anchor" href="#%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7">§</a></h2>\n<p>大多数属性都是 <code>K = V</code> 的结构，但是 HTML 中也有一些特殊的属性，它们的值为 Boolean 类型。\n比如说我们最常用的 hidden 属性，它会隐藏这个标签的显示。比如说这样的一个 Demo 代码：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n    div <span class="token punctuation">{</span>\n        hidden<span class="token punctuation">:</span> <span class="token string">"false"</span><span class="token punctuation">,</span>\n        <span class="token string">"hello"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>它的 HTML 结果为：</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span> \n</code></pre>\n<p>最终并不会包含 <code>hidden</code> 属性，因为它的值为 <code>false</code>，除了 <code>false</code> 的所有值都为 <code>true</code> 。</p>\n<p>以下是我们整理出的 Boolean 属性列表（只有它们支持 Boolean 设置）：</p>\n<ul>\n<li>allowfullscreen</li>\n<li>allowpaymentrequest</li>\n<li>async</li>\n<li>autofocus</li>\n<li>autoplay</li>\n<li>checked</li>\n<li>controls</li>\n<li>default</li>\n<li>defer</li>\n<li>disabled</li>\n<li>formnovalidate</li>\n<li>hidden</li>\n<li>ismap</li>\n<li>itemscope</li>\n<li>loop</li>\n<li>multiple</li>\n<li>muted</li>\n<li>nomodule</li>\n<li>novalidate</li>\n<li>open</li>\n<li>playsinline</li>\n<li>readonly</li>\n<li>required</li>\n<li>reversed</li>\n<li>selected</li>\n<li>truespeed</li>\n</ul>\n<p>对于任何其他属性，<code>false</code> 的值将被直接发送到 DOM。</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%8E%9F%E7%94%9Fhtml" }, "\u539F\u751FHTML")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7" }, "\u5E03\u5C14\u5C5E\u6027")))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-01-13T23:13:19.000Z",
    'updated': null,
    'excerpt': "在这一章节中，我们需要了解 Dioxus 的特殊类型： - dangerous_inner_html - boolean attributes - prevent_default - ..attributes - event handlers as string attributes - value checked and selected 原生HTML 在 React 中...",
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
        }
    ]
};
