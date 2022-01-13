# 使用元素声明UI

每一个 用户UI 都是由多个元素交叉组织而成，一堆堆元素组成了一切复杂的应用程序界面。
在 Dioxus 中，我们可以使用组件来包装元素，再将组件当成一个更到的元素。
这样一层一层的包裹，便形成了最终的应用程序！

## 声明元素

Dioxus 基于 HTML\CSS 渲染器，所以说我们可以直接使用 HTML 所支持的所有标签，我们需要将声明包含在 `rsx!()` 宏中：

```rust
rsx!(
    div {}
)
```

或者使用 `Dioxus-SSR` 直接获取有效的 HTML 元素：

```rust
dioxus::ssr::render_lazy(rsx!(
    div {}
))
```

它的结果为：（这就是一个HTML标签）

```html
<div></div>
```

我们可以使用 `$tag_name {}` 生成任何一个有效的 HTML 标签。


## 编排元素

当然，我们也可以像 HTML 一样在元素中嵌入其他子元素，它非常简单：

```rust
rsx!(
    div {
        h1 {}
        h2 {}
        p {}
    }
)
```

它会渲染为这样的 HTML 代码：

```html
<div>
    <h1></h1>
    <h2></h2>
    <p></p>
</div>
```

这看起来很酷！我们可以用它来直接构建我们想要的 UI 结构了！

## 元素文本

光有元素标签可远远不够，我们还需要在元素中加入一些文本吧：

```rust
rsx!(
    div {
        h1 { "标题" }
        p { "一些文本内容" }
    }
)
```

文本往往不可能一成不变，因为我们需要动态应用，而不是定义好的内容！

```rust
let name = "mrxiaozhuox";
rsx!("hello {name}")
```

上方代码会将 `name` 内容绑定到内容 `{name}` 中，类似于 Rust 的 `format!("{}", "hi");`

但是您不能在字符串内部进行任何逻辑判断，或者完成调用方法之类的操作。但是我们可以使用：`format_args!()`

```rust
rsx!( {format_args!("Hello {}", if enabled { "Jack" } else { "Bob" } )] )
```

或者这样进行字符串拼接：

```rust
rsx!( "Hello ",  [if enabled { "Jack" } else { "Bob" }] )
```

但是我们建议您在 `rsx!()` 外将字符串处理好，再输入到元素中。

```rust
let name = if enabled { "Jack" } else { "Bob" };
rsx! ( "hello {name}" )
```

## 元素属性

除了渲染的文本，HTML 元素中还可以设置很多自定义属性（这非常重要）

在 Dioxus 中，声明元素属性的方法也非常的简洁：

```rust
rsx!(
    div {
        hidden: "true",
        background_color: "blue",
        class: "card color-{mycolor}"
    }
)
```

我们在所有元素标签内部定义了它们常用的属性，这样你在定义时可以防止拼写错误，同时还很方便。
但是如果你想向元素加入一个 `Dioxus-HTML` 相应元素标签中未声明的属性时，你可以这么做：

```
rsx!(
    div {
        "customAttr": "这是一个自定义属性"
    }
)
```

> 注：如果一个属性是常用的，请向我们发起 Issue 并告知这个 `Attrbuite` 是需要的！

任何属性必须放置在 `内容` 和 `子元素` 之前：

```rust
// 正确的示例
rsx!(
    div {
        background_color: "blue",
        "hello world"
    }
)

// 错误的示例
rsx!(
    div {
        "hello world"
        background_color: "blue",
    }
)
```

## 监听器

元素监听器是一种特殊的属性，它接受一个闭包函数（回调函数），当事件发生时，回调函数会被调用。

```rust
rsx!(
    div {
        onclick: move |_| log::debug!("Div 被点击了！"),
    }
)
```

我们将在后面的章节中着重讲解这方面的内容。