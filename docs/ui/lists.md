# 列表渲染

有什么我们需要将同一组件渲染多次，那我们就可以把它当成一个列表来渲染。

## 通过列表渲染

想想我们常用的一些网站：类似于知乎，在主页中会有很多条同样的 `文章` 块。

它看起来就是这样的：每一个 Post 组件包含了具体内容，但是页面又由多个组件组成。

```rust
rsx!(
    div {
        Post {/* some properties */}
        Post {/* some properties */}
        Post {/* some properties */}
    }
)
```

下面这个例子可以将一个列表渲染为一堆 `li` 标签：

```rust
let names = ["jim", "bob", "jane", "doe"];
let name_list = names.iter().map(|name| rsx!(
    li { "{name}" }
));

rsx!(
    ul {
        name_list
    }
)
```

上面的代码会先遍历生成单独的 `li` 标签，再将它全部插入到 `ul` 中。

它的 HTML 代码会是这样的：

```html
<ul>
    <li> jim </li>
    <li> bob </li>
    <li> jane </li>
    <li> doe </li>
</ul>
```

## 过滤迭代器

Rust 的迭代器非常强大，特别是用于过滤数据时。在构建用户界面时，您可能希望显示被过滤的项目列表。

```rust
let names = ["jim", "bob", "jane", "doe"];

let name_list = names
    .iter()
    .filter(|name| name.starts_with('j'))
    .map(|name| rsx!( li { "{name}" }));
```

`render()` 方法非常高效，所以最好的做法是让它为我们完成大部分的工作。

## 列表键

在很多需要对列表 `增删改查` 的情况下，我们需要对列表的每一项提供一个 `键` 让它可被 Dioxus 识别。
否则你将不知道哪行对应的是哪条数据了。

```
rsx!( li { key: "a" } )
```

设置一个便于识别的键可帮助 Dioxus 更好的分辨它，并提供相应的反馈。

### 为什么 Dioxus 需要键？‘

如果一个列表了没有唯一标识（我们也可称之为索引），那我们无法确定哪条数据对应哪些东西。
这就很象我们常用的 HashMap ，只有拥有 `Key` 我们才能快速明白对应关系。而不是像 Vec 一样删除一条数据其他都乱了。

注意，你的组件不会接收 键 作为道具。它只被 Dioxus 私下使用。如果你的组件需要一个ID，你必须把它作为一个单独的道具传递:

```
Post { key: "{key}", id: "{id}" }
```