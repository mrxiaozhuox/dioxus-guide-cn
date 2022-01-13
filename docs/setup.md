在本章中，我们将安装 `Rust` 编程语言与 `Dioxus` 配套工具。

## Rust 语言安装

> 您可以直接查阅：[Rust 官方安装文档](https://www.rust-lang.org/zh-CN/tools/install)

## 安装 Dioxus

安装完成后，如果你打算将应用部署到 **Web** 上，请确保将 `wasm32-unknown-unknown` 作为运行目标。

```
rustup target add wasm32-unknown-unknown
```

## 安装 Dioxus-CLI

`Dioxus-Cli` 可以帮助您 创建/管理 您的 Dioxus 项目，所以说我们建议您安装它：

```
cargo install dioxus-cli
```

您可以使用以下命令 更新/覆盖 之前的 dioxus-cli 版本：

```
cargo install --force dioxus-cli
```

## Cargo 拓展包

如果您想更方便的使用 `cargo` 命令，那么我们为您推荐几个有意思的拓展包：

- [cargo edit](https://github.com/killercup/cargo-edit) - 通过命令添加包依赖项
- [cargo-expand](https://github.com/dtolnay/cargo-expand) - 获得宏展开的调用代码
- [cargo tree](https://doc.rust-lang.org/cargo/commands/cargo-tree.html) - 检查项目的依赖树关系

## Rust 语言知识

在使用 `Dioxus` 之前，您应该先去学习 Rust 语言的基础，否则啥都做不了。

中文学习资源：

- [Rust 程序设计语言](https://rustwiki.org/zh-CN/book)
- [通过例子学 Rust](https://rustwiki.org/zh-CN/rust-by-example)
- [Cargo 手册](https://rustwiki.org/zh-CN/cargo)
- [Rust 规范文档](https://rustwiki.org/wiki)