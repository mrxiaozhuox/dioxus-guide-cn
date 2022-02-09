import projectConfig from '/pagic.config.js';
export default {
    'prev': undefined,
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'main' },
    'pagePath': "docs/ui/lists.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "docs/ui/lists.html",
    'title': "列表渲染",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>列表渲染</h1>\n<p>有什么我们需要将同一组件渲染多次，那我们就可以把它当成一个列表来渲染。</p>\n<h2 id="%E9%80%9A%E8%BF%87%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93">通过列表渲染<a class="anchor" href="#%E9%80%9A%E8%BF%87%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93">§</a></h2>\n<p>想想我们常用的一些网站：类似于知乎，在主页中会有很多条同样的 <code>文章</code> 块。</p>\n<p>它看起来就是这样的：每一个 Post 组件包含了具体内容，但是页面又由多个组件组成。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        <span class="token class-name">Post</span> <span class="token punctuation">{</span><span class="token comment">/* some properties */</span><span class="token punctuation">}</span>\n        <span class="token class-name">Post</span> <span class="token punctuation">{</span><span class="token comment">/* some properties */</span><span class="token punctuation">}</span>\n        <span class="token class-name">Post</span> <span class="token punctuation">{</span><span class="token comment">/* some properties */</span><span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>下面这个例子可以将一个列表渲染为一堆 <code>li</code> 标签：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"jim"</span><span class="token punctuation">,</span> <span class="token string">"bob"</span><span class="token punctuation">,</span> <span class="token string">"jane"</span><span class="token punctuation">,</span> <span class="token string">"doe"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> name_list <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>name<span class="token closure-punctuation punctuation">|</span></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    li <span class="token punctuation">{</span> <span class="token string">"{name}"</span> <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    ul <span class="token punctuation">{</span>\n        name_list\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>上面的代码会先遍历生成单独的 <code>li</code> 标签，再将它全部插入到 <code>ul</code> 中。</p>\n<p>它的 HTML 代码会是这样的：</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span> jim <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span> bob <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span> jane <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span> doe <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n</code></pre>\n<h2 id="%E8%BF%87%E6%BB%A4%E8%BF%AD%E4%BB%A3%E5%99%A8">过滤迭代器<a class="anchor" href="#%E8%BF%87%E6%BB%A4%E8%BF%AD%E4%BB%A3%E5%99%A8">§</a></h2>\n<p>Rust 的迭代器非常强大，特别是用于过滤数据时。在构建用户界面时，你可能希望显示被过滤的项目列表。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"jim"</span><span class="token punctuation">,</span> <span class="token string">"bob"</span><span class="token punctuation">,</span> <span class="token string">"jane"</span><span class="token punctuation">,</span> <span class="token string">"doe"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> name_list <span class="token operator">=</span> names\n    <span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>name<span class="token closure-punctuation punctuation">|</span></span> name<span class="token punctuation">.</span><span class="token function">starts_with</span><span class="token punctuation">(</span><span class="token char string">\'j\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>name<span class="token closure-punctuation punctuation">|</span></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span> li <span class="token punctuation">{</span> <span class="token string">"{name}"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>render()</code> 方法非常高效，所以最好的做法是让它为我们完成大部分的工作。</p>\n<h2 id="%E5%88%97%E8%A1%A8%E9%94%AE">列表键<a class="anchor" href="#%E5%88%97%E8%A1%A8%E9%94%AE">§</a></h2>\n<p>在很多需要对列表 <code>增删改查</code> 的情况下，我们需要对列表的每一项提供一个 <code>键</code> 让它可被 Dioxus 识别。\n否则你将不知道哪行对应的是哪条数据了。</p>\n<pre class="language-autoit"><code class="language-autoit">rsx!<span class="token punctuation">(</span> li { key<span class="token punctuation">:</span> <span class="token string">"a"</span> } <span class="token punctuation">)</span>\n</code></pre>\n<p>设置一个便于识别的键可帮助 Dioxus 更好的分辨它，并提供相应的反馈。</p>\n<h3 id="%E4%B8%BA%E4%BB%80%E4%B9%88-dioxus-%E9%9C%80%E8%A6%81%E9%94%AE">为什么 Dioxus 需要键？‘<a class="anchor" href="#%E4%B8%BA%E4%BB%80%E4%B9%88-dioxus-%E9%9C%80%E8%A6%81%E9%94%AE">§</a></h3>\n<p>如果一个列表了没有唯一标识（我们也可称之为索引），那我们无法确定哪条数据对应哪些东西。\n这就很象我们常用的 HashMap ，只有拥有 <code>Key</code> 我们才能快速明白对应关系。而不是像 Vec 一样删除一条数据其他都乱了。</p>\n<p>注意，键只会被 Dioxus 私下使用。</p>\n<pre class="language-autoit"><code class="language-autoit">Post { key<span class="token punctuation">:</span> <span class="token string">"{key}"</span><span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token string">"{id}"</span> }\n</code></pre>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@17.0.2/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@17.0.2/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'footer': React.createElement("footer", null,
        "Powered by\u00A0",
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u5217\u8868\u6E32\u67D3"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>有什么我们需要将同一组件渲染多次，那我们就可以把它当成一个列表来渲染。</p>\n<h2 id="%E9%80%9A%E8%BF%87%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93">通过列表渲染<a class="anchor" href="#%E9%80%9A%E8%BF%87%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93">§</a></h2>\n<p>想想我们常用的一些网站：类似于知乎，在主页中会有很多条同样的 <code>文章</code> 块。</p>\n<p>它看起来就是这样的：每一个 Post 组件包含了具体内容，但是页面又由多个组件组成。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    div <span class="token punctuation">{</span>\n        <span class="token class-name">Post</span> <span class="token punctuation">{</span><span class="token comment">/* some properties */</span><span class="token punctuation">}</span>\n        <span class="token class-name">Post</span> <span class="token punctuation">{</span><span class="token comment">/* some properties */</span><span class="token punctuation">}</span>\n        <span class="token class-name">Post</span> <span class="token punctuation">{</span><span class="token comment">/* some properties */</span><span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>下面这个例子可以将一个列表渲染为一堆 <code>li</code> 标签：</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"jim"</span><span class="token punctuation">,</span> <span class="token string">"bob"</span><span class="token punctuation">,</span> <span class="token string">"jane"</span><span class="token punctuation">,</span> <span class="token string">"doe"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> name_list <span class="token operator">=</span> names<span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>name<span class="token closure-punctuation punctuation">|</span></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    li <span class="token punctuation">{</span> <span class="token string">"{name}"</span> <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token macro property">rsx!</span><span class="token punctuation">(</span>\n    ul <span class="token punctuation">{</span>\n        name_list\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n<p>上面的代码会先遍历生成单独的 <code>li</code> 标签，再将它全部插入到 <code>ul</code> 中。</p>\n<p>它的 HTML 代码会是这样的：</p>\n<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span> jim <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span> bob <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span> jane <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span> doe <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n</code></pre>\n<h2 id="%E8%BF%87%E6%BB%A4%E8%BF%AD%E4%BB%A3%E5%99%A8">过滤迭代器<a class="anchor" href="#%E8%BF%87%E6%BB%A4%E8%BF%AD%E4%BB%A3%E5%99%A8">§</a></h2>\n<p>Rust 的迭代器非常强大，特别是用于过滤数据时。在构建用户界面时，你可能希望显示被过滤的项目列表。</p>\n<pre class="language-rust"><code class="language-rust"><span class="token keyword">let</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"jim"</span><span class="token punctuation">,</span> <span class="token string">"bob"</span><span class="token punctuation">,</span> <span class="token string">"jane"</span><span class="token punctuation">,</span> <span class="token string">"doe"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> name_list <span class="token operator">=</span> names\n    <span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>name<span class="token closure-punctuation punctuation">|</span></span> name<span class="token punctuation">.</span><span class="token function">starts_with</span><span class="token punctuation">(</span><span class="token char string">\'j\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token closure-params"><span class="token closure-punctuation punctuation">|</span>name<span class="token closure-punctuation punctuation">|</span></span> <span class="token macro property">rsx!</span><span class="token punctuation">(</span> li <span class="token punctuation">{</span> <span class="token string">"{name}"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p><code>render()</code> 方法非常高效，所以最好的做法是让它为我们完成大部分的工作。</p>\n<h2 id="%E5%88%97%E8%A1%A8%E9%94%AE">列表键<a class="anchor" href="#%E5%88%97%E8%A1%A8%E9%94%AE">§</a></h2>\n<p>在很多需要对列表 <code>增删改查</code> 的情况下，我们需要对列表的每一项提供一个 <code>键</code> 让它可被 Dioxus 识别。\n否则你将不知道哪行对应的是哪条数据了。</p>\n<pre class="language-autoit"><code class="language-autoit">rsx!<span class="token punctuation">(</span> li { key<span class="token punctuation">:</span> <span class="token string">"a"</span> } <span class="token punctuation">)</span>\n</code></pre>\n<p>设置一个便于识别的键可帮助 Dioxus 更好的分辨它，并提供相应的反馈。</p>\n<h3 id="%E4%B8%BA%E4%BB%80%E4%B9%88-dioxus-%E9%9C%80%E8%A6%81%E9%94%AE">为什么 Dioxus 需要键？‘<a class="anchor" href="#%E4%B8%BA%E4%BB%80%E4%B9%88-dioxus-%E9%9C%80%E8%A6%81%E9%94%AE">§</a></h3>\n<p>如果一个列表了没有唯一标识（我们也可称之为索引），那我们无法确定哪条数据对应哪些东西。\n这就很象我们常用的 HashMap ，只有拥有 <code>Key</code> 我们才能快速明白对应关系。而不是像 Vec 一样删除一条数据其他都乱了。</p>\n<p>注意，键只会被 Dioxus 私下使用。</p>\n<pre class="language-autoit"><code class="language-autoit">Post { key<span class="token punctuation">:</span> <span class="token string">"{key}"</span><span class="token punctuation">,</span> id<span class="token punctuation">:</span> <span class="token string">"{id}"</span> }\n</code></pre>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#%E9%80%9A%E8%BF%87%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93" }, "\u901A\u8FC7\u5217\u8868\u6E32\u67D3")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E8%BF%87%E6%BB%A4%E8%BF%AD%E4%BB%A3%E5%99%A8" }, "\u8FC7\u6EE4\u8FED\u4EE3\u5668")),
            React.createElement("li", null,
                React.createElement("a", { href: "#%E5%88%97%E8%A1%A8%E9%94%AE" }, "\u5217\u8868\u952E"),
                React.createElement("ol", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#%E4%B8%BA%E4%BB%80%E4%B9%88-dioxus-%E9%9C%80%E8%A6%81%E9%94%AE" }, "\u4E3A\u4EC0\u4E48 Dioxus \u9700\u8981\u952E\uFF1F\u2018")))))),
    'author': "mrxiaozhuox",
    'contributors': [
        "mrxiaozhuox"
    ],
    'date': "2022-02-09T04:55:28.000Z",
    'updated': null,
    'excerpt': "有什么我们需要将同一组件渲染多次，那我们就可以把它当成一个列表来渲染。 通过列表渲染 想想我们常用的一些网站：类似于知乎，在主页中会有很多条同样的 文章 块。 它看起来就是这样的：每一个 Post 组件包含了具体内容，但是...",
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