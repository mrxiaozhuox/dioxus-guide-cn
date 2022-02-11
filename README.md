# 介绍 - Dioxus

![DIOXUS_LOGO](https://dioxuslabs.com/guide/images/dioxuslogo_full.png)

**Dioxus** 是一款用于构建跨平台用户界面的框架（生态系统），它使用 Rust 编程语言。
这本指南将带领你学习并使用它。（我们会尝试在 网页端、移动端、桌面端 使用 Dixous 框架）

```rust
fn App(cx: Scope) -> Element {
    let (count, set_count) = use_state(&cx, || 0);

    cx.render(rsx!(
        h1 { "High-Five counter: {count}" }
        button { onclick: move |_| set_count(count + 1), "Up high!" }
        button { onclick: move |_| set_count(count - 1), "Down low!" }
    ))
};
```

Dioxus 与 React 有许多的相似之处，如果本指南中有任何未阐述清楚的概念，你可以前往 React 文档中查询。
我们致力于在 Rust 生态环境中构建一个令人熟悉的UI框架，如果你已经熟悉 React 了，那么 Dioxus 将对你来说非常的简单！
（如果你是新手，这本指南同样适合你哦qwq）

## 多平台

`Dioxus` 是一个支持多平台的开发包，这意味着它的核心代码可以在任何平台下被使用。
与许多其他 Rust 前端工具包不同，Dioxus 与 Web-Sys 并没有本质上的联系。
事实上，每个元素和事件监听器都可以在编译时被更改。

目前为止，我们拥有以下渲染器：

- WebSys (为 WASM 提供)
- Tao/Tokio (为桌面端提供)
- Tao/Tokio (为移动端提供)
- SSR (用于生成静态 SSR)
- TUI/Rink (用于制作终端程序)

### Web 支持

网页端是 Dioxus 最为重要的支持平台，要想让你的项目能够在 Web 中运行，首先会将其编译为 **WebAssembly** 并启用 `Dioxus-Web` 功能。
WASM 有很多系统限制，这导致你的代码不能包含任何原生的系统调用（计时器，IO 等）

鉴于 Web 平台功能已经非常成熟了，所以说后期的 API 变化会很小。

一些 Web 端的演示项目：

- [TodoMVC](https://gitee.com/dioxus-cn/example-projects/tree/master/todomvc)
- [ECommerce](https://gitee.com/dioxus-cn/example-projects/tree/master/ecommerce-site)

![TODOMVC_IMG](https://gitee.com/dioxus-cn/example-projects/raw/master/todomvc/example.png)

### SSR 支持

Dioxus 支持 SSR 的服务端渲染。

为了从 WebServer 渲染到静态文件 `.html`，你需要确保在 Dioxus 功能中启用了 SSR 特性。

```rust
let contents = dioxus::ssr::render_vdom(&dom);
```

我们不认为 SSR API 在未来会有太大的变化。

一些 SSR 端的演示项目：

- [官方网站](https://github.com/dioxusLabs/docsite)


### Desktop 支持

桌面端也是 Dioxus 生态中非常强大的一项，但与 Web 端相比，它所能做的还远远不够。
目前，桌面应用使用 WebView 库渲染，但你的 Rust 代码依然是在本地系统运行的。
这意味着部分浏览器 API 并不可用，所以说它并不能完全支持 Web 的功能。
但是原生的系统 API 则是可以使用的（类似于 Websockets、文件系统等 ）

一些 Desktop 端的演示项目：

- [文件浏览器](https://gitee.com/dioxus-cn/example-projects/tree/master/file-explorer)
- [WiFi 扫描器](https://gitee.com/dioxus-cn/example-projects/blob/master/wifi-scanner)

![FE_IMG](https://gitee.com/dioxus-cn/example-projects/raw/master/file-explorer/image.png)


### Mobile 支持

移动端是目前 Dioxus 最有待提升的一项，它现在非常有很多问题需要处理。
移动端应用使用 WebView 渲染，这意味着动画、透明和本地小部件目前是无法实现的。
此外，iOS 是目前唯一支持的移动平台。( Dioxus 使用的 Rust 窗口库- tao -目前不支持Android。)

#### 什么样的情况下你可以选择使用 Dioxus 开发移动端：

如果你不关心 原生App 中类似于动画、透明、小组件等功能，而仅仅是 渲染/处理 一些简单的数据。
那么你可以尝试使用 `Dioxus-Mobile` （我们希望它在后续能不断完善，越做越好！）

一些 Mobile 端的演示项目：

- [Todo App](https://gitee.com/dioxus-cn/example-projects/blob/master/ios_demo)

