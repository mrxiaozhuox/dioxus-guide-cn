export default {
    title: "Dioxus 开发指南",
    theme: "docs",
    root: "/",
    plugins: ['sidebar', 'prev_next'],
    github: "http://github.com/mrxiaozhuox/dioxus-guide-cn",
    nav: [
        {
            text: "Dixosus 工作室",
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
        ]
    },
};