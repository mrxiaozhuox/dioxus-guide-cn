# 组件属性

所有用于组件的属性都必须 `Properties` 特征，而 `Props` 派生宏则可以自动实现它。

在本章中我们会了解到：

- 使用 Props 宏
- 记忆 Memoization
- 可选的属性
- Inline_props 宏

## 使用 Props 宏

默认的 `Scope` 不包含任何数据：

```rust
// 这是一个不包含任何属性的 Scope
Scope<()>
// 它和上面的不包含数据的 Scope 相等
Scope
```

接下来我们定义一个 `Props`，你需要声明一个结构体，并为它添加派生宏。

```rust
#[derive(Props)]
struct MyProps {
    name: String
}
```

上方的代码并不能被编译，因为结构体中没有任何借用，那则需要实现 `PartialEq` 。

```rust
#[derive(Props, PartialEq)]
struct MyProps {
    name: String
}
```

或者包含借用的：

```rust
#[derive(Props)]
struct MyProps<'a> {
    name: &'a str
}
```

----

接下来我们将 `MyProps` 引入到我们的组件中，并使用它：

```rust
fn Demo(cx: Scope<MyProps>) -> Element {
    todo!()
}
```

如果是包含借用的：

```rust
fn Demo<'a>(cx: Scope<'a, MyProps<'a>>) -> Element {
    todo!()
}
```

## 记忆 Memoization

如果您来自 React 框架，那么您应该会蛮好奇我们是怎么处理 `Memoization` 的：

> Memoization: 一种在数据被更新时，重新渲染页面的优化技术。
> 当页面被频繁刷新时，性能和用户体验都会大大降低，这时候就需要一些方法来完成优化。

当一个属性被更改，但它并不会影响到输出内容，那我们便不会刷新页面渲染。

比如：

```rust
fn Demo(cx: Scope) -> Element {
    let name = use_state(&cx, || String::from("bob"));
    let age = use_state(&cx, || 21);

    cx.render(rsx!{
        Name { name: name }
        Age { age: age }
    })
}
```

当 `Name` 被改变时，我们没必要对 `Age` 也进行刷新，因为它的属性没有任何变化，所以说刷新它只会造成无用的开销。

关于 `Memoization` 在什么时候有效：
当结构体实现了 `PartialEq` 时，它会被优化，但是如果结构中包含任何引用，则组件无法被优化，因为我们无法判断引用的 子/父 组件的更新状态。

## 可选属性

我们可以为 Dioxus 定义可选的属性（因为在部分情况下，有一些属性可以包含默认值）Dioxus 在这方面的设计借鉴了：[Rust-Typed-Builder](https://github.com/idanarye/rust-typed-builder) 的设计。

```rust
#[derive(Props, PartialEq)]
struct MyProps {
    
    name: String,

    #[props(optional)]
    description: Option<String>

}

fn Demo(cx: Scope<MyProps>) -> Element {
    // ...
}
```

可选属性：数据类型必须包含 `Default` 特征，在没有被赋值的时候，会为默认值。

`optional` 修饰符包含了两个独立的修饰符 `default` 和 `strip_option` 。

以下是完整的修饰符列表：

- **default** - 当属性没有填写时，赋予它默认值。
- **strip_option** - 自动包装 Some 数据。
- **optional** - 同时包含了 ***default*** 和 **strip_option** 修饰符。
- **into** - 在调用时自动调用 **into()** 函数。

## inline_props 宏

我们提供了 `inline_props` 宏，它将允许你在函数参数中设置 `Props` 。

```rust
#[derive(Props, PartialEq)]
struct TitleCardProps {
    title: String,
}

fn TitleCard(cx: Scope<TitleCardProps>) -> Element {
    cx.render(rsx!{
        h1 { "{cx.props.title}" }
    })
}   
```

也可以写成这样:

```rust
#[inline_props]
fn TitleCard(cx: Scope, title: String) -> Element {
    cx.render(rsx!{
        h1 { "{title}" }
    })
}  
```

我们认为库作者不应该在项目中使用这个宏，因为它无法实现 `可选` 功能，同时你无法更好的为组件编写文档。