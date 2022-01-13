# “Hello World” 桌面程序

让我们通过一个简单的 `Hello World` 程序来学习 Dioxus 的基本使用吧！

在本章节中，我们将讨论：

- 通过 Cargo 创建一个新项目
- 添加 Dioxus 工具包到新项目中
- 启动属于我们的第一个 Dioxus 桌面程序

## 创建项目

首先，让我们开始一个新的项目，Rust 中有两种程序：二进制程序 `main.rs` 和库程序 `lib.rs`，
而在这里，我们需要的是一个二进制可运行的程序（bin），所以说我们的创建命令为：

```
cargo new --bin hello-dioxus
```

现在我们可以通过 `cd` 命令进入文件夹了：

```
$ cd hello-dioxus
$ tree
.
├── Cargo.toml
├── .git
├── .gitignore
└── src
    └── main.rs
```

`Cargo` 初始化的 文件/文件夹 有：Git仓库信息、Cargo.toml Cargo的配置文件、src文件夹 存放代码的目录。`main.rs` 则是整个应用的入口了！
当我们的程序被运行是，则会调用 `main.rs` 中的 `main` 函数。

### 代码目录

```
$ cat src/main.rs
```

```rust
fn main() {
    println!("Hello, world!");
}
```

当代码被运行时，`Println!` 宏会向终端打印一个 `Hello, world!`。

```
$ cargo run
   Compiling hello-dioxus v0.1.0
    Finished dev [unoptimized + debuginfo] target(s) in 0.41s
     Running `target/debug/hello-dioxus`
Hello, world!
```

### 应用配置

`Rust` 项目的依赖管理、项目信息都在 `Cargo.toml` 文件中保存。

```
$ cat Cargo.toml
```

```
[package]
name = "hello-dioxus"
version = "0.1.0"
edition = "2018"

[dependencies]
```

它使用 **TOML** 格式，默认情况下没有任何依赖库。

#### 添加依赖库

如果您已经安装了 `cargo-edit` 拓展命令，您可以很轻松的添加一个依赖到您的 `Cargo.toml` 中：

```
$ cargo add dioxus --features desktop
```

将 `features` desktop 引入项目中是非常重要的，`dioxus` 就像一个包装盒，里面有很多各种各样的支持 `Feature`。
如果这个项目用于 `Desktop` 开发，那么你就需要加入这个 `Feature` 才能使用它。


## 第一个 Dioxus 项目

```rust
use dioxus::prelude::*;

fn main() {
    dioxus::desktop::launch(App);
}

fn App(cx: Scope) -> Element {
    cx.render(rsx! (
        div { "Hello, world!" }
    ))
}
```

![HELLOWORLD_IMG](https://dioxuslabs.com/guide/images/helloworld.png)