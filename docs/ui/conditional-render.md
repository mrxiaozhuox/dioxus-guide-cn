# 条件渲染

组件往往需要在不同的情况下渲染不同的内容到页面上，页面的内容并不是一成不变的。
我们常常需要根据不同的情况去渲染界面。

## 有条件的返回元素

在一些组件中，你可能需要在不同的判断语句下返回不同的 Element 元素，我们来完成一个简单的 Demo ：

- 在线：显示应用页面
- 离线：显示登陆页面

```rust
#[derive(Props, PartialEq)]
struct AppProps {
    logged_in: bool
}
```

我们在 `道具(Props)` 中定义了一个是否登陆的 Bool 值，它将用于判断我们的登陆状态。

```rust
fn App(cx: Scope<AppProps>) -> Element {
    if props.logged_in {
        cx.render(rsx!{
            DashboardScreen {}
        })
    } else {
        cx.render(rsx!{
            LoginScreen {}
        })
    }
}
```

在上方代码中，我们判断了道具中 `logged_in` 变量的状态，并返回了相应的自定义组件渲染。

> 自定义组件将在后续内容中讲解到。

## 使用匹配语句

匹配语句其实和上面的判断方法很像，以下是大概的使用演示：

```rust
fn App(cx: Scope)-> Element {
    match get_name() {
        Ok(name) => cx.render(rsx!( "你好，{name}" )),
        Err(err) => cx.render(rsx!( "对不起，我还不知道你的名字，因为出现错误了： {err}" )),
    }
}
```

如果你想让代码变得更加简洁，省略掉 `cx.render` 这一部分，你可以这样：

```rust
fn App(cx: Scope)-> Element {
    match get_name() {
        "jack" => rsx!(cx, "你好啊杰克，最近怎么样？" ),
        "diane" => rsx!(cx, "你好啊黛安娜，最近怎么样？" ),
        name => rsx!(cx, "你好：{name}" ),
    }
}
```

为 `rsx!()` 在第一个参数处传递 cx 可以让宏自动调用 render 方法。

## RSX 嵌套

我们可以在 `rsx!()` 中嵌套一个新的 `rsx!()`，类似于这样：


```rust
rsx!(
    div {
        rsx!(
            "more rsx!"
        )
    }
)
```

也可以将它们分开调用（比如保存到一个变量值中）：

```rust
let title = rsx!( "more rsx!" );

rsx!(
    div {
        title
    }
)
```

如果我们希望条件运行后的结果同时包含一个 **头组件** 和 **尾组件**，那这对我们来说很有用：

```rust
let screen = match logged_in {
    true => rsx!(DashboardScreen {}),
    false => rsx!(LoginScreen {})
};

cx.render(rsx!{
    Navbar {}
    screen,
    Footer {}
})
```

## 布尔映射

我们建议您尝试有条件地 隐藏/显示 一个元素时使用 “布尔映射” 模式。

Rust 允许您通过调用 `and_then()` 将任何布尔值转换为任何其他类型。我们可以在组件中通过映射到某些元素来利用这个功能。

```rust
let show_title = true;
rsx!(
    div {
        show_title.and_then(|| rsx!{
            "这是文章标题"
        })
    }
)
```

我们可以用它做很多事情，再比如：

```rust
let user_name = Some("张三");
rsx!(
    div {
        user_name.map(|name| rsx!("你好 {name}"))
    }
)
```

## 空元素

有时候，你并不打算返回任何元素时，你可以直接返回一个 `None`，因为 `Element` 本质就是 `Option<VNode>` 的别名。
所以说它支持你返回 `None` 这个空的值。

```rust
fn demo(cx: Scope) -> Element {
    None
}
```