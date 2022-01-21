# 钩子（Hooks）与内部状态（State）

在本章节中，我们将更加深入的了解 Hook 的工作原理。

## Hooks 理论

在过去的几十年里，计算机学者和开发者们一直在试图寻找一种设计用户界面的 “正确方法”。

现在来看，已经出现了很多种设计思路，而它们都各有优势，而大致上有这两种：

- 即时式用户界面 - 它会在每次更新时刷新整个界面内容。
- 保留式用户界面 - 它仅仅会更新被变化的那一部分内容。

通常来说，即时式的设计方法会更加方便开发，但随着功能的增加，也会出现很多问题。（比如性能）
现代的大部分应用都采用了 “保留式” 的方案：你的代码更改了具体的内容，但呈现程序负责实际绘制到屏幕上。
状态信息也不会因为 UI 的更新而被重置，它会在整个程序的运行周期内始终保持不变（除非人为的触发了更新），
而 Dioxus 提供了一种机制来保持这些状态信息。

在这里特意声明一下：在运行过程中，一个组件的函数（包括 app 的入口），都不止运行一次，它会在数据更新后被重新调用。
这就是上面说到保存的意思，使用 Hook 工具下的 API 获取的值、引用、可变引用都是已经被保存的值（也就是包含修改的值），而不是第一次初始化的值。

## Hooks 机制

为了在重复的渲染期间保持状态，Dioxus 为 Hook 提供了 `use_hook` 的 API ，它会返回一个可变的数据引用。
它来自于 `use_hook` 中的初始化函数最终值。

```rust
fn example(cx: Scope) -> Element {
    let name: &mut String = cx.use_hook(|| "John Doe".to_string());
    // 后续代码...
}
```

我们可以在事件中对它进行更新：

```rust
fn example(cx: Scope) -> Element {
    let name: &mut String = cx.use_hook(|| "John Doe".to_string());

    cx.render(rsx!(
        button {
            onclick: move |_| name.push_str(".."),
        }
    ))
}
```

准确来说，我们每一次调用 `use_hook` 都会获得一个 `&mut T` 的值。

```rust
fn example(cx: Scope) -> Element {
    let name: &mut String = cx.use_hook(|| "John Doe".to_string());
    let age: &mut u32 = cx.use_hook(|| 10);
    let friends: &mut Vec<String> = cx.use_hook(|| vec!["Jane Doe".to_string()]);
}
```

在内部，我们使用一个数组来保存每一次 use_hook 的信息，同时也包含了它们的顺序。

在内部，它们大概是这样存放的：
```rust
[
    Hook<String>,
    Hook<u32>,
    Hook<String>,
]
```

它会严格按照我们声明时的顺序被保存，所以说 Hooks Api 不允许被使用在任何**条件语句**中，它会打断顺序，从而无法完成匹配。
被打乱的调用顺序会直接的导致 Dioxus 程序的 painc 错误，因为它无法处理这种问题。当然有一种函数 `try_use_hook` ，
但我们并不建议您在项目中使用它。

## 构建 Hooks

`use_hook` 所返回的 `&mut T` 在很多场景下并不方便使用。

考虑一下，我们尝试将 `&mut String` 同时传递给两个事件处理器：

```rust
fn example(cx: Scope) -> Element {
    let name: &mut String = cx.use_hook(|| "John Doe".to_string());

    cx.render(rsx!(
        button { onclick: move |_| name.push_str("yes"), }
        button { onclick: move |_| name.push_str("no"), }
    ))
}
```

Rust 不会允许它通过编译！我们不能将**唯一的**可变引用 “分成两份” 来使用。
不过我们可以将可变引用重新借用为不可变引用交给两个程序使用：

```rust
fn example(cx: Scope) -> Element {
    let name: &String = &*cx.use_hook(|| "John Doe".to_string());

    cx.render(rsx!(
        button { onclick: move |_| log::info!("{}", name), }
        button { onclick: move |_| log::info!("{}", name), }
    ))
}
```

不过我们可以使用 `Cell` 来通过内部可变性来更新值，它的开销几乎为零，不过它的限制要比类似的 `RefCell` 多一些。

```rust
fn example(cx: Scope) -> Element {
    let name: &Cell<&'static str> = cx.use_hook(|| Cell::new("John Doe"));

    cx.render(rsx!(
        button { onclick: move |_| name.set("John"), }
        button { onclick: move |_| name.set("Jane"), }
    ))
}
```

## 通过 Hooks 更新

类似于 `use_state` 和 `use_ref` 通过封装 `hooks` 来实现可变 `Copy` ，
此外，每当设置了新值，它还会将组件标记为 `dirty`。组件就知道需要要被更新。

```rust
fn example(cx: Scope) -> Element {
    let name = use_state(&cx, || "Jack");

    cx.render(rsx!(
        "Hello, {name}"
        button { onclick: move |_| name.set("John"), }
        button { onclick: move |_| name.set("Jane"), }
    ))
}
```

在内部，我们的 `set` 函数类似于这样：

```rust
impl<'a, T> UseState<'a, T> {
    fn set(&self, new: T) {
        // 将内容进行替换更新
        self.value.set(new);

        // 将当前组件标记为需要刷新
        self.cx.needs_update();
    }
}
```

我们所实现的大部分 Hooks 都提供了 Deref 在它们的值之中，如果你想直接访问它们的值：

```rust
fn example(cx: Scope) -> Element {
    let name = use_state(&cx, || "Jack");

    match *name {
        "Jack" => {}
        "Jill" => {}
        _ => {}
    }
}
```

## Dioxus-Hooks 提供的方法

我们通过 `Dioxus-Hooks` 为各位开发者提供了以下这些钩子方法，请根据需求自行调用：

- use_state - 储存状态信息并在适当的时候更新
- use_ref - 使用 Refcell 存放未实现 Clone 的数据
- use_future - 存放在初始化结束后需要的 Future
- use_coroutine - 存放可以被 启动/暂停/通讯的 Future
- use_noderef - 存放本地元素的句柄
- use_callback - 存放实现了 PartialEq 的回调用于记忆化
- use_provide_context - 暴露状态数据到派生组件中
- use_context - 使用 use_provide_context 的状态数据