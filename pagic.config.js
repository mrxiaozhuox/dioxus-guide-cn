export default {
    title: "Dioxus 开发指南",
    theme: "docs",
    root: "/",
    plugins: ['sidebar', 'prev_next'],
    github: "http://github.com/mrxiaozhuox/dioxus-guide-cn",
    nav: [
        {
            text: "官网",
            link: "https://dioxuslabs.com/",
        }
    ],
    sidebar: {
        "/": [
            {
                text: '介绍',
                link: 'README.md',
            },
            {
                text: '安装',
                link: "/docs/setup.html",
            },
            {
                text: '入门',
                link: "/docs/hello-world.html",
            },
            {
                text: 'UI设计',
                link: "/docs/ui/index.html",
                children: [
                    {
                        text: "元素介绍",
                        link: "/docs/ui/vnodes.html"
                    },
                    {
                        text: "条件渲染",
                        link: "/docs/ui/conditional-render.html"
                    },
                    {
                        text: "列表渲染",
                        link: "/docs/ui/lists.html"
                    },
                    {
                        text: "特殊属性",
                        link: "/docs/ui/special-attributes.html"
                    }
                ],
            },
        ]
    },
};
