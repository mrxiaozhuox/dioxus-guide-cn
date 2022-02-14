import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "介绍 - Dioxus",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>介绍 - Dioxus</h1>\n<p><img src="https://dioxuslabs.com/guide/images/dioxuslogo_full.png" alt="DIOXUS_LOGO"></p>\n<p><strong>Dioxus</strong> 是一款用于构建跨平台用户界面的框架（生态系统），它使用 Rust 编程语言。\n这本指南将带领你学习并使用它。（我们会尝试在 网页端、移动端、桌面端 使用 Dixous 框架）</p>\n<ul>\n<li>Dioxus 中文社区 [ QQ群 ]：863409183</li>\n</ul>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> <span class="token punctuation">(</span>count<span class="token punctuation">,</span> set_count<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">use_state</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cx<span class="token punctuation">,</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        h1 <span class="token punctuation">{</span> <span class="token string">"High-Five counter: {count}"</span> <span class="token punctuation">}</span>\n        button <span class="token punctuation">{</span> onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token function">set_count</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Up high!"</span> <span class="token punctuation">}</span>\n        button <span class="token punctuation">{</span> onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token function">set_count</span><span class="token punctuation">(</span>count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Down low!"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p>Dioxus 与 React 有许多的相似之处，如果本指南中有任何未阐述清楚的概念，你可以前往 React 文档中查询。\n我们致力于在 Rust 生态环境中构建一个令人熟悉的UI框架，如果你已经熟悉 React 了，那么 Dioxus 将对你来说非常的简单！\n（如果你是新手，这本指南同样适合你哦qwq）</p>\n<h2 id="%E5%A4%9A%E5%B9%B3%E5%8F%B0">多平台<a class="anchor" href="#%E5%A4%9A%E5%B9%B3%E5%8F%B0">§</a></h2>\n<p><code>Dioxus</code> 是一个支持多平台的开发包，这意味着它的核心代码可以在任何平台下被使用。\n与许多其他 Rust 前端工具包不同，Dioxus 与 Web-Sys 并没有本质上的联系。\n事实上，每个元素和事件监听器都可以在编译时被更改。</p>\n<p>目前为止，我们拥有以下渲染器：</p>\n<ul>\n<li>WebSys (为 WASM 提供)</li>\n<li>Tao/Tokio (为桌面端提供)</li>\n<li>Tao/Tokio (为移动端提供)</li>\n<li>SSR (用于生成静态 SSR)</li>\n<li>TUI/Rink (用于制作终端程序)</li>\n</ul>\n<h3 id="web-%E6%94%AF%E6%8C%81">Web 支持<a class="anchor" href="#web-%E6%94%AF%E6%8C%81">§</a></h3>\n<p>网页端是 Dioxus 最为重要的支持平台，要想让你的项目能够在 Web 中运行，首先会将其编译为 <strong>WebAssembly</strong> 并启用 <code>Dioxus-Web</code> 功能。\nWASM 有很多系统限制，这导致你的代码不能包含任何原生的系统调用（计时器，IO 等）</p>\n<p>鉴于 Web 平台功能已经非常成熟了，所以说后期的 API 变化会很小。</p>\n<p>一些 Web 端的演示项目：</p>\n<ul>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/tree/master/todomvc">TodoMVC</a></li>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/tree/master/ecommerce-site">ECommerce</a></li>\n</ul>\n<p><img src="https://gitee.com/dioxus-cn/example-projects/raw/master/todomvc/example.png" alt="TODOMVC_IMG"></p>\n<h3 id="ssr-%E6%94%AF%E6%8C%81">SSR 支持<a class="anchor" href="#ssr-%E6%94%AF%E6%8C%81">§</a></h3>\n<p>Dioxus 支持 SSR 的服务端渲染。</p>\n<p>为了从 WebServer 渲染到静态文件 <code>.html</code>，你需要确保在 Dioxus 功能中启用了 SSR 特性。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> contents <span class="token operator">=</span> <span class="token namespace">dioxus<span class="token punctuation">::</span>ssr<span class="token punctuation">::</span></span><span class="token function">render_vdom</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>dom<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>我们不认为 SSR API 在未来会有太大的变化。</p>\n<p>一些 SSR 端的演示项目：</p>\n<ul>\n<li><a href="https://github.com/dioxusLabs/docsite">官方网站</a></li>\n</ul>\n<h3 id="desktop-%E6%94%AF%E6%8C%81">Desktop 支持<a class="anchor" href="#desktop-%E6%94%AF%E6%8C%81">§</a></h3>\n<p>桌面端也是 Dioxus 生态中非常强大的一项，但与 Web 端相比，它所能做的还远远不够。\n目前，桌面应用使用 WebView 库渲染，但你的 Rust 代码依然是在本地系统运行的。\n这意味着部分浏览器 API 并不可用，所以说它并不能完全支持 Web 的功能。\n但是原生的系统 API 则是可以使用的（类似于 Websockets、文件系统等 ）</p>\n<p>一些 Desktop 端的演示项目：</p>\n<ul>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/tree/master/file-explorer">文件浏览器</a></li>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/blob/master/wifi-scanner">WiFi 扫描器</a></li>\n</ul>\n<p><img src="https://gitee.com/dioxus-cn/example-projects/raw/master/file-explorer/image.png" alt="FE_IMG"></p>\n<h3 id="mobile-%E6%94%AF%E6%8C%81">Mobile 支持<a class="anchor" href="#mobile-%E6%94%AF%E6%8C%81">§</a></h3>\n<p>移动端是目前 Dioxus 最有待提升的一项，它现在非常有很多问题需要处理。\n移动端应用使用 WebView 渲染，这意味着动画、透明和本地小部件目前是无法实现的。\n此外，iOS 是目前唯一支持的移动平台。( Dioxus 使用的 Rust 窗口库- tao -目前不支持Android。)</p>\n<h4 id="%E4%BB%80%E4%B9%88%E6%A0%B7%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E4%BD%A0%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E4%BD%BF%E7%94%A8-dioxus-%E5%BC%80%E5%8F%91%E7%A7%BB%E5%8A%A8%E7%AB%AF">什么样的情况下你可以选择使用 Dioxus 开发移动端：<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%A0%B7%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E4%BD%A0%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E4%BD%BF%E7%94%A8-dioxus-%E5%BC%80%E5%8F%91%E7%A7%BB%E5%8A%A8%E7%AB%AF">§</a></h4>\n<p>如果你不关心 原生App 中类似于动画、透明、小组件等功能，而仅仅是 渲染/处理 一些简单的数据。\n那么你可以尝试使用 <code>Dioxus-Mobile</code> （我们希望它在后续能不断完善，越做越好！）</p>\n<p>一些 Mobile 端的演示项目：</p>\n<ul>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/blob/master/ios_demo">Todo App</a></li>\n</ul>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u4ECB\u7ECD - Dioxus"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p><img src="https://dioxuslabs.com/guide/images/dioxuslogo_full.png" alt="DIOXUS_LOGO"></p>\n<p><strong>Dioxus</strong> 是一款用于构建跨平台用户界面的框架（生态系统），它使用 Rust 编程语言。\n这本指南将带领你学习并使用它。（我们会尝试在 网页端、移动端、桌面端 使用 Dixous 框架）</p>\n<ul>\n<li>Dioxus 中文社区 [ QQ群 ]：863409183</li>\n</ul>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> <span class="token punctuation">(</span>count<span class="token punctuation">,</span> set_count<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">use_state</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cx<span class="token punctuation">,</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n        h1 <span class="token punctuation">{</span> <span class="token string">"High-Five counter: {count}"</span> <span class="token punctuation">}</span>\n        button <span class="token punctuation">{</span> onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token function">set_count</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Up high!"</span> <span class="token punctuation">}</span>\n        button <span class="token punctuation">{</span> onclick<span class="token punctuation">:</span> <span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>_<span class="token closure-punctuation punctuation">|</span></span> <span class="token function">set_count</span><span class="token punctuation">(</span>count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Down low!"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n<p>Dioxus 与 React 有许多的相似之处，如果本指南中有任何未阐述清楚的概念，你可以前往 React 文档中查询。\n我们致力于在 Rust 生态环境中构建一个令人熟悉的UI框架，如果你已经熟悉 React 了，那么 Dioxus 将对你来说非常的简单！\n（如果你是新手，这本指南同样适合你哦qwq）</p>\n<h2 id="%E5%A4%9A%E5%B9%B3%E5%8F%B0">多平台<a class="anchor" href="#%E5%A4%9A%E5%B9%B3%E5%8F%B0">§</a></h2>\n<p><code>Dioxus</code> 是一个支持多平台的开发包，这意味着它的核心代码可以在任何平台下被使用。\n与许多其他 Rust 前端工具包不同，Dioxus 与 Web-Sys 并没有本质上的联系。\n事实上，每个元素和事件监听器都可以在编译时被更改。</p>\n<p>目前为止，我们拥有以下渲染器：</p>\n<ul>\n<li>WebSys (为 WASM 提供)</li>\n<li>Tao/Tokio (为桌面端提供)</li>\n<li>Tao/Tokio (为移动端提供)</li>\n<li>SSR (用于生成静态 SSR)</li>\n<li>TUI/Rink (用于制作终端程序)</li>\n</ul>\n<h3 id="web-%E6%94%AF%E6%8C%81">Web 支持<a class="anchor" href="#web-%E6%94%AF%E6%8C%81">§</a></h3>\n<p>网页端是 Dioxus 最为重要的支持平台，要想让你的项目能够在 Web 中运行，首先会将其编译为 <strong>WebAssembly</strong> 并启用 <code>Dioxus-Web</code> 功能。\nWASM 有很多系统限制，这导致你的代码不能包含任何原生的系统调用（计时器，IO 等）</p>\n<p>鉴于 Web 平台功能已经非常成熟了，所以说后期的 API 变化会很小。</p>\n<p>一些 Web 端的演示项目：</p>\n<ul>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/tree/master/todomvc">TodoMVC</a></li>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/tree/master/ecommerce-site">ECommerce</a></li>\n</ul>\n<p><img src="https://gitee.com/dioxus-cn/example-projects/raw/master/todomvc/example.png" alt="TODOMVC_IMG"></p>\n<h3 id="ssr-%E6%94%AF%E6%8C%81">SSR 支持<a class="anchor" href="#ssr-%E6%94%AF%E6%8C%81">§</a></h3>\n<p>Dioxus 支持 SSR 的服务端渲染。</p>\n<p>为了从 WebServer 渲染到静态文件 <code>.html</code>，你需要确保在 Dioxus 功能中启用了 SSR 特性。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> contents <span class="token operator">=</span> <span class="token namespace">dioxus<span class="token punctuation">::</span>ssr<span class="token punctuation">::</span></span><span class="token function">render_vdom</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>dom<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>我们不认为 SSR API 在未来会有太大的变化。</p>\n<p>一些 SSR 端的演示项目：</p>\n<ul>\n<li><a href="https://github.com/dioxusLabs/docsite">官方网站</a></li>\n</ul>\n<h3 id="desktop-%E6%94%AF%E6%8C%81">Desktop 支持<a class="anchor" href="#desktop-%E6%94%AF%E6%8C%81">§</a></h3>\n<p>桌面端也是 Dioxus 生态中非常强大的一项，但与 Web 端相比，它所能做的还远远不够。\n目前，桌面应用使用 WebView 库渲染，但你的 Rust 代码依然是在本地系统运行的。\n这意味着部分浏览器 API 并不可用，所以说它并不能完全支持 Web 的功能。\n但是原生的系统 API 则是可以使用的（类似于 Websockets、文件系统等 ）</p>\n<p>一些 Desktop 端的演示项目：</p>\n<ul>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/tree/master/file-explorer">文件浏览器</a></li>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/blob/master/wifi-scanner">WiFi 扫描器</a></li>\n</ul>\n<p><img src="https://gitee.com/dioxus-cn/example-projects/raw/master/file-explorer/image.png" alt="FE_IMG"></p>\n<h3 id="mobile-%E6%94%AF%E6%8C%81">Mobile 支持<a class="anchor" href="#mobile-%E6%94%AF%E6%8C%81">§</a></h3>\n<p>移动端是目前 Dioxus 最有待提升的一项，它现在非常有很多问题需要处理。\n移动端应用使用 WebView 渲染，这意味着动画、透明和本地小部件目前是无法实现的。\n此外，iOS 是目前唯一支持的移动平台。( Dioxus 使用的 Rust 窗口库- tao -目前不支持Android。)</p>\n<h4 id="%E4%BB%80%E4%B9%88%E6%A0%B7%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E4%BD%A0%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E4%BD%BF%E7%94%A8-dioxus-%E5%BC%80%E5%8F%91%E7%A7%BB%E5%8A%A8%E7%AB%AF">什么样的情况下你可以选择使用 Dioxus 开发移动端：<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%A0%B7%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E4%BD%A0%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E4%BD%BF%E7%94%A8-dioxus-%E5%BC%80%E5%8F%91%E7%A7%BB%E5%8A%A8%E7%AB%AF">§</a></h4>\n<p>如果你不关心 原生App 中类似于动画、透明、小组件等功能，而仅仅是 渲染/处理 一些简单的数据。\n那么你可以尝试使用 <code>Dioxus-Mobile</code> （我们希望它在后续能不断完善，越做越好！）</p>\n<p>一些 Mobile 端的演示项目：</p>\n<ul>\n<li><a href="https://gitee.com/dioxus-cn/example-projects/blob/master/ios_demo">Todo App</a></li>\n</ul>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%A4%9A%E5%B9%B3%E5%8F%B0" }, "\u591A\u5E73\u53F0"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#web-%E6%94%AF%E6%8C%81" }, "Web \u652F\u6301")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#ssr-%E6%94%AF%E6%8C%81" }, "SSR \u652F\u6301")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#desktop-%E6%94%AF%E6%8C%81" }, "Desktop \u652F\u6301")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#mobile-%E6%94%AF%E6%8C%81" }, "Mobile \u652F\u6301"),
                        React.createElement("ol", null)))))),
    'author': "YuKun Liu",
    'contributors': [
        "YuKun Liu"
    ],
    'date': "2022-02-14T09:04:10.000Z",
    'updated': null,
    'excerpt': "Dioxus 是一款用于构建跨平台用户界面的框架（生态系统），它使用 Rust 编程语言。 这本指南将带领你学习并使用它。（我们会尝试在 网页端、移动端、桌面端 使用 Dixous 框架） - Dioxus 中文社区 [ QQ群 ]：863409183 fn App(...",
    'cover': "https://dioxuslabs.com/guide/images/dioxuslogo_full.png",
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
