import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // 个人简介
    // {
    //   text: "个人简介",
    //   icon: "user",
    //   link: "intro",
    // },
    // 面试知识概要
    {
      text: "面试知识概要",
      icon: "book",
      prefix: "/interview/outline/",
      link: "interview/outline/",
      children: [
        "1-layout",
        "2-box-model",
        "3-event",
        "4-http",
        "5-prototype",
        "6-oop",
        "7-comm",
        "8-security",
        "9-algorithm",
        "10-rendering",
        "11-execution",
        "12-performance",
        "13-errorhandling",
      ]
    },
    // 常见问题及答案
    {
      text: "常见问题及答案",
      icon: "book",
      prefix: "/interview/details/",
      link: "interview/details/",
      children: [
        "1-js",
        "2-css",
        "3-vue",
        "4-react",
      ]
    },
    {
      text: "JS手册",
      icon: "book",
      prefix: "/js-book",
      children: [
        "1-memory",
        "2-execute-context",
        "3-scope-chain-closure",
        "4-this",
      ]
    },
  ],
});
