import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/setup.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/setup.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>在本章中，我们将安装 <code>Rust</code> 编程语言与 <code>Dioxus</code> 配套工具。</p>\n<h2 id="rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85">Rust 语言安装<a class="anchor" href="#rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85">§</a></h2>\n<blockquote>\n<p>你可以直接查阅：<a href="https://www.rust-lang.org/zh-CN/tools/install">Rust 官方安装文档</a></p>\n</blockquote>\n<h2 id="%E5%AE%89%E8%A3%85-dioxus">安装 Dioxus<a class="anchor" href="#%E5%AE%89%E8%A3%85-dioxus">§</a></h2>\n<p>安装完成后，如果你打算将应用部署到 <strong>Web</strong> 上，请确保将 <code>wasm32-unknown-unknown</code> 作为运行目标。</p>\n<pre class="language-autoit"><code class="language-autoit">rustup target add wasm32<span class="token operator">-</span>unknown<span class="token operator">-</span>unknown\n</code></pre>\n<h2 id="%E5%AE%89%E8%A3%85-dioxus-cli">安装 Dioxus-CLI<a class="anchor" href="#%E5%AE%89%E8%A3%85-dioxus-cli">§</a></h2>\n<p><code>Dioxus-Cli</code> 可以帮助你 创建/管理 你的 Dioxus 项目，所以说我们建议你安装它：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo install dioxus<span class="token operator">-</span>cli\n</code></pre>\n<p>你可以使用以下命令 更新/覆盖 之前的 dioxus-cli 版本：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo install <span class="token operator">-</span><span class="token operator">-</span>force dioxus<span class="token operator">-</span>cli\n</code></pre>\n<h2 id="cargo-%E6%8B%93%E5%B1%95%E5%8C%85">Cargo 拓展包<a class="anchor" href="#cargo-%E6%8B%93%E5%B1%95%E5%8C%85">§</a></h2>\n<p>如果你想更方便的使用 <code>cargo</code> 命令，那么我们为你推荐几个有意思的拓展包：</p>\n<ul>\n<li><a href="https://github.com/killercup/cargo-edit">cargo edit</a> - 通过命令添加包依赖项</li>\n<li><a href="https://github.com/dtolnay/cargo-expand">cargo-expand</a> - 获得宏展开的调用代码</li>\n<li><a href="https://doc.rust-lang.org/cargo/commands/cargo-tree.html">cargo tree</a> - 检查项目的依赖树关系</li>\n</ul>\n<h2 id="rust-%E8%AF%AD%E8%A8%80%E7%9F%A5%E8%AF%86">Rust 语言知识<a class="anchor" href="#rust-%E8%AF%AD%E8%A8%80%E7%9F%A5%E8%AF%86">§</a></h2>\n<p>在使用 <code>Dioxus</code> 之前，你应该先去学习 Rust 语言的基础，否则啥都做不了。</p>\n<p>中文学习资源：</p>\n<ul>\n<li><a href="https://rustwiki.org/zh-CN/book">Rust 程序设计语言</a></li>\n<li><a href="https://rustwiki.org/zh-CN/rust-by-example">通过例子学 Rust</a></li>\n<li><a href="https://rustwiki.org/zh-CN/cargo">Cargo 手册</a></li>\n<li><a href="https://rustwiki.org/wiki">Rust 规范文档</a></li>\n</ul>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>在本章中，我们将安装 <code>Rust</code> 编程语言与 <code>Dioxus</code> 配套工具。</p>\n<h2 id="rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85">Rust 语言安装<a class="anchor" href="#rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85">§</a></h2>\n<blockquote>\n<p>你可以直接查阅：<a href="https://www.rust-lang.org/zh-CN/tools/install">Rust 官方安装文档</a></p>\n</blockquote>\n<h2 id="%E5%AE%89%E8%A3%85-dioxus">安装 Dioxus<a class="anchor" href="#%E5%AE%89%E8%A3%85-dioxus">§</a></h2>\n<p>安装完成后，如果你打算将应用部署到 <strong>Web</strong> 上，请确保将 <code>wasm32-unknown-unknown</code> 作为运行目标。</p>\n<pre class="language-autoit"><code class="language-autoit">rustup target add wasm32<span class="token operator">-</span>unknown<span class="token operator">-</span>unknown\n</code></pre>\n<h2 id="%E5%AE%89%E8%A3%85-dioxus-cli">安装 Dioxus-CLI<a class="anchor" href="#%E5%AE%89%E8%A3%85-dioxus-cli">§</a></h2>\n<p><code>Dioxus-Cli</code> 可以帮助你 创建/管理 你的 Dioxus 项目，所以说我们建议你安装它：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo install dioxus<span class="token operator">-</span>cli\n</code></pre>\n<p>你可以使用以下命令 更新/覆盖 之前的 dioxus-cli 版本：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo install <span class="token operator">-</span><span class="token operator">-</span>force dioxus<span class="token operator">-</span>cli\n</code></pre>\n<h2 id="cargo-%E6%8B%93%E5%B1%95%E5%8C%85">Cargo 拓展包<a class="anchor" href="#cargo-%E6%8B%93%E5%B1%95%E5%8C%85">§</a></h2>\n<p>如果你想更方便的使用 <code>cargo</code> 命令，那么我们为你推荐几个有意思的拓展包：</p>\n<ul>\n<li><a href="https://github.com/killercup/cargo-edit">cargo edit</a> - 通过命令添加包依赖项</li>\n<li><a href="https://github.com/dtolnay/cargo-expand">cargo-expand</a> - 获得宏展开的调用代码</li>\n<li><a href="https://doc.rust-lang.org/cargo/commands/cargo-tree.html">cargo tree</a> - 检查项目的依赖树关系</li>\n</ul>\n<h2 id="rust-%E8%AF%AD%E8%A8%80%E7%9F%A5%E8%AF%86">Rust 语言知识<a class="anchor" href="#rust-%E8%AF%AD%E8%A8%80%E7%9F%A5%E8%AF%86">§</a></h2>\n<p>在使用 <code>Dioxus</code> 之前，你应该先去学习 Rust 语言的基础，否则啥都做不了。</p>\n<p>中文学习资源：</p>\n<ul>\n<li><a href="https://rustwiki.org/zh-CN/book">Rust 程序设计语言</a></li>\n<li><a href="https://rustwiki.org/zh-CN/rust-by-example">通过例子学 Rust</a></li>\n<li><a href="https://rustwiki.org/zh-CN/cargo">Cargo 手册</a></li>\n<li><a href="https://rustwiki.org/wiki">Rust 规范文档</a></li>\n</ul>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85" }, "Rust \u8BED\u8A00\u5B89\u88C5")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%AE%89%E8%A3%85-dioxus" }, "\u5B89\u88C5 Dioxus")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%AE%89%E8%A3%85-dioxus-cli" }, "\u5B89\u88C5 Dioxus-CLI")),
            React.createElement("li", null,
                React.createElement("a", { href: "#cargo-%E6%8B%93%E5%B1%95%E5%8C%85" }, "Cargo \u62D3\u5C55\u5305")),
            React.createElement("li", null,
                React.createElement("a", { href: "#rust-%E8%AF%AD%E8%A8%80%E7%9F%A5%E8%AF%86" }, "Rust \u8BED\u8A00\u77E5\u8BC6")))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-01-17T04:29:46.000Z",
    'updated': null,
    'excerpt': "在本章中，我们将安装 Rust 编程语言与 Dioxus 配套工具。 Rust 语言安装 安装 Dioxus 安装完成后，如果你打算将应用部署到 Web 上，请确保将 wasm32-unknown-unknown 作为运行目标。 rustup target add wasm32-unknown-unknow...",
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
        }
    ]
};
