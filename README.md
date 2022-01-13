# 介绍 - Dioxus

![DIOXUS_LOGO](https://dioxuslabs.com/guide/images/dioxuslogo_full.png)

**Dioxus** 是一款用于构建跨平台用户界面的框架（生态系统），它使用 Rust 编程语言。
这本指南将带领你学习并使用它。（我们会尝试在 网页端、移动端、桌面端 使用 Dixous 框架）

```rust
fn App(cx: Scope) -> Element {
    let mut count = use_state(&cx, || 0);

    cx.render(rsx!(
        h1 { "High-Five counter: {count}" }
        button { onclick: move |_| count += 1, "Up high!" }
        button { onclick: move |_| count -= 1, "Down low!" }
    ))
};
```

Dioxus 与 React 有许多的相似之处，如果本指南中有任何未阐述清楚的概念，您可以前往 React 文档中查询。
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

网页端是 Dioxus 最为重要的支持平台，要想让您的项目能够在 Web 中运行，首先会将其编译为 **WebAssembly** 并启用 `Dioxus-Web` 功能。
WASM 有很多系统限制，这导致你的代码不能包含任何原生的系统调用（计时器，IO 等）

鉴于 Web 平台功能已经非常成熟了，所以说后期的 API 变化会很小。

一些 Web 端的演示项目：

- [TodoMVC](https://github.com/DioxusLabs/example-projects/tree/master/todomvc)
- [ECommerce](https://github.com/DioxusLabs/example-projects/tree/master/ecommerce-site)

![TODOMVC_IMG](https://github.com/DioxusLabs/example-projects/raw/master/todomvc/example.png)