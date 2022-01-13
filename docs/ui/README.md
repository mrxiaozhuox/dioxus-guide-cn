# 核心主题

> 这将是非常重要的一个章节，我们将讨论 UI 的构建与设计

通过这章的学习，我们将学会如何通过 `Dioxus` 构建一个漂亮的 UI 界面！这一定很酷！

## 声明式用户界面

Dioxus 是一个 声明式框架，这意味着我们不需要手动的 *创建* 元素和手动 *设置* 元素信息（通过函数调用）。
我们只需要对我们想要的样式进行简单声明，其他的 Dioxus 会帮我们搞定的！

假设我们需要一个显示红绿灯的程序，它有 红 黄 绿 三种状态，在 命令式 程序中，我们生成它会非常繁琐：

```rust
let container = Container::new();

let green_light = Light::new().color("green").enabled(true);
let yellow_light = Light::new().color("yellow").enabled(false);
let red_light = Light::new().color("red").enabled(false);
container.push(green_light);
container.push(yellow_light);
container.push(red_light);

container.set_onclick(move |_| {
    if red_light.enabled() {
        red_light.set_enabled(false);
        green_light.set_enabled(true);
    } else if yellow_light.enabled() {
        yellow_light.set_enabled(false);
        red_light.set_enabled(true);
    } else if green_light.enabled() {
        green_light.set_enabled(false);
        yellow_light.set_enabled(true);
    }
});
```

它的可读性简直糟透了，不知道几年后再来看看这个代码是什么感受qwq

如果我们使用 Dioxus 框架来完成这个程序，则只需要：

```rust
let mut state = use_state(&cx, || "red");

cx.render(rsx!(
    Container {
        Light { color: "red", enabled: state == "red", }
        Light { color: "yellow", enabled: state == "yellow", }
        Light { color: "green", enabled: state == "green", }

        onclick: move |_| {
            state.set(match *state {
                "green" => "yellow",
                "yellow" => "red",
                "red" => "green",
            })
        }
    }
))
```

这个代码比上面的清晰了不少吧，我们一眼就能看出这程序在做什么，以及能大概想象到渲染出来会是什么样子。

**注意**：这个概念并不新奇！许多框架都是声明性的—— React 则是其中最流行的。使用声明式框架往往比使用命令式框架更令人愉快。