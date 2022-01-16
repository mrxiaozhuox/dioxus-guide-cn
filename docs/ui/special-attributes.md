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

## 拦截默认事件

`prevent_default` 属性将会对默认的事件处理进行拦截，可用于拦截表单的提交之类的。

```rust
rsx!{
    input {
        oninput: move |_| {},
        prevent_default: "oninput",

        onclick: move |_| {},
        prevent_default: "onclick",
    }
}
```


## 传递属性到子元素

就像 Dioxus 支持将 `Props` 拓展到组件中一样，我们也支持将 属性 扩展到组件中。
这允许您将任意属性通过 Props 传递到元素中。

```rust
#[derive(Props)]
pub struct InputProps<'a> {
    pub children: Element<'a>,
    pub attributes: Attribute<'a>
}

pub fn StateInput<'a>(cx: Scope<'a, InputProps<'a>>) -> Element {
    cx.render(rsx! (
        input {
            ..cx.props.attributes,
            &cx.props.children,
        }
    ))
}
```
> 请注意：这个特性将在 v0.1.8 版本实现。


## 控制表单的特殊属性

在 Dioxus 我们如何实现所谓的 `双向绑定` 呢？

双向绑定指的不单单是页面会根据后端变量值实时更新前端数据，也可以在前端的编辑操作下更新后端变量值。
比如说当一个输入框更新了数据，则同时更新后端变量值：

```rust
let value = use_state(&cx, || String::from("hello world"));

rsx! {
    input {
        oninput: move |evt| value.set(evt.value.clone()),
        value: "{value}",
    }
}
```

在上方演示中，输入框便编辑后，回调函数会自动更新 value 的值。


```rust
// 这是一个更直观的演示代码
let value = use_state(&cx, || String::from("hello world"));

rsx! {
    input {
        oninput: move |evt| value.set(evt.value.clone()),
        value: "{value}",
    }
    p { "Input Value: {value}" }
}
```

在上方代码中，当输入框的内容被改变，`P` 标签内容也会随之改变。


## Javascript 代码事件

如果您希望在 onclick 等事件中运行 JS 代码，你可以直接传递一个 JS 代码字符串：

```
rsx!{
    div {
        // 使用 Rust 处理
        oninput: move |_| {},

        // 使用 Javascript 处理
        oninput: "alert('hello world')",
    }
}
```

当然，这里也有一个简单的封装库可以实现 JS 代码调用：[YuKun-Liu/Golde](https://github.com/mrxiaozhuox/golde) 
而这个库我们将在后面的第三方包内容中讲到。

到此，UI设计方向的内容我们算是讲解完毕了，接下来我们会进入组件封装的内容。