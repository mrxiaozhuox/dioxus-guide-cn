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
            __html: '<p>在本章中，我们将安装 <code>Rust</code> 编程语言与 <code>Dioxus</code> 配套工具。</p>\n<h2 id="rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85">Rust 语言安装<a class="anchor" href="#rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85">§</a></h2>\n<blockquote>\n<p>您可以直接查阅：<a href="https://www.rust-lang.org/zh-CN/tools/install">Rust 官方安装文档</a></p>\n</blockquote>\n<h2 id="%E5%AE%89%E8%A3%85-dioxus">安装 Dioxus<a class="anchor" href="#%E5%AE%89%E8%A3%85-dioxus">§</a></h2>\n<p>安装完成后，如果你打算将应用部署到 <strong>Web</strong> 上，请确保将 <code>wasm32-unknown-unknown</code> 作为运行目标。</p>\n<pre class="language-autoit"><code class="language-autoit">rustup target add wasm32<span class="token operator">-</span>unknown<span class="token operator">-</span>unknown\n</code></pre>\n<h2 id="%E5%AE%89%E8%A3%85-dioxus-cli">安装 Dioxus-CLI<a class="anchor" href="#%E5%AE%89%E8%A3%85-dioxus-cli">§</a></h2>\n<p><code>Dioxus-Cli</code> 可以帮助您 创建/管理 您的 Dioxus 项目，所以说我们建议您安装它：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo install dioxus<span class="token operator">-</span>cli\n</code></pre>\n<p>您可以使用以下命令 更新/覆盖 之前的 dioxus-cli 版本：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo install <span class="token operator">-</span><span class="token operator">-</span>force dioxus<span class="token operator">-</span>cli\n</code></pre>\n<h2 id="cargo-%E6%8B%93%E5%B1%95%E5%8C%85">Cargo 拓展包<a class="anchor" href="#cargo-%E6%8B%93%E5%B1%95%E5%8C%85">§</a></h2>\n<p>如果您想更方便的使用 <code>cargo</code> 命令，那么我们为您推荐几个有意思的拓展包：</p>\n<ul>\n<li><a href="https://github.com/killercup/cargo-edit">cargo edit</a> - 通过命令添加包依赖项</li>\n<li><a href="https://github.com/dtolnay/cargo-expand">cargo-expand</a> - 获得宏展开的调用代码</li>\n<li><a href="https://doc.rust-lang.org/cargo/commands/cargo-tree.html">cargo tree</a> - 检查项目的依赖树关系</li>\n</ul>'
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
            __html: '<p>在本章中，我们将安装 <code>Rust</code> 编程语言与 <code>Dioxus</code> 配套工具。</p>\n<h2 id="rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85">Rust 语言安装<a class="anchor" href="#rust-%E8%AF%AD%E8%A8%80%E5%AE%89%E8%A3%85">§</a></h2>\n<blockquote>\n<p>您可以直接查阅：<a href="https://www.rust-lang.org/zh-CN/tools/install">Rust 官方安装文档</a></p>\n</blockquote>\n<h2 id="%E5%AE%89%E8%A3%85-dioxus">安装 Dioxus<a class="anchor" href="#%E5%AE%89%E8%A3%85-dioxus">§</a></h2>\n<p>安装完成后，如果你打算将应用部署到 <strong>Web</strong> 上，请确保将 <code>wasm32-unknown-unknown</code> 作为运行目标。</p>\n<pre class="language-autoit"><code class="language-autoit">rustup target add wasm32<span class="token operator">-</span>unknown<span class="token operator">-</span>unknown\n</code></pre>\n<h2 id="%E5%AE%89%E8%A3%85-dioxus-cli">安装 Dioxus-CLI<a class="anchor" href="#%E5%AE%89%E8%A3%85-dioxus-cli">§</a></h2>\n<p><code>Dioxus-Cli</code> 可以帮助您 创建/管理 您的 Dioxus 项目，所以说我们建议您安装它：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo install dioxus<span class="token operator">-</span>cli\n</code></pre>\n<p>您可以使用以下命令 更新/覆盖 之前的 dioxus-cli 版本：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo install <span class="token operator">-</span><span class="token operator">-</span>force dioxus<span class="token operator">-</span>cli\n</code></pre>\n<h2 id="cargo-%E6%8B%93%E5%B1%95%E5%8C%85">Cargo 拓展包<a class="anchor" href="#cargo-%E6%8B%93%E5%B1%95%E5%8C%85">§</a></h2>\n<p>如果您想更方便的使用 <code>cargo</code> 命令，那么我们为您推荐几个有意思的拓展包：</p>\n<ul>\n<li><a href="https://github.com/killercup/cargo-edit">cargo edit</a> - 通过命令添加包依赖项</li>\n<li><a href="https://github.com/dtolnay/cargo-expand">cargo-expand</a> - 获得宏展开的调用代码</li>\n<li><a href="https://doc.rust-lang.org/cargo/commands/cargo-tree.html">cargo tree</a> - 检查项目的依赖树关系</li>\n</ul>'
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
                React.createElement("a", { href: "#cargo-%E6%8B%93%E5%B1%95%E5%8C%85" }, "Cargo \u62D3\u5C55\u5305")))),
    'author': undefined,
    'contributors': [],
    'date': "2022-01-13T10:37:40.283Z",
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
        }
    ]
};
