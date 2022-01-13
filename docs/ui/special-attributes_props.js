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
            __html: '<h1>特殊属性</h1>\n<p>在这一章节中，我们需要了解 Dioxus 的特殊类型：</p>\n<ul>\n<li>dangerous_inner_html</li>\n<li>boolean attributes</li>\n<li>prevent_default</li>\n<li>..attributes</li>\n<li>event handlers as string attributes</li>\n<li>value checked and selected</li>\n</ul>\n<h2 id="%E5%8E%9F%E7%94%9Fhtml">原生HTML<a class="anchor" href="#%E5%8E%9F%E7%94%9Fhtml">§</a></h2>\n<p>在 React 中，我们可以直接返回一段原生的 HTML/CSS/JS 代码到渲染器中，\n而在 Dioxus 中我们使用 <code>dangerous_inner_html</code> 也能完成这一点。</p>\n<p>比如说，我们希望被 <code>Markdown</code> 转换后的 <code>post.html</code> 能直接内嵌到 <code>Dioxus</code> 应用中。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">BlogPost</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> contents <span class="token operator">=</span> <span class="token macro property">include_str!</span><span class="token punctuation">(</span><span class="token string">"../post.html"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        div <span class="token punctuation">{</span>\n            class<span class="token punctuation">:</span> <span class="token string">"markdown"</span><span class="token punctuation">,</span>\n            dangerous_inner_html<span class="token punctuation">:</span> <span class="token string">"{contents}"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>上方代码就相当于直接把 HTML 代码写入到这个 div 中去了。</p>\n<blockquote>\n<p>请一定要注意：<code>dangerous_inner_html</code> 的使用非常危险，因为它无法直接的防止注入攻击（XSS）所以说，请确保您传入的 HTML 是安全的。\n否则直接使用所造成的问题是不可逆的，它非常危险！！</p>\n</blockquote>'
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
            __html: '<p>在这一章节中，我们需要了解 Dioxus 的特殊类型：</p>\n<ul>\n<li>dangerous_inner_html</li>\n<li>boolean attributes</li>\n<li>prevent_default</li>\n<li>..attributes</li>\n<li>event handlers as string attributes</li>\n<li>value checked and selected</li>\n</ul>\n<h2 id="%E5%8E%9F%E7%94%9Fhtml">原生HTML<a class="anchor" href="#%E5%8E%9F%E7%94%9Fhtml">§</a></h2>\n<p>在 React 中，我们可以直接返回一段原生的 HTML/CSS/JS 代码到渲染器中，\n而在 Dioxus 中我们使用 <code>dangerous_inner_html</code> 也能完成这一点。</p>\n<p>比如说，我们希望被 <code>Markdown</code> 转换后的 <code>post.html</code> 能直接内嵌到 <code>Dioxus</code> 应用中。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">BlogPost</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> contents <span class="token operator">=</span> <span class="token macro property">include_str!</span><span class="token punctuation">(</span><span class="token string">"../post.html"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        div <span class="token punctuation">{</span>\n            class<span class="token punctuation">:</span> <span class="token string">"markdown"</span><span class="token punctuation">,</span>\n            dangerous_inner_html<span class="token punctuation">:</span> <span class="token string">"{contents}"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>上方代码就相当于直接把 HTML 代码写入到这个 div 中去了。</p>\n<blockquote>\n<p>请一定要注意：<code>dangerous_inner_html</code> 的使用非常危险，因为它无法直接的防止注入攻击（XSS）所以说，请确保您传入的 HTML 是安全的。\n否则直接使用所造成的问题是不可逆的，它非常危险！！</p>\n</blockquote>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%8E%9F%E7%94%9Fhtml" }, "\u539F\u751FHTML")))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-01-13T16:06:02.000Z",
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
