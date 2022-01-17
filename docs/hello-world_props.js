import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/hello-world.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/hello-world.html",
    'title': "“Hello World” 桌面程序",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>“Hello World” 桌面程序</h1>\n<p>让我们通过一个简单的 <code>Hello World</code> 程序来学习 Dioxus 的基本使用吧！</p>\n<p>在本章节中，我们将讨论：</p>\n<ul>\n<li>通过 Cargo 创建一个新项目</li>\n<li>添加 Dioxus 工具包到新项目中</li>\n<li>启动属于我们的第一个 Dioxus 桌面程序</li>\n</ul>\n<h2 id="%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目<a class="anchor" href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">§</a></h2>\n<p>首先，让我们开始一个新的项目，Rust 中有两种程序：二进制程序 <code>main.rs</code> 和库程序 <code>lib.rs</code>，\n而在这里，我们需要的是一个二进制可运行的程序（bin），所以说我们的创建命令为：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo new <span class="token operator">-</span><span class="token operator">-</span>bin hello<span class="token operator">-</span>dioxus\n</code></pre>\n<p>现在我们可以通过 <code>cd</code> 命令进入文件夹了：</p>\n<pre class="language-autoit"><code class="language-autoit">$ cd hello<span class="token operator">-</span>dioxus\n$ tree\n<span class="token punctuation">.</span>\n├── Cargo<span class="token punctuation">.</span>toml\n├── <span class="token punctuation">.</span>git\n├── <span class="token punctuation">.</span>gitignore\n└── src\n    └── main<span class="token punctuation">.</span>rs\n</code></pre>\n<p><code>Cargo</code> 初始化的 文件/文件夹 有：Git仓库信息、Cargo.toml Cargo的配置文件、src文件夹 存放代码的目录。<code>main.rs</code> 则是整个应用的入口了！\n当我们的程序被运行是，则会调用 <code>main.rs</code> 中的 <code>main</code> 函数。</p>\n<h3 id="%E4%BB%A3%E7%A0%81%E7%9B%AE%E5%BD%95">代码目录<a class="anchor" href="#%E4%BB%A3%E7%A0%81%E7%9B%AE%E5%BD%95">§</a></h3>\n<pre class="language-autoit"><code class="language-autoit">$ cat src<span class="token operator">/</span>main<span class="token punctuation">.</span>rs\n</code></pre>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>当代码被运行时，<code>Println!</code> 宏会向终端打印一个 <code>Hello, world!</code>。</p>\n<pre class="language-autoit"><code class="language-autoit">$ cargo run\n   Compiling hello<span class="token operator">-</span>dioxus v0<span class="token punctuation">.</span><span class="token number">1.0</span>\n    Finished dev <span class="token punctuation">[</span>unoptimized <span class="token operator">+</span> debuginfo<span class="token punctuation">]</span> <span class="token function">target</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">.</span>41s\n     Running `target<span class="token operator">/</span>debug<span class="token operator">/</span>hello<span class="token operator">-</span>dioxus`\nHello<span class="token punctuation">,</span> world!\n</code></pre>\n<h3 id="%E5%BA%94%E7%94%A8%E9%85%8D%E7%BD%AE">应用配置<a class="anchor" href="#%E5%BA%94%E7%94%A8%E9%85%8D%E7%BD%AE">§</a></h3>\n<p><code>Rust</code> 项目的依赖管理、项目信息都在 <code>Cargo.toml</code> 文件中保存。</p>\n<pre class="language-autoit"><code class="language-autoit">$ cat Cargo<span class="token punctuation">.</span>toml\n</code></pre>\n<pre class="language-autoit"><code class="language-autoit"><span class="token punctuation">[</span>package<span class="token punctuation">]</span>\nname <span class="token operator">=</span> <span class="token string">"hello-dioxus"</span>\nversion <span class="token operator">=</span> <span class="token string">"0.1.0"</span>\nedition <span class="token operator">=</span> <span class="token string">"2018"</span>\n\n<span class="token punctuation">[</span>dependencies<span class="token punctuation">]</span>\n</code></pre>\n<p>它使用 <strong>TOML</strong> 格式，默认情况下没有任何依赖库。</p>\n<h4 id="%E6%B7%BB%E5%8A%A0%E4%BE%9D%E8%B5%96%E5%BA%93">添加依赖库<a class="anchor" href="#%E6%B7%BB%E5%8A%A0%E4%BE%9D%E8%B5%96%E5%BA%93">§</a></h4>\n<p>如果你已经安装了 <code>cargo-edit</code> 拓展命令，你可以很轻松的添加一个依赖到你的 <code>Cargo.toml</code> 中：</p>\n<pre class="language-autoit"><code class="language-autoit">$ cargo add dioxus <span class="token operator">-</span><span class="token operator">-</span>features desktop\n</code></pre>\n<p>将 <code>features</code> desktop 引入项目中是非常重要的，<code>dioxus</code> 就像一个包装盒，里面有很多各种各样的支持 <code>Feature</code>。\n如果这个项目用于 <code>Desktop</code> 开发，那么你就需要加入这个 <code>Feature</code> 才能使用它。</p>\n<h2 id="%E7%AC%AC%E4%B8%80%E4%B8%AA-dioxus-%E9%A1%B9%E7%9B%AE">第一个 Dioxus 项目<a class="anchor" href="#%E7%AC%AC%E4%B8%80%E4%B8%AA-dioxus-%E9%A1%B9%E7%9B%AE">§</a></h2>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">use</span> <span class="token namespace">dioxus<span class="token punctuation">::</span>prelude<span class="token punctuation">::</span></span><span class="token operator">*</span><span class="token punctuation">;</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token namespace">dioxus<span class="token punctuation">::</span>desktop<span class="token punctuation">::</span></span><span class="token function">launch</span><span class="token punctuation">(</span><span class="token class-name">App</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span> <span class="token punctuation">(</span>\n        div <span class="token punctuation">{</span> <span class="token string">"Hello, world!"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>使用 <code>cargo run</code> 就能运行这个项目啦。\n不出意外的话，它是这个样子的：</p>\n<p><img src="https://dioxuslabs.com/guide/images/helloworld.png" alt="HELLOWORLD_IMG"></p>\n<h3 id="%E8%A7%A3%E6%9E%90%E4%BB%A3%E7%A0%81">解析代码<a class="anchor" href="#%E8%A7%A3%E6%9E%90%E4%BB%A3%E7%A0%81">§</a></h3>\n<p><code>use</code> 命令会将目标包中的模块中导入到本程序中，而上方代码则是将 <code>dioxus</code> 下的 <code>prelude</code> 中的内容全部引入文件。\n它包含了 <code>Dioxus</code> 项目中常用的所有功能。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">use</span> <span class="token namespace">dioxus<span class="token punctuation">::</span>prelude<span class="token punctuation">::</span></span><span class="token operator">*</span><span class="token punctuation">;</span>\n</code></pre>\n<p>这个初始化代码会在一个线程上启动Tokio运行时，你的代码将在这个线程上运行。\n然后，WebView 渲染器将在主线程上启动。此时主线程会被应用程序的事件循环阻塞。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token namespace">dioxus<span class="token punctuation">::</span>desktop<span class="token punctuation">::</span></span><span class="token function">launch</span><span class="token punctuation">(</span><span class="token class-name">App</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>最后，我们定义了一个组件。在 Dioxus 中每个组件都是一个函数，它会返回一个 Element 对象，用于最终渲染。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span> <span class="token punctuation">{</span>\n        div <span class="token punctuation">{</span> <span class="token string">"Hello, world!"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>    \n<span class="token punctuation">}</span>\n</code></pre>\n<h3 id="scope-%E5%AF%B9%E8%B1%A1">Scope 对象<a class="anchor" href="#scope-%E5%AF%B9%E8%B1%A1">§</a></h3>\n<p>Scope 对象来自 React ，在 React 中，你需要用钩子在渲染之间存储数据。\n然而，钩子依赖于全局变量，这使得它们很难在服务器呈现等多租户系统中集成。</p>\n<p>在 Dioxus 中，Scope 提供了显示的数据处理、获取等方法。它对外提供了渲染、数据获取等功能。</p>\n<p>但现在，你只需要知道我们使用 <code>cx.render()</code> 去渲染了一个页面。</p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u201CHello World\u201D \u684C\u9762\u7A0B\u5E8F"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>让我们通过一个简单的 <code>Hello World</code> 程序来学习 Dioxus 的基本使用吧！</p>\n<p>在本章节中，我们将讨论：</p>\n<ul>\n<li>通过 Cargo 创建一个新项目</li>\n<li>添加 Dioxus 工具包到新项目中</li>\n<li>启动属于我们的第一个 Dioxus 桌面程序</li>\n</ul>\n<h2 id="%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目<a class="anchor" href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">§</a></h2>\n<p>首先，让我们开始一个新的项目，Rust 中有两种程序：二进制程序 <code>main.rs</code> 和库程序 <code>lib.rs</code>，\n而在这里，我们需要的是一个二进制可运行的程序（bin），所以说我们的创建命令为：</p>\n<pre class="language-autoit"><code class="language-autoit">cargo new <span class="token operator">-</span><span class="token operator">-</span>bin hello<span class="token operator">-</span>dioxus\n</code></pre>\n<p>现在我们可以通过 <code>cd</code> 命令进入文件夹了：</p>\n<pre class="language-autoit"><code class="language-autoit">$ cd hello<span class="token operator">-</span>dioxus\n$ tree\n<span class="token punctuation">.</span>\n├── Cargo<span class="token punctuation">.</span>toml\n├── <span class="token punctuation">.</span>git\n├── <span class="token punctuation">.</span>gitignore\n└── src\n    └── main<span class="token punctuation">.</span>rs\n</code></pre>\n<p><code>Cargo</code> 初始化的 文件/文件夹 有：Git仓库信息、Cargo.toml Cargo的配置文件、src文件夹 存放代码的目录。<code>main.rs</code> 则是整个应用的入口了！\n当我们的程序被运行是，则会调用 <code>main.rs</code> 中的 <code>main</code> 函数。</p>\n<h3 id="%E4%BB%A3%E7%A0%81%E7%9B%AE%E5%BD%95">代码目录<a class="anchor" href="#%E4%BB%A3%E7%A0%81%E7%9B%AE%E5%BD%95">§</a></h3>\n<pre class="language-autoit"><code class="language-autoit">$ cat src<span class="token operator">/</span>main<span class="token punctuation">.</span>rs\n</code></pre>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>当代码被运行时，<code>Println!</code> 宏会向终端打印一个 <code>Hello, world!</code>。</p>\n<pre class="language-autoit"><code class="language-autoit">$ cargo run\n   Compiling hello<span class="token operator">-</span>dioxus v0<span class="token punctuation">.</span><span class="token number">1.0</span>\n    Finished dev <span class="token punctuation">[</span>unoptimized <span class="token operator">+</span> debuginfo<span class="token punctuation">]</span> <span class="token function">target</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">.</span>41s\n     Running `target<span class="token operator">/</span>debug<span class="token operator">/</span>hello<span class="token operator">-</span>dioxus`\nHello<span class="token punctuation">,</span> world!\n</code></pre>\n<h3 id="%E5%BA%94%E7%94%A8%E9%85%8D%E7%BD%AE">应用配置<a class="anchor" href="#%E5%BA%94%E7%94%A8%E9%85%8D%E7%BD%AE">§</a></h3>\n<p><code>Rust</code> 项目的依赖管理、项目信息都在 <code>Cargo.toml</code> 文件中保存。</p>\n<pre class="language-autoit"><code class="language-autoit">$ cat Cargo<span class="token punctuation">.</span>toml\n</code></pre>\n<pre class="language-autoit"><code class="language-autoit"><span class="token punctuation">[</span>package<span class="token punctuation">]</span>\nname <span class="token operator">=</span> <span class="token string">"hello-dioxus"</span>\nversion <span class="token operator">=</span> <span class="token string">"0.1.0"</span>\nedition <span class="token operator">=</span> <span class="token string">"2018"</span>\n\n<span class="token punctuation">[</span>dependencies<span class="token punctuation">]</span>\n</code></pre>\n<p>它使用 <strong>TOML</strong> 格式，默认情况下没有任何依赖库。</p>\n<h4 id="%E6%B7%BB%E5%8A%A0%E4%BE%9D%E8%B5%96%E5%BA%93">添加依赖库<a class="anchor" href="#%E6%B7%BB%E5%8A%A0%E4%BE%9D%E8%B5%96%E5%BA%93">§</a></h4>\n<p>如果你已经安装了 <code>cargo-edit</code> 拓展命令，你可以很轻松的添加一个依赖到你的 <code>Cargo.toml</code> 中：</p>\n<pre class="language-autoit"><code class="language-autoit">$ cargo add dioxus <span class="token operator">-</span><span class="token operator">-</span>features desktop\n</code></pre>\n<p>将 <code>features</code> desktop 引入项目中是非常重要的，<code>dioxus</code> 就像一个包装盒，里面有很多各种各样的支持 <code>Feature</code>。\n如果这个项目用于 <code>Desktop</code> 开发，那么你就需要加入这个 <code>Feature</code> 才能使用它。</p>\n<h2 id="%E7%AC%AC%E4%B8%80%E4%B8%AA-dioxus-%E9%A1%B9%E7%9B%AE">第一个 Dioxus 项目<a class="anchor" href="#%E7%AC%AC%E4%B8%80%E4%B8%AA-dioxus-%E9%A1%B9%E7%9B%AE">§</a></h2>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">use</span> <span class="token namespace">dioxus<span class="token punctuation">::</span>prelude<span class="token punctuation">::</span></span><span class="token operator">*</span><span class="token punctuation">;</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token namespace">dioxus<span class="token punctuation">::</span>desktop<span class="token punctuation">::</span></span><span class="token function">launch</span><span class="token punctuation">(</span><span class="token class-name">App</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span> <span class="token punctuation">(</span>\n        div <span class="token punctuation">{</span> <span class="token string">"Hello, world!"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>使用 <code>cargo run</code> 就能运行这个项目啦。\n不出意外的话，它是这个样子的：</p>\n<p><img src="https://dioxuslabs.com/guide/images/helloworld.png" alt="HELLOWORLD_IMG"></p>\n<h3 id="%E8%A7%A3%E6%9E%90%E4%BB%A3%E7%A0%81">解析代码<a class="anchor" href="#%E8%A7%A3%E6%9E%90%E4%BB%A3%E7%A0%81">§</a></h3>\n<p><code>use</code> 命令会将目标包中的模块中导入到本程序中，而上方代码则是将 <code>dioxus</code> 下的 <code>prelude</code> 中的内容全部引入文件。\n它包含了 <code>Dioxus</code> 项目中常用的所有功能。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">use</span> <span class="token namespace">dioxus<span class="token punctuation">::</span>prelude<span class="token punctuation">::</span></span><span class="token operator">*</span><span class="token punctuation">;</span>\n</code></pre>\n<p>这个初始化代码会在一个线程上启动Tokio运行时，你的代码将在这个线程上运行。\n然后，WebView 渲染器将在主线程上启动。此时主线程会被应用程序的事件循环阻塞。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token namespace">dioxus<span class="token punctuation">::</span>desktop<span class="token punctuation">::</span></span><span class="token function">launch</span><span class="token punctuation">(</span><span class="token class-name">App</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>最后，我们定义了一个组件。在 Dioxus 中每个组件都是一个函数，它会返回一个 Element 对象，用于最终渲染。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">App</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span> <span class="token punctuation">{</span>\n        div <span class="token punctuation">{</span> <span class="token string">"Hello, world!"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>    \n<span class="token punctuation">}</span>\n</code></pre>\n<h3 id="scope-%E5%AF%B9%E8%B1%A1">Scope 对象<a class="anchor" href="#scope-%E5%AF%B9%E8%B1%A1">§</a></h3>\n<p>Scope 对象来自 React ，在 React 中，你需要用钩子在渲染之间存储数据。\n然而，钩子依赖于全局变量，这使得它们很难在服务器呈现等多租户系统中集成。</p>\n<p>在 Dioxus 中，Scope 提供了显示的数据处理、获取等方法。它对外提供了渲染、数据获取等功能。</p>\n<p>但现在，你只需要知道我们使用 <code>cx.render()</code> 去渲染了一个页面。</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE" }, "\u521B\u5EFA\u9879\u76EE"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#%E4%BB%A3%E7%A0%81%E7%9B%AE%E5%BD%95" }, "\u4EE3\u7801\u76EE\u5F55")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#%E5%BA%94%E7%94%A8%E9%85%8D%E7%BD%AE" }, "\u5E94\u7528\u914D\u7F6E"),
                        React.createElement("ol", null)))),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E7%AC%AC%E4%B8%80%E4%B8%AA-dioxus-%E9%A1%B9%E7%9B%AE" }, "\u7B2C\u4E00\u4E2A Dioxus \u9879\u76EE"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#%E8%A7%A3%E6%9E%90%E4%BB%A3%E7%A0%81" }, "\u89E3\u6790\u4EE3\u7801")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#scope-%E5%AF%B9%E8%B1%A1" }, "Scope \u5BF9\u8C61")))))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-01-17T04:29:46.000Z",
    'updated': null,
    'excerpt': "让我们通过一个简单的 Hello World 程序来学习 Dioxus 的基本使用吧！ 在本章节中，我们将讨论： - 通过 Cargo 创建一个新项目 - 添加 Dioxus 工具包到新项目中 - 启动属于我们的第一个 Dioxus 桌面程序 创建项目 首先，让我们...",
    'cover': "https://dioxuslabs.com/guide/images/helloworld.png",
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
