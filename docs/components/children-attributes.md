# 传递子元素和属性

有时候，你会希望将一些重要的功能封装在你的状态中，而不是直接嵌套在另一个组件中。
在这些情况下，你需要将元素和属性传递到组件中，并让组件适当地放置它们。

本章我们主要会了解到：

- 传递子元素到组件。
- 传递属性到组件。

## 使用情况

假设你正在构建一个网站，你需要对一个 `<a>` 标签进行封装：

```rust
rsx!(
    a {
        href: "https://google.com"
        "Link to google"
    }
)
```

如果你需要把 `a` 标签封装成一个组件：

```rust
#[derive(Props)]
struct ClickableProps<'a> {
    href: &'a str,
    title: &'a str
}

fn Clickable(cx: Scope<ClickableProps>) -> Element {
    cx.render(rsx!(
        a {
            href: "{cx.props.href}"
            "{cx.props.title}"
        }
    ))
}
```

接下来你可以这么使用它：

```rust
rsx!(
    Clickable {
        href: "https://google.com"
        title: "Link to Google"
    }
)
```

## 传递子元素

如果我们希望在我们的组件内可以嵌入其他子 元素/组件，那我们只需要定义一个类型为 Element 的道具：

```rust
#[derive(Props)]
struct ClickableProps<'a> {
    href: &'a str,
    body: Element<'a>
}

fn Clickable(cx: Scope<ClickableProps>) -> Element {
    cx.render(rsx!(
        a {
            href: "{cx.props.href}",
            &cx.props.body
        }
    ))
}
```

使用它：

```rust
rsx!(
    Clickable {
        href: "https://google.com"
        body: cx.render(rsx!(
            img { src: "https://www.google.com/logos/doodles/..." }
        ))
    }
)
```

## `Children` 特殊项

上面所介绍的在 `Props` 中嵌入一个子元素有时候使用起来并不方便，所以我们还内置了 `Children` 这种属性：

```rust
#[derive(Props)]
struct ClickableProps<'a> {
    href: &'a str,
    children: Element<'a>
}

fn clickable(cx: Scope<ClickableProps>) -> Element {
    cx.render(rsx!(
        a {
            href: "{cx.props.href}",
            &cx.props.children
        }
    ))
}
```

使用它则会方便很多：

```
rsx!(
    Clickable {
        href: "https://google.com"
        img { src: "https://www.google.com/logos/doodles/...." }
    }
)
```

它更像我们原生的 HTML 标签组件那种嵌入子元素了。

## 传递属性

你也可以将属性信息在 `Props` 中传递：

```rust
rsx!(
    Clickable {
        "class": "blue-button",
        "style": "background: red;"
    }
)
```

传递属性，你需要添加 `attributes` 字段：

```rust
#[derive(Props)]
struct ClickableProps<'a> {
    attributes: Attributes<'a>
}

fn clickable(cx: Scope<ClickableProps>) -> Element {
    cx.render(rsx!(
        a { 
            ..cx.props.attributes,
            "Any link, anywhere"
        }
    ))
}
```

## 传递处理器