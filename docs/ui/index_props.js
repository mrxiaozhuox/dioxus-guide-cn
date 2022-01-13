import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/ui/README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/ui/index.html",
    'title': "核心主题",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>核心主题</h1>\n<blockquote>\n<p>这将是非常重要的一个章节，我们将讨论 UI 的构建与设计</p>\n</blockquote>\n<p>通过这章的学习，我们将学会如何通过 <code>Dioxus</code> 构建一个漂亮的 UI 界面！这一定很酷！</p>\n<h2 id="%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2">声明式用户界面<a class="anchor" href="#%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2">§</a></h2>\n<p>Dioxus 是一个 声明式框架，这意味着我们不需要手动的 <em>创建</em> 元素和手动 <em>设置</em> 元素信息（通过函数调用）。\n我们只需要对我们想要的样式进行简单声明，其他的 Dioxus 会帮我们搞定的！</p>\n<p>假设我们需要一个显示红绿灯的程序，它有 红 黄 绿 三种状态，在 命令式 程序中，我们生成它会非常繁琐：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> container <span class="token operator">=</span> <span class="token class-name">Container</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> green_light <span class="token operator">=</span> <span class="token class-name">Light</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">"green"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> yellow_light <span class="token operator">=</span> <span class="token class-name">Light</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">"yellow"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> red_light <span class="token operator">=</span> <span class="token class-name">Light</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">"red"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncontainer<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>green_light<span class="token punctuation">)</span><span class="token punctuation">;</span>\ncontainer<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>yellow_light<span class="token punctuation">)</span><span class="token punctuation">;</span>\ncontainer<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>red_light<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncontainer<span class="token punctuation">.</span><span class="token function">set_onclick</span><span class="token punctuation">(</span><span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> red_light<span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        red_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        green_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> yellow_light<span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        yellow_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        red_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> green_light<span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        green_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        yellow_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>它的可读性简直糟透了，不知道几年后再来看看这个代码是什么感受qwq</p>\n<p>如果我们使用 Dioxus 框架来完成这个程序，则只需要：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> <span class="token keyword">mut</span> state <span class="token operator">=</span> <span class="token function">use_state</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cx<span class="token punctuation">,</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token string">"red"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Container</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Light</span> <span class="token punctuation">{</span> color<span class="token punctuation">:</span> <span class="token string">"red"</span><span class="token punctuation">,</span> enabled<span class="token punctuation">:</span> state <span class="token operator">==</span> <span class="token string">"red"</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>\n        <span class="token class-name">Light</span> <span class="token punctuation">{</span> color<span class="token punctuation">:</span> <span class="token string">"yellow"</span><span class="token punctuation">,</span> enabled<span class="token punctuation">:</span> state <span class="token operator">==</span> <span class="token string">"yellow"</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>\n        <span class="token class-name">Light</span> <span class="token punctuation">{</span> color<span class="token punctuation">:</span> <span class="token string">"green"</span><span class="token punctuation">,</span> enabled<span class="token punctuation">:</span> state <span class="token operator">==</span> <span class="token string">"green"</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>\n\n        onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>\n            state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">match</span> <span class="token operator">*</span>state <span class="token punctuation">{</span>\n                <span class="token string">"green"</span> <span class="token operator">=></span> <span class="token string">"yellow"</span><span class="token punctuation">,</span>\n                <span class="token string">"yellow"</span> <span class="token operator">=></span> <span class="token string">"red"</span><span class="token punctuation">,</span>\n                <span class="token string">"red"</span> <span class="token operator">=></span> <span class="token string">"green"</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre>\n<p>这个代码比上面的清晰了不少吧，我们一眼就能看出这程序在做什么，以及能大概想象到渲染出来会是什么样子。</p>\n<p><strong>注意</strong>：这个概念并不新奇！许多框架都是声明性的—— React 则是其中最流行的。使用声明式框架往往比使用命令式框架更令人愉快。</p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u6838\u5FC3\u4E3B\u9898"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<blockquote>\n<p>这将是非常重要的一个章节，我们将讨论 UI 的构建与设计</p>\n</blockquote>\n<p>通过这章的学习，我们将学会如何通过 <code>Dioxus</code> 构建一个漂亮的 UI 界面！这一定很酷！</p>\n<h2 id="%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2">声明式用户界面<a class="anchor" href="#%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2">§</a></h2>\n<p>Dioxus 是一个 声明式框架，这意味着我们不需要手动的 <em>创建</em> 元素和手动 <em>设置</em> 元素信息（通过函数调用）。\n我们只需要对我们想要的样式进行简单声明，其他的 Dioxus 会帮我们搞定的！</p>\n<p>假设我们需要一个显示红绿灯的程序，它有 红 黄 绿 三种状态，在 命令式 程序中，我们生成它会非常繁琐：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> container <span class="token operator">=</span> <span class="token class-name">Container</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> green_light <span class="token operator">=</span> <span class="token class-name">Light</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">"green"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> yellow_light <span class="token operator">=</span> <span class="token class-name">Light</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">"yellow"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> red_light <span class="token operator">=</span> <span class="token class-name">Light</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">color</span><span class="token punctuation">(</span><span class="token string">"red"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncontainer<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>green_light<span class="token punctuation">)</span><span class="token punctuation">;</span>\ncontainer<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>yellow_light<span class="token punctuation">)</span><span class="token punctuation">;</span>\ncontainer<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>red_light<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncontainer<span class="token punctuation">.</span><span class="token function">set_onclick</span><span class="token punctuation">(</span><span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> red_light<span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        red_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        green_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> yellow_light<span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        yellow_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        red_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> green_light<span class="token punctuation">.</span><span class="token function">enabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        green_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        yellow_light<span class="token punctuation">.</span><span class="token function">set_enabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>它的可读性简直糟透了，不知道几年后再来看看这个代码是什么感受qwq</p>\n<p>如果我们使用 Dioxus 框架来完成这个程序，则只需要：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> <span class="token keyword">mut</span> state <span class="token operator">=</span> <span class="token function">use_state</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cx<span class="token punctuation">,</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token string">"red"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    <span class="token class-name">Container</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Light</span> <span class="token punctuation">{</span> color<span class="token punctuation">:</span> <span class="token string">"red"</span><span class="token punctuation">,</span> enabled<span class="token punctuation">:</span> state <span class="token operator">==</span> <span class="token string">"red"</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>\n        <span class="token class-name">Light</span> <span class="token punctuation">{</span> color<span class="token punctuation">:</span> <span class="token string">"yellow"</span><span class="token punctuation">,</span> enabled<span class="token punctuation">:</span> state <span class="token operator">==</span> <span class="token string">"yellow"</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>\n        <span class="token class-name">Light</span> <span class="token punctuation">{</span> color<span class="token punctuation">:</span> <span class="token string">"green"</span><span class="token punctuation">,</span> enabled<span class="token punctuation">:</span> state <span class="token operator">==</span> <span class="token string">"green"</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>\n\n        onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>\n            state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">match</span> <span class="token operator">*</span>state <span class="token punctuation">{</span>\n                <span class="token string">"green"</span> <span class="token operator">=></span> <span class="token string">"yellow"</span><span class="token punctuation">,</span>\n                <span class="token string">"yellow"</span> <span class="token operator">=></span> <span class="token string">"red"</span><span class="token punctuation">,</span>\n                <span class="token string">"red"</span> <span class="token operator">=></span> <span class="token string">"green"</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre>\n<p>这个代码比上面的清晰了不少吧，我们一眼就能看出这程序在做什么，以及能大概想象到渲染出来会是什么样子。</p>\n<p><strong>注意</strong>：这个概念并不新奇！许多框架都是声明性的—— React 则是其中最流行的。使用声明式框架往往比使用命令式框架更令人愉快。</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2" }, "\u58F0\u660E\u5F0F\u7528\u6237\u754C\u9762")))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-01-13T14:07:17.000Z",
    'updated': null,
    'excerpt': "通过这章的学习，我们将学会如何通过 Dioxus 构建一个漂亮的 UI 界面！这一定很酷！ 声明式用户界面 Dioxus 是一个 声明式框架，这意味着我们不需要手动的 创建 元素和手动 设置 元素信息（通过函数调用）。 我们只需要对我们想...",
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
