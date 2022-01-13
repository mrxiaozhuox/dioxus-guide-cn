# 特殊属性

在这一章节中，我们需要了解 Dioxus 的特殊类型：

- dangerous_inner_html
- boolean attributes
- prevent_default
- ..attributes
- event handlers as string attributes
- value checked and selected

## 原生HTML

在 React 中，我们可以直接返回一段原生的 HTML/CSS/JS 代码到渲染器中，
而在 Dioxus 中我们使用 `dangerous_inner_html` 也能完成这一点。

比如说，我们希望被 `Markdown` 转换后的 `post.html` 能直接内嵌到 `Dioxus` 应用中。

```rust
fn BlogPost(cx: Scope) -> Element {
    let contents = include_str!("../post.html");
    cx.render(rsx!{
        div {
            class: "markdown",
            dangerous_inner_html: "{contents}",
        }
    })
}
```

上方代码就相当于直接把 HTML 代码写入到这个 div 中去了。

> 请一定要注意：`dangerous_inner_html` 的使用非常危险，因为它无法直接的防止注入攻击（XSS）所以说，请确保您传入的 HTML 是安全的。
> 否则直接使用所造成的问题是不可逆的，它非常危险！！

## 布尔属性

大多数属性都是 `K = V` 的结构，但是 HTML 中也有一些特殊的属性，它们的值为 Boolean 类型。
比如说我们最常用的 hidden 属性，它会隐藏这个标签的显示。比如说这样的一个 Demo 代码：

```rust
rsx!{
    div {
        hidden: "false",
        "hello"
    }
}
```

它的 HTML 结果为：

```html
<div>hello</div> 
```

最终并不会包含 `hidden` 属性，因为它的值为 `false`，除了 `false` 的所有值都为 `true` 。

以下是我们整理出的 Boolean 属性列表（只有它们支持 Boolean 设置）：

- allowfullscreen
- allowpaymentrequest
- async
- autofocus
- autoplay
- checked
- controls
- default
- defer
- disabled
- formnovalidate
- hidden
- ismap
- itemscope
- loop
- multiple
- muted
- nomodule
- novalidate
- open
- playsinline
- readonly
- required
- reversed
- selected
- truespeed

对于任何其他属性，`false` 的值将被直接发送到 DOM。