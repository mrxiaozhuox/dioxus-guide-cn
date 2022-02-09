import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/components/properties.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/components/properties.html",
    'title': "组件道具",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>组件道具</h1>\n<p>所有用于组件的道具都必须 <code>Properties</code> 特征，而 <code>Props</code> 派生宏则可以自动实现它。</p>\n<p>在本章中我们会了解到：</p>\n<ul>\n<li>使用 Props 宏</li>\n<li>记忆 Memoization</li>\n<li>可选的道具</li>\n<li>Inline_props 宏</li>\n</ul>\n<h2 id="%E4%BD%BF%E7%94%A8-props-%E5%AE%8F">使用 Props 宏<a class="anchor" href="#%E4%BD%BF%E7%94%A8-props-%E5%AE%8F">§</a></h2>\n<p>默认的 <code>Scope</code> 不包含任何数据：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token comment">// 这是一个不包含任何道具的 Scope</span>\n<span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">></span>\n<span class="token comment">// 它和上面的不包含数据的 Scope 相等</span>\n<span class="token class-name">Scope</span>\n</code></pre>\n<p>接下来我们定义一个 <code>Props</code>，你需要声明一个结构体，并为它添加派生宏。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">MyProps</span> <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token class-name">String</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>上方的代码并不能被编译，因为结构体中没有任何借用，那则需要实现 <code>PartialEq</code> 。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props, PartialEq)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">MyProps</span> <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token class-name">String</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>或者包含借用的：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">MyProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<hr>\n<p>接下来我们将 <code>MyProps</code> 引入到我们的组件中，并使用它：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">Demo</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">MyProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token macro property">todo!</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>如果是包含借用的：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">Demo</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token punctuation">,</span> <span class="token class-name">MyProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">>></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token macro property">todo!</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<h2 id="%E8%AE%B0%E5%BF%86-memoization">记忆 Memoization<a class="anchor" href="#%E8%AE%B0%E5%BF%86-memoization">§</a></h2>\n<p>如果你来自 React 框架，那么你应该会蛮好奇我们是怎么处理 <code>Memoization</code> 的：</p>\n<blockquote>\n<p>Memoization: 一种在数据被更新时，重新渲染页面的优化技术。\n当页面被频繁刷新时，性能和用户体验都会大大降低，这时候就需要一些方法来完成优化。</p>\n</blockquote>\n<p>当一个道具值被更改，但它并不会影响到输出内容，那我们便不会刷新页面渲染。</p>\n<p>比如：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">Demo</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> <span class="token punctuation">(</span>name<span class="token punctuation">,</span> _set_name<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">use_state</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cx<span class="token punctuation">,</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"bob"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">let</span> <span class="token punctuation">(</span>age<span class="token punctuation">,</span> _set_age<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">use_state</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cx<span class="token punctuation">,</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        <span class="token class-name">Name</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span> name <span class="token punctuation">}</span>\n        <span class="token class-name">Age</span> <span class="token punctuation">{</span> age<span class="token punctuation">:</span> age <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>当 <code>Name</code> 被改变时，我们没必要对 <code>Age</code> 也进行刷新，因为它的内容没有任何变化，所以说刷新它只会造成无用的开销。</p>\n<p>关于 <code>Memoization</code> 在什么时候有效：\n当结构体实现了 <code>PartialEq</code> 时，它会被优化，但是如果结构中包含任何引用，则组件无法被优化，因为我们无法判断引用的 子/父 组件的更新状态。</p>\n<h2 id="%E5%8F%AF%E9%80%89%E9%81%93%E5%85%B7">可选道具<a class="anchor" href="#%E5%8F%AF%E9%80%89%E9%81%93%E5%85%B7">§</a></h2>\n<p>我们可以为 Dioxus 定义可选的道具（因为在部分情况下，有一些道具可以包含默认值）Dioxus 在这方面的设计借鉴了：<a href="https://github.com/idanarye/rust-typed-builder">Rust-Typed-Builder</a> 的设计。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props, PartialEq)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">MyProps</span> <span class="token punctuation">{</span>\n    \n    name<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span>\n\n    <span class="token attribute attr-name">#[props(optional)]</span>\n    description<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">></span>\n\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">Demo</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">MyProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>可选道具：数据类型必须包含 <code>Default</code> 特征，在没有被赋值的时候，会为默认值。</p>\n<p><code>optional</code> 修饰符包含了两个独立的修饰符 <code>default</code> 和 <code>strip_option</code> 。</p>\n<p>以下是完整的修饰符列表：</p>\n<ul>\n<li><strong>default</strong> - 当内容没有填写时，赋予它默认值。</li>\n<li><strong>strip_option</strong> - 自动包装 Some 数据。</li>\n<li><strong>optional</strong> - 同时包含了 <em><strong>default</strong></em> 和 <strong>strip_option</strong> 修饰符。</li>\n<li><strong>into</strong> - 在调用时自动调用 <strong>into()</strong> 函数。</li>\n</ul>\n<h2 id="inline_props-%E5%AE%8F">inline_props 宏<a class="anchor" href="#inline_props-%E5%AE%8F">§</a></h2>\n<p>我们提供了 <code>inline_props</code> 宏，它将允许你在函数参数中设置 <code>Props</code> 。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props, PartialEq)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">TitleCardProps</span> <span class="token punctuation">{</span>\n    title<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">TitleCard</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">TitleCardProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        h1 <span class="token punctuation">{</span> <span class="token string">"{cx.props.title}"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>   \n</code></pre>\n<p>也可以写成这样:</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[inline_props]</span>\n<span class="token keyword">fn</span> <span class="token function-definition function">TitleCard</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">,</span> title<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        h1 <span class="token punctuation">{</span> <span class="token string">"{title}"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>  \n</code></pre>\n<p>我们认为库作者不应该在项目中使用这个宏，因为它无法实现 <code>可选</code> 功能，同时你无法更好的为组件编写文档。</p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u7EC4\u4EF6\u9053\u5177"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>所有用于组件的道具都必须 <code>Properties</code> 特征，而 <code>Props</code> 派生宏则可以自动实现它。</p>\n<p>在本章中我们会了解到：</p>\n<ul>\n<li>使用 Props 宏</li>\n<li>记忆 Memoization</li>\n<li>可选的道具</li>\n<li>Inline_props 宏</li>\n</ul>\n<h2 id="%E4%BD%BF%E7%94%A8-props-%E5%AE%8F">使用 Props 宏<a class="anchor" href="#%E4%BD%BF%E7%94%A8-props-%E5%AE%8F">§</a></h2>\n<p>默认的 <code>Scope</code> 不包含任何数据：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token comment">// 这是一个不包含任何道具的 Scope</span>\n<span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">></span>\n<span class="token comment">// 它和上面的不包含数据的 Scope 相等</span>\n<span class="token class-name">Scope</span>\n</code></pre>\n<p>接下来我们定义一个 <code>Props</code>，你需要声明一个结构体，并为它添加派生宏。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">MyProps</span> <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token class-name">String</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>上方的代码并不能被编译，因为结构体中没有任何借用，那则需要实现 <code>PartialEq</code> 。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props, PartialEq)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">MyProps</span> <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token class-name">String</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>或者包含借用的：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">MyProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">\'a</span> <span class="token keyword">str</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<hr>\n<p>接下来我们将 <code>MyProps</code> 引入到我们的组件中，并使用它：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">Demo</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">MyProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token macro property">todo!</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>如果是包含借用的：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">Demo</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">></span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token punctuation">,</span> <span class="token class-name">MyProps</span><span class="token operator">&lt;</span><span class="token lifetime-annotation symbol">\'a</span><span class="token operator">>></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token macro property">todo!</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<h2 id="%E8%AE%B0%E5%BF%86-memoization">记忆 Memoization<a class="anchor" href="#%E8%AE%B0%E5%BF%86-memoization">§</a></h2>\n<p>如果你来自 React 框架，那么你应该会蛮好奇我们是怎么处理 <code>Memoization</code> 的：</p>\n<blockquote>\n<p>Memoization: 一种在数据被更新时，重新渲染页面的优化技术。\n当页面被频繁刷新时，性能和用户体验都会大大降低，这时候就需要一些方法来完成优化。</p>\n</blockquote>\n<p>当一个道具值被更改，但它并不会影响到输出内容，那我们便不会刷新页面渲染。</p>\n<p>比如：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">fn</span> <span class="token function-definition function">Demo</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> <span class="token punctuation">(</span>name<span class="token punctuation">,</span> _set_name<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">use_state</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cx<span class="token punctuation">,</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">"bob"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">let</span> <span class="token punctuation">(</span>age<span class="token punctuation">,</span> _set_age<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">use_state</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cx<span class="token punctuation">,</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        <span class="token class-name">Name</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span> name <span class="token punctuation">}</span>\n        <span class="token class-name">Age</span> <span class="token punctuation">{</span> age<span class="token punctuation">:</span> age <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>当 <code>Name</code> 被改变时，我们没必要对 <code>Age</code> 也进行刷新，因为它的内容没有任何变化，所以说刷新它只会造成无用的开销。</p>\n<p>关于 <code>Memoization</code> 在什么时候有效：\n当结构体实现了 <code>PartialEq</code> 时，它会被优化，但是如果结构中包含任何引用，则组件无法被优化，因为我们无法判断引用的 子/父 组件的更新状态。</p>\n<h2 id="%E5%8F%AF%E9%80%89%E9%81%93%E5%85%B7">可选道具<a class="anchor" href="#%E5%8F%AF%E9%80%89%E9%81%93%E5%85%B7">§</a></h2>\n<p>我们可以为 Dioxus 定义可选的道具（因为在部分情况下，有一些道具可以包含默认值）Dioxus 在这方面的设计借鉴了：<a href="https://github.com/idanarye/rust-typed-builder">Rust-Typed-Builder</a> 的设计。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props, PartialEq)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">MyProps</span> <span class="token punctuation">{</span>\n    \n    name<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span>\n\n    <span class="token attribute attr-name">#[props(optional)]</span>\n    description<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">></span>\n\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">Demo</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">MyProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre>\n<p>可选道具：数据类型必须包含 <code>Default</code> 特征，在没有被赋值的时候，会为默认值。</p>\n<p><code>optional</code> 修饰符包含了两个独立的修饰符 <code>default</code> 和 <code>strip_option</code> 。</p>\n<p>以下是完整的修饰符列表：</p>\n<ul>\n<li><strong>default</strong> - 当内容没有填写时，赋予它默认值。</li>\n<li><strong>strip_option</strong> - 自动包装 Some 数据。</li>\n<li><strong>optional</strong> - 同时包含了 <em><strong>default</strong></em> 和 <strong>strip_option</strong> 修饰符。</li>\n<li><strong>into</strong> - 在调用时自动调用 <strong>into()</strong> 函数。</li>\n</ul>\n<h2 id="inline_props-%E5%AE%8F">inline_props 宏<a class="anchor" href="#inline_props-%E5%AE%8F">§</a></h2>\n<p>我们提供了 <code>inline_props</code> 宏，它将允许你在函数参数中设置 <code>Props</code> 。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[derive(Props, PartialEq)]</span>\n<span class="token keyword">struct</span> <span class="token type-definition class-name">TitleCardProps</span> <span class="token punctuation">{</span>\n    title<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">fn</span> <span class="token function-definition function">TitleCard</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token operator">&lt;</span><span class="token class-name">TitleCardProps</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        h1 <span class="token punctuation">{</span> <span class="token string">"{cx.props.title}"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>   \n</code></pre>\n<p>也可以写成这样:</p>\n<pre class="language-rust"><code class="language-rust"><span class="token attribute attr-name">#[inline_props]</span>\n<span class="token keyword">fn</span> <span class="token function-definition function">TitleCard</span><span class="token punctuation">(</span>cx<span class="token punctuation">:</span> <span class="token class-name">Scope</span><span class="token punctuation">,</span> title<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token class-name">Element</span> <span class="token punctuation">{</span>\n    cx<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token macro property">rsx!</span><span class="token punctuation">{</span>\n        h1 <span class="token punctuation">{</span> <span class="token string">"{title}"</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>  \n</code></pre>\n<p>我们认为库作者不应该在项目中使用这个宏，因为它无法实现 <code>可选</code> 功能，同时你无法更好的为组件编写文档。</p>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E4%BD%BF%E7%94%A8-props-%E5%AE%8F" }, "\u4F7F\u7528 Props \u5B8F")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%AE%B0%E5%BF%86-memoization" }, "\u8BB0\u5FC6 Memoization")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%8F%AF%E9%80%89%E9%81%93%E5%85%B7" }, "\u53EF\u9009\u9053\u5177")),
            React.createElement("li", null,
                React.createElement("a", { href: "#inline_props-%E5%AE%8F" }, "inline_props \u5B8F")))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-02-09T04:55:28.000Z",
    'updated': null,
    'excerpt': "所有用于组件的道具都必须 Properties 特征，而 Props 派生宏则可以自动实现它。 在本章中我们会了解到： - 使用 Props 宏 - 记忆 Memoization - 可选的道具 - Inline_props 宏 使用 Props 宏 默认的 Scope 不包含任何数据： /...",
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
